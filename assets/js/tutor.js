function buildPrompt(report) {
  const issues = (report.issues || [])
    .filter(issue => issue.kind !== 'insertion')
    .slice(0, 14)
    .map(issue => {
      const heard = issue.heard ? `; распознано «${issue.heard}»` : '';
      return `- ${issue.refWord || '—'} ${issue.refIpa || ''}${heard}. ${issue.note || ''}`;
    })
    .join('\n');
  const transcript = String(report.transcript || '').slice(0, 3200);
  const metrics = report.metrics || {};
  return `Ты — спокойный и точный преподаватель английского, готовишь ученика к заданию 1 устной части ЕГЭ (чтение текста вслух, критерий ФИПИ: 1 балл).

Ниже — автоматический разбор попытки. Твоя задача: дать короткий человеческий разбор на русском, без воды и без повторения всего текста.

ДАННЫЕ
Текст: ${report.textTitle || 'тренировочный текст'}
Предварительный вердикт движка: ${report.verdict === 1 ? '1 балл' : report.verdict === 0 ? '0 баллов' : 'недостаточно данных'}
Темп: ${report.wpm ?? '—'} слов/мин; покрытие текста: ${Math.round((report.coverage || 0) * 100)}%; длинных пауз: ${metrics.pauseCount ?? '—'}; самая долгая: ${metrics.longestPause ?? '—'} с.
Транскрипт распознавания:
"""
${transcript}
"""
Найденные проблемы:
${issues || '— явных проблем не найдено'}

Структура ответа (ровно три раздела, каждый 2–4 предложения):
### Главное
Что сильнее всего мешает «лёгкости восприятия» именно в этой попытке. Если всё в порядке — что закрепить.
### Что исправить
1–3 конкретных слова или привычки. Для каждого: как звучит сейчас, как должно звучать (IPA или русская подсказка), почему это важно. Не выдумывай ошибки, которых нет в данных.
### Дрилл на 3 минуты
Одно упражнение, которое ученик может сделать сразу: какие фразы повторить и на что слушать.

Пиши простым языком, обращайся на «вы». Не ставь официальную оценку и не утверждай, что слышал аудио. Учитывай, что распознавание речи могло ошибиться. Объём — до 280 слов.`;
}

function endpointFor(settings) {
  const tutor = settings.tutor || {};
  const base = String(tutor.baseUrl || '').trim().replace(/\/+$/, '');
  if (!base) throw new Error('Укажите Base URL провайдера в настройках.');
  if (tutor.provider === 'anthropic') {
    if (base.endsWith('/messages')) return base;
    return base.endsWith('/v1') ? `${base}/messages` : `${base}/v1/messages`;
  }
  if (base.endsWith('/chat/completions')) return base;
  return `${base}/chat/completions`;
}

export async function callTutor(report, settings) {
  const tutor = settings.tutor || {};
  const apiKey = String(tutor.apiKey || '').trim();
  if (!apiKey) {
    throw new Error('Добавьте API-ключ в настройках, чтобы включить AI-наставника.');
  }
  const prompt = buildPrompt(report);
  const provider = tutor.provider === 'anthropic' ? 'anthropic' : 'openai';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);
  try {
    let response;
    if (provider === 'anthropic') {
      response = await fetch(endpointFor(settings), {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: tutor.model || 'claude-3-5-haiku-latest',
          max_tokens: 1200,
          temperature: 0.3,
          messages: [{ role: 'user', content: prompt }]
        })
      });
    } else {
      response = await fetch(endpointFor(settings), {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: tutor.model || 'gpt-4o-mini',
          temperature: 0.3,
          max_tokens: 1100,
          messages: [
            { role: 'system', content: 'Ты преподаватель английского и эксперт по устной части ЕГЭ. Отвечаешь по-русски, кратко и конкретно.' },
            { role: 'user', content: prompt }
          ]
        })
      });
    }
    if (!response.ok) {
      const details = await response.text();
      let message = '';
      try {
        const parsed = JSON.parse(details);
        message = parsed.error?.message || parsed.message || '';
      } catch {
        message = details.slice(0, 180);
      }
      if (response.status === 401) throw new Error('Провайдер отклонил API-ключ (401). Проверьте ключ в настройках.');
      if (response.status === 429) throw new Error('Лимит запросов провайдера исчерпан (429). Попробуйте позже или смените модель.');
      throw new Error(`Ошибка API ${response.status}${message ? `: ${message}` : ''}`);
    }
    const data = await response.json();
    let text = '';
    if (provider === 'anthropic') {
      text = (data.content || []).filter(part => part.type === 'text').map(part => part.text).join('\n');
    } else {
      const content = data.choices?.[0]?.message?.content;
      if (Array.isArray(content)) {
        text = content.map(part => part.text || '').join('\n');
      } else {
        text = content || '';
      }
    }
    if (!text.trim()) throw new Error('Провайдер вернул пустой ответ. Попробуйте другую модель.');
    return text.trim();
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('AI-наставник не ответил за 60 секунд. Попробуйте ещё раз.');
    if (error instanceof TypeError) {
      throw new Error('Не удалось связаться с API. Проверьте интернет, Base URL и CORS-настройки провайдера.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

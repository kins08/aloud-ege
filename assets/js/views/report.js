import {
  getReport, deleteReport, getSettings, getCachedAudio, saveReport
} from '../store.js';
import {
  getHighlightMap, getTempoBand, getCoverageLabel, categoryLabel
} from '../engine.js';
import { callTutor } from '../tutor.js';
import {
  esc, icon, fmtDate, fmtDuration, pct, scoreTone, toast,
  confirmDialog, renderMarkdownLite, pluralRu, clamp
} from '../ui.js';

const CONFIDENCE_LABEL = {
  high: 'Высокая уверенность распознавания',
  medium: 'Средняя уверенность распознавания',
  low: 'Низкая уверенность распознавания'
};

const STATUS_LABEL = {
  ok: 'Распознано',
  check: 'Проверьте',
  missed: 'Не найдено'
};

function verdictCopy(report) {
  if (report.verdict === 1) {
    return {
      stamp: '1',
      stampNote: 'первичный балл',
      title: report.durationSec ? 'Речь в целом воспринимается легко' : 'По словам — в пределах нормы',
      kicker: report.durationSec ? 'Предварительный вердикт' : 'Вердикт по транскрипту · без аудио',
      cls: 'is-one'
    };
  }
  if (report.verdict === 0) {
    return {
      stamp: '0',
      stampNote: 'первичный балл',
      title: 'Есть основания для 0 баллов',
      kicker: 'Предварительный вердикт',
      cls: 'is-zero'
    };
  }
  return {
    stamp: '?',
    stampNote: 'мало данных',
    title: 'Для балла нужно больше речи',
    kicker: 'Вердикт не выставлен',
    cls: 'is-unknown'
  };
}

function scoreBox(label, value, opts = {}) {
  const raw = value === null || value === undefined || Number.isNaN(Number(value)) ? null : clamp(Number(value), 0, 100);
  const tone = raw === null ? '' : ` is-${scoreTone(raw)}`;
  return `
    <div class="score-box${opts.overall ? ' score-box--overall' : ''}">
      <div class="score-box__label">${esc(label)}</div>
      <div class="score-box__value">${raw === null ? '—' : raw}<small>${raw === null ? '' : '/100'}</small></div>
      <div class="score-box__bar"><span data-score="${raw ?? 0}" style="width:${raw ?? 0}%"></span></div>
    </div>`;
}

function highlightText(report) {
  const map = getHighlightMap(report);
  let html = '';
  for (const token of report.display || []) {
    if (token.type === 'word') {
      const hit = map.get(token.wordIndex);
      const raw = esc(token.raw);
      if (hit) {
        const sev = hit.severity || 'high';
        const sevClass = sev === 'medium' ? ' is-medium' : sev === 'low' ? ' is-low' : '';
        const issue = hit.issue;
        const heard = issue?.heard ? `, распознано «${issue.heard}»` : '';
        const label = issue?.kind === 'omission'
          ? `Пропуск: ${token.raw}`
          : `Ошибка ${hit.number}: ${token.raw}${heard}`;
        html += `<mark class="${sevClass.trim()}" data-word-index="${token.wordIndex}" data-issue-num="${hit.number}" tabindex="0" role="button" aria-label="${esc(label)}">${raw}<sup>${hit.number}</sup></mark>`;
      } else {
        html += raw;
      }
    } else {
      html += esc(token.raw);
    }
  }
  html = `<p>${html}</p>`
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, ' ');
  return html;
}

function issueNumbering(report) {
  const map = getHighlightMap(report);
  const numbers = new Map();
  let extra = map.size;
  for (const issue of report.issues || []) {
    if (issue.kind !== 'insertion' && issue.wordIndex !== null && map.has(issue.wordIndex)) {
      numbers.set(issue, map.get(issue.wordIndex).number);
    } else {
      extra += 1;
      numbers.set(issue, extra);
    }
  }
  return { map, numbers };
}

function issueTag(issue) {
  if (issue.distortsMeaning) return '<span class="tag tag--accent">искажает смысл</span>';
  if (issue.probable) return '<span class="tag tag--gold">вероятная ошибка</span>';
  return '<span class="tag">наблюдение</span>';
}

function issueHtml(issue, number) {
  const sevClass = issue.severity === 'medium' ? ' sev-medium' : issue.severity === 'low' ? ' sev-low' : '';
  const title = issue.kind === 'insertion'
    ? `Лишнее: «${issue.heard}»`
    : issue.kind === 'omission'
      ? `Не найдено: «${issue.refWord}»`
      : `${issue.refWord}${issue.heard ? ` → «${issue.heard}»` : ''}`;
  const meta = [];
  meta.push(issueTag(issue));
  meta.push(`<span class="tag tag--outline">${esc(categoryLabel(issue.category))}</span>`);
  return `
    <article class="issue${sevClass}" id="issue-${number}" data-issue-num="${number}">
      <span class="issue__num">${number}</span>
      <div>
        <div class="issue__head">
          <span class="issue__word">${esc(title)}</span>
          ${issue.refIpa ? `<span class="ipa">${esc(issue.refIpa)}</span>` : ''}
        </div>
        <div class="row gap-6" style="margin-top:6px">${meta.join('')}</div>
        <p class="issue__note">${esc(issue.note || '')}</p>
        ${issue.tip ? `<p class="issue__tip">${esc(issue.tip)}</p>` : ''}
      </div>
    </article>`;
}

function issuesCard(report) {
  const groups = report.issueGroups || [];
  const total = report.issues?.length || 0;
  if (!total) {
    return `
      <div class="card">
        <div class="row gap-12">
          <span class="empty__icon" style="margin:0;width:40px;height:40px">${icon('check')}</span>
          <div>
            <h3 class="h3">Расхождений с текстом не найдено</h3>
            <p class="small" style="margin-top:4px">Движок не увидел замен, пропусков или окончаний, которые стоило бы проверить. Оцените паузы и тон по аудио.</p>
          </div>
        </div>
      </div>`;
  }
  const { numbers } = issueNumbering(report);
  return `
    <div class="card">
      <div class="row row--between" style="align-items:flex-start">
        <div>
          <p class="mini-label">Что услышал движок</p>
          <h3 class="h3" style="margin-top:6px">Где чтение разошлось с текстом</h3>
        </div>
        <span class="badge">${total}</span>
      </div>
      <p class="small" style="margin-top:8px;max-width:66ch">Нажмите на номер в тексте или на карточку ошибки, чтобы связать их. Отметки «наблюдение» не входят в счёт фонетических ошибок — это повод проверить аудио.</p>
      <div class="issue-groups" style="margin-top:18px">
        ${groups.map(group => `
          <section aria-label="${esc(group.label)}">
            <div class="issue-group__title">${esc(group.label)} <span class="badge">${group.items.length}</span></div>
            ${group.items.map(issue => issueHtml(issue, numbers.get(issue) || 0)).join('')}
          </section>`).join('')}
      </div>
    </div>`;
}

function planCard(report) {
  const plan = report.plan || [];
  return `
    <div class="side-card plan-card">
      <p class="side-card__title">План на следующую попытку</p>
      <ol>
        ${plan.map((step, index) => `
          <li>
            <span class="plan-num">${index + 1}</span>
            <div>
              <h4>${esc(step.title)}</h4>
              <p>${esc(step.text)}</p>
              ${step.href ? `<a class="link" href="${esc(step.href)}">Открыть раздел ${icon('arrow-right')}</a>` : ''}
            </div>
          </li>`).join('')}
      </ol>
    </div>`;
}

function strengthsCard(report) {
  return `
    <div class="side-card">
      <p class="side-card__title">Что уже работает</p>
      <div class="strengths">
        ${(report.strengths || []).map(text => `<p class="strength">${icon('check')}<span>${esc(text)}</span></p>`).join('')}
      </div>
      ${report.pauseIssue?.length ? `
        <div class="notice notice--warn" style="margin-top:14px">
          ${icon('info')}
          <span>${report.pauseIssue.map(esc).join(' ')}</span>
        </div>` : ''}
    </div>`;
}

function trapCard(report) {
  const traps = report.trapResults || [];
  if (!traps.length) return '';
  return `
    <div class="side-card">
      <div class="row row--between">
        <p class="side-card__title" style="margin-bottom:0">Слова-ловушки</p>
        <span class="badge">${traps.length}</span>
      </div>
      <div class="traps-result" style="margin-top:12px">
        ${traps.map(trap => {
          const status = trap.status || 'check';
          const iconName = status === 'ok' ? 'check' : status === 'missed' ? 'x' : 'alert';
          return `
            <div class="trap-result is-${status === 'ok' ? 'ok' : status === 'missed' ? 'missed' : 'check'}">
              ${icon(iconName)}
              <span><b>${esc(trap.word)}</b>${trap.ipa ? ` <span class="ipa">${esc(trap.ipa)}</span>` : ''} — ${STATUS_LABEL[status] || 'Проверьте'}${trap.note ? `<span class="muted"> · ${esc(trap.note)}</span>` : ''}</span>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

function audioCard(report) {
  const url = getCachedAudio(report.id);
  const metrics = report.metrics || {};
  return `
    <div class="side-card">
      <p class="side-card__title">Запись и метрики</p>
      ${url
        ? `<div class="playback" style="margin-top:0"><audio controls preload="metadata" src="${esc(url)}"></audio></div>`
        : `<p class="audio-unavailable">${report.demo
          ? 'Демонстрационный отчёт: аудио не записывалось, метрики смоделированы.'
          : 'Аудио хранится только в текущей сессии. После перезагрузки страницы запись недоступна — транскрипт и разбор остаются.'}</p>`}
      <dl class="report-meta-list" style="margin-top:14px">
        <div><dt>Длительность</dt><dd>${fmtDuration(report.durationSec)}</dd></div>
        <div><dt>Слов в тексте</dt><dd>${report.wordCount || '—'}</dd></div>
        <div><dt>Покрытие</dt><dd>${pct(report.coverage)}</dd></div>
        <div><dt>Доля речи</dt><dd>${metrics.speechRatio === null || metrics.speechRatio === undefined ? '—' : pct(metrics.speechRatio)}</dd></div>
        <div><dt>Движение тона</dt><dd>${Number.isFinite(Number(metrics.pitchRange)) ? `${Number(metrics.pitchRange).toFixed(1)} полутона` : '—'}</dd></div>
        <div><dt>Монотонность</dt><dd>${Number.isFinite(Number(metrics.flatRatio)) ? pct(metrics.flatRatio) : '—'}</dd></div>
      </dl>
      ${report.transcript ? `
        <details class="transcript-details">
          <summary>Показать транскрипт</summary>
          <p>${esc(report.transcript)}</p>
        </details>` : ''}
    </div>`;
}

function tutorCard(report) {
  const settings = getSettings();
  const hasKey = Boolean(settings.tutor?.apiKey);
  const saved = report.ai?.text || '';
  return `
    <div class="card ai-card" id="tutorCard">
      <div class="row row--between" style="align-items:flex-start">
        <div>
          <p class="mini-label">Необязательный второй взгляд</p>
          <h3 class="h3" style="margin-top:6px">AI-наставник</h3>
        </div>
        <span class="empty__icon" style="width:38px;height:38px;margin:0">${icon('sparkle')}</span>
      </div>
      <p class="small" style="margin-top:8px;max-width:66ch">Локальный движок уже применил правила. Модель может собрать из них короткий человеческий разбор: что главное, что исправить и один дрилл на три минуты.</p>
      ${hasKey ? `
        <div class="row gap-12" style="margin-top:16px">
          <button class="btn btn--primary btn--small" type="button" id="aiRunBtn">${icon('sparkle', 'icon--sm')}${saved ? 'Обновить разбор' : 'Разобрать с AI'}</button>
          <span class="small">${esc(settings.tutor.model || 'модель не указана')}</span>
        </div>
        <div class="ai-output" id="aiOutput">${saved ? renderMarkdownLite(saved) : ''}</div>
        <div id="aiStatus"></div>
      ` : `
        <div class="notice mt-16">
          ${icon('info')}
          <span>AI-наставник выключен: API-ключ не добавлен. Локальный разбор уже работает без него. Ключ можно сохранить только на этом устройстве.</span>
        </div>
        <a class="btn btn--soft btn--small" href="#/settings" style="margin-top:12px">${icon('settings', 'icon--sm')}Настроить AI</a>
      `}
      <p class="report-note" style="margin-top:12px">Модель не слышит аудио и не заменяет экзаменатора. Если аудио и транскрипт расходятся, доверяйте аудио.</p>
    </div>`;
}

function certificateHtml(report) {
  const settings = getSettings();
  const name = String(settings.name || '').trim();
  const date = fmtDate(report.createdAt);
  return `
    <div class="cert-sheet" id="certSheet">
      <div class="cert-inner">
        <p class="cert-kicker">ALOUD · speaking studio</p>
        <h2 class="cert-title">Чтение вслух.<br>Задание 1.</h2>
        <p class="cert-name">${esc(name || 'Практика ALOUD')}</p>
        <p class="cert-text">Тренировочное чтение текста «${esc(report.textTitle || 'без названия')}» в формате устной части ЕГЭ по английскому языку. Предварительный вердикт по логике критерия задания 1 — 1 балл.</p>
        <div class="cert-seal"><strong>1</strong><small>балл</small></div>
        <div class="cert-foot">
          <div><b>${esc(date || '')}</b>дата попытки</div>
          <div><b>${report.wordCount || '—'} слов · ${report.wpm || '—'} слов/мин</b>объём и темп</div>
          <div><b>${esc(report.id.split('-').slice(-1)[0])}</b>идентификатор разбора</div>
        </div>
        <p class="cert-note">Документ создан ALOUD для личной практики. Не является официальным результатом ЕГЭ и не подтверждается ФИПИ. Автоматическая оценка может содержать ошибку распознавания речи.</p>
      </div>
    </div>`;
}

function verdictCard(report) {
  const copy = verdictCopy(report);
  const confidence = report.durationSec
    ? (CONFIDENCE_LABEL[report.confidence] || 'Уверенность не определена')
    : 'Проверка по транскрипту, без аудио';
  const reasons = report.reasons || [];
  return `
    <section class="verdict-card ${copy.cls}" aria-label="Вердикт">
      <div class="verdict-stamp"><strong>${copy.stamp}</strong><small>${copy.stampNote}</small></div>
      <div class="verdict-copy">
        <div class="row gap-8">
          <span class="kicker kicker--muted">${copy.kicker}</span>
          ${report.demo ? '<span class="tag tag--gold">демо</span>' : ''}
        </div>
        <h2 class="h3" style="font-size:clamp(1.45rem,2.6vw,1.95rem);margin-top:8px">${esc(copy.title)}</h2>
        <p>${esc(report.summary)}</p>
        <ul class="verdict-reasons">
          ${reasons.map(reason => `<li>${icon(report.verdict === 0 ? 'alert' : report.verdict === 1 ? 'check' : 'info')}<span>${esc(reason)}</span></li>`).join('')}
        </ul>
        <div class="verdict-foot">
          <span class="tag tag--outline">${icon('wave', 'icon--sm')}${confidence}</span>
          <span>${report.probableErrorCount} ${pluralRu(report.probableErrorCount, 'вероятная ошибка', 'вероятные ошибки', 'вероятных ошибок')}</span>
          <span>${report.distortionCount} ${pluralRu(report.distortionCount, 'искажение смысла', 'искажения смысла', 'искажений смысла')}</span>
          <span>${fmtDate(report.createdAt, true)}</span>
        </div>
      </div>
    </section>`;
}

function scoresCard(report) {
  const scores = report.scores || {};
  return `
    <div class="scores-card" aria-label="Индексы качества">
      ${scoreBox('Произношение', scores.pronunciation)}
      ${scoreBox('Плавность', scores.fluency)}
      ${scoreBox('Интонация', scores.intonation)}
      ${scoreBox('Итоговый индекс', scores.overall, { overall: true })}
    </div>`;
}

function metricsGrid(report) {
  const tempo = getTempoBand(report.wpm);
  const metrics = report.metrics || {};
  const measured = Boolean(report.durationSec);
  return `
    <div class="metric-grid">
      <div class="metric">
        <div class="metric__label">Темп</div>
        <div class="metric__value">${report.wpm ?? '—'}<small>слов/мин</small></div>
        <div class="report-note" style="margin-top:4px">${esc(tempo.label)}</div>
      </div>
      <div class="metric">
        <div class="metric__label">Длинные паузы</div>
        <div class="metric__value">${measured ? (metrics.pauseCount ?? 0) : '—'}<small>${measured ? 'шт.' : ''}</small></div>
        <div class="report-note" style="margin-top:4px">${measured ? 'дольше 0,8 с' : 'нужна аудиозапись'}</div>
      </div>
      <div class="metric">
        <div class="metric__label">Покрытие текста</div>
        <div class="metric__value">${pct(report.coverage)}</div>
        <div class="report-note" style="margin-top:4px">${esc(getCoverageLabel(report.coverage))}</div>
      </div>
      <div class="metric">
        <div class="metric__label">Самая долгая пауза</div>
        <div class="metric__value">${measured ? (metrics.longestPause ? Number(metrics.longestPause).toFixed(1) : '0') : '—'}<small>${measured ? 'с' : ''}</small></div>
        <div class="report-note" style="margin-top:4px">${measured ? (metrics.longestPause >= 3 ? 'риск для критерия' : 'в пределах нормы') : 'нужна аудиозапись'}</div>
      </div>
    </div>`;
}

function notFound(root) {
  root.innerHTML = `
    <div class="empty">
      <div class="empty__icon">${icon('chart')}</div>
      <h3>Разбор не найден</h3>
      <p>Он мог быть удалён или сохранён в другом браузере. Отчёты живут на этом устройстве.</p>
      <a class="btn btn--primary" href="#/check">${icon('mic', 'icon--sm')}Пройти проверку</a>
    </div>`;
}

export function render(root, { id } = {}) {
  const report = getReport(id);
  if (!report) {
    notFound(root);
    return;
  }
  const copy = verdictCopy(report);
  const showCert = report.verdict === 1 && !report.demo;
  const issuesCount = (report.issues || []).filter(issue => issue.kind !== 'insertion').length;

  root.innerHTML = `
    <div class="report-head">
      <div class="report-head__main">
        <div class="report-head__meta">
          <a class="link" href="#/progress">${icon('chart', 'icon--sm')}Прогресс</a>
          <span>·</span>
          <span>${fmtDate(report.createdAt, true)}</span>
          <span>·</span>
          <span>${esc(report.textTitle || 'Тренировочный текст')}</span>
          ${report.demo ? '<span class="tag tag--gold">демо-разбор</span>' : ''}
        </div>
        <span class="kicker">Разбор чтения</span>
        <h1 class="h2">${report.verdict === 1 ? (report.durationSec ? 'Спокойно, понятно, до конца.' : 'По словам — в пределах нормы.') : report.verdict === 0 ? 'Есть что поправить.' : 'Нужно услышать больше.'}</h1>
      </div>
      <div class="report-head__actions">
        <a class="btn btn--small btn--ghost" href="#/check${report.textId && report.textId !== 'custom-session' ? `?text=${encodeURIComponent(report.textId)}` : ''}">${icon('refresh', 'icon--sm')}Перечитать</a>
        ${showCert ? `<button class="btn btn--small btn--soft" type="button" id="printBtn">${icon('print', 'icon--sm')}Сертификат</button>` : ''}
        <button class="btn btn--small btn--danger" type="button" id="deleteBtn">${icon('trash', 'icon--sm')}Удалить</button>
      </div>
    </div>

    ${verdictCard(report)}

    <div class="report-grid">
      <div class="report-main">
        ${scoresCard(report)}
        ${metricsGrid(report)}
        <div class="card report-text-card">
          <div class="row row--between" style="align-items:flex-start;margin-bottom:16px">
            <div>
              <p class="mini-label">Текст и отметки</p>
              <h2 class="h3" style="margin-top:5px">${esc(report.textTitle || 'Тренировочный текст')}</h2>
            </div>
            <span class="badge">${issuesCount} ${pluralRu(issuesCount, 'место', 'места', 'мест')}</span>
          </div>
          <div class="reading-text">${highlightText(report)}</div>
          <div class="highlight-legend">
            <span><i class="legend-dot"></i>высокая / искажает смысл</span>
            <span><i class="legend-dot is-medium"></i>проверить</span>
            <span><i class="legend-dot is-low"></i>наблюдение</span>
            <span>Нажмите на номер, чтобы перейти к объяснению</span>
          </div>
        </div>
        ${issuesCard(report)}
        ${tutorCard(report)}
      </div>

      <aside class="report-side">
        ${audioCard(report)}
        ${planCard(report)}
        ${strengthsCard(report)}
        ${trapCard(report)}
        <div class="side-card card--accent">
          <p class="mini-label" style="color:var(--danger)">Как читать этот разбор</p>
          <p class="aside-note" style="margin-top:7px">Вердикт и индексы — предварительные. Это не официальный балл ФИПИ и не замена живому эксперту. Автоматическое распознавание может услышать не то слово.</p>
        </div>
      </aside>

      ${showCert ? `<div class="cert-wrap">${certificateHtml(report)}</div>` : ''}
    </div>
  `;

  root.querySelectorAll('[data-score]').forEach(bar => {
    const target = Number(bar.dataset.score) || 0;
    requestAnimationFrame(() => { bar.style.width = `${target}%`; });
  });

  const goToIssue = number => {
    const issue = root.querySelector(`.issue[data-issue-num="${number}"]`);
    if (!issue) return;
    issue.scrollIntoView({ behavior: 'smooth', block: 'center' });
    issue.classList.add('is-flash');
    setTimeout(() => issue.classList.remove('is-flash'), 1600);
  };

  root.querySelectorAll('.report-text-card mark[data-issue-num]').forEach(mark => {
    mark.addEventListener('click', () => goToIssue(mark.dataset.issueNum));
    mark.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        goToIssue(mark.dataset.issueNum);
      }
    });
  });

  root.querySelector('#printBtn')?.addEventListener('click', () => {
    root.querySelector('.cert-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => window.print(), 250);
  });

  root.querySelector('#deleteBtn')?.addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Удалить разбор?',
      body: 'Транскрипт и разбор исчезнут с этого устройства. Текст останется в библиотеке.',
      confirmLabel: 'Удалить разбор',
      danger: true
    });
    if (!ok) return;
    deleteReport(report.id);
    toast('Разбор удалён', 'success');
    location.hash = '#/progress';
  });

  const aiButton = root.querySelector('#aiRunBtn');
  if (aiButton) {
    aiButton.addEventListener('click', async () => {
      const output = root.querySelector('#aiOutput');
      const status = root.querySelector('#aiStatus');
      aiButton.disabled = true;
      aiButton.innerHTML = '<span class="spinner"></span>Думаю…';
      status.innerHTML = '<div class="ai-loading"><span class="spinner"></span><span>Наставник собирает разбор по данным этой попытки.</span></div>';
      try {
        const text = await callTutor(report, getSettings());
        output.innerHTML = renderMarkdownLite(text);
        status.innerHTML = '';
        report.ai = { text, at: new Date().toISOString() };
        saveReport(report);
        toast('AI-разбор готов', 'success');
      } catch (error) {
        status.innerHTML = `<div class="notice notice--danger" style="margin-top:14px">${icon('alert')}<span>${esc(error.message || 'Не удалось получить разбор.')}</span></div>`;
      } finally {
        aiButton.disabled = false;
        aiButton.innerHTML = `${icon('sparkle', 'icon--sm')}Обновить разбор`;
      }
    });
  }
}

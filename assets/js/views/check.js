import { TEXTS } from '../data/texts.js';
import { makeDemoReport, analyzeReading, countWords, getTempoBand } from '../engine.js';
import { ReadingRecorder } from '../recorder.js';
import {
  getCustomTexts, getSettings, saveReport, cacheAudio
} from '../store.js';
import {
  esc, icon, toast, fmtClock, fmtDuration, uid, confirmDialog, openModal
} from '../ui.js';

let state = null;
let recorder = null;

function freshState(query) {
  const texts = [...TEXTS, ...getCustomTexts()];
  const wanted = query?.text;
  const selected = texts.find(text => text.id === wanted) || texts.find(text => text.model) || texts[0];
  return {
    phase: 'setup',
    selectedId: selected?.id || '__custom',
    customBody: '',
    customTitle: '',
    text: null,
    transcript: '',
    interim: '',
    metrics: null,
    audioUrl: null,
    audioReportId: null,
    asrError: '',
    timerStop: null,
    error: ''
  };
}

function stepHead(active) {
  const steps = [
    ['1', 'Текст'],
    ['2', 'Чтение'],
    ['3', 'Разбор']
  ];
  return `
    <div class="row gap-12" style="row-gap:8px">
      ${steps.map(([num, label], index) => {
        const stepNumber = index + 1;
        const isActive = active === stepNumber;
        const isDone = active > stepNumber;
        return `<div class="check-step${isActive ? ' is-active' : ''}" style="${isDone ? 'color:var(--ink-soft)' : ''}">
          <span style="${isDone ? 'background:var(--good-soft);color:var(--good)' : ''}">${isDone ? '✓' : num}</span>${label}
        </div>`;
      }).join('<span class="muted" style="font-size:10px">·</span>')}
    </div>`;
}

function cardShell(active, body, extraHead = '') {
  return `
    <div class="check-card">
      <div class="check-card__head">
        ${stepHead(active)}
        ${extraHead}
      </div>
      <div class="check-body">${body}</div>
    </div>`;
}

function textChoiceHtml(text, selectedId) {
  const words = countWords(text.body);
  return `
    <button class="choice${text.id === selectedId ? ' is-selected' : ''}" type="button" data-text-id="${esc(text.id)}">
      <span class="choice__mark" aria-hidden="true"></span>
      <span class="choice__body">
        <span class="choice__title">${esc(text.title)}</span>
        <span class="choice__meta">${esc(text.titleRu || text.topic || '')} · ${words} слов</span>
      </span>
      ${text.model ? '<span class="tag tag--gold">образец</span>' : `<span class="choice__words">${esc(text.topic || 'свой')}</span>`}
    </button>`;
}

function selectedTextFromState() {
  if (state.selectedId === '__custom') {
    const body = state.customBody.trim();
    if (countWords(body) < 20) return null;
    return {
      id: 'custom-session',
      title: state.customTitle.trim() || 'Мой текст',
      titleRu: 'Свой текст',
      topic: 'Свои тексты',
      body,
      traps: [],
      custom: true
    };
  }
  return [...TEXTS, ...getCustomTexts()].find(text => text.id === state.selectedId) || null;
}

function renderSetup(root) {
  state.phase = 'setup';
  const texts = [...TEXTS, ...getCustomTexts()];
  const card = root.querySelector('#checkCard');
  if (!card) return;
  const customSelected = state.selectedId === '__custom';
  card.outerHTML = `<div id="checkCard">${cardShell(1, `
    <h2 class="check-title">Что вы будете читать?</h2>
    <p class="check-sub">Выберите тренировочный текст или вставьте свой — например, из открытого банка ФИПИ. Объём задания 1 — около 150–160 слов.</p>
    ${state.error ? `<div class="notice notice--warn mt-16">${icon('alert')}<span>${esc(state.error)}</span></div>` : ''}
    <div class="choice-list" role="group" aria-label="Выбор текста">
      ${texts.map(text => textChoiceHtml(text, state.selectedId)).join('')}
      <button class="choice${customSelected ? ' is-selected' : ''}" type="button" data-text-id="__custom">
        <span class="choice__mark" aria-hidden="true"></span>
        <span class="choice__body">
          <span class="choice__title">Свой текст</span>
          <span class="choice__meta">Вставить текст из банка ФИПИ или любой другой</span>
        </span>
        <span class="choice__words">вручную</span>
      </button>
    </div>
    <div class="custom-box" id="customBox" ${customSelected ? '' : 'hidden'}>
      <div class="field" style="margin-bottom:10px">
        <label for="sessionTitle">Название</label>
        <input class="input" id="sessionTitle" maxlength="90" placeholder="Например, текст из банка ФИПИ" value="${esc(state.customTitle)}">
      </div>
      <div class="field">
        <label for="sessionBody">Текст задания</label>
        <textarea class="textarea" id="sessionBody" rows="8" placeholder="Вставьте 150–160 слов…">${esc(state.customBody)}</textarea>
        <p class="field-note" id="sessionCount">0 слов</p>
      </div>
    </div>
    <div class="check-actions">
      <button class="btn btn--primary btn--large" type="button" id="startPrepBtn">${icon('clock', 'icon--sm')}Подготовка 1:30</button>
      <button class="btn btn--ghost" type="button" id="manualBtn">Проверить по транскрипту</button>
    </div>
    <p class="support-note">Дальше — запись с микрофоном. Для ручной проверки микрофон не нужен.</p>
  `)}
  </div>`;

  const newCard = root.querySelector('#checkCard');
  const customBox = newCard.querySelector('#customBox');
  const customBody = newCard.querySelector('#sessionBody');
  const customTitle = newCard.querySelector('#sessionTitle');
  const countLabel = newCard.querySelector('#sessionCount');

  const updateCount = () => {
    const words = countWords(customBody.value);
    countLabel.textContent = `${words} ${words === 1 ? 'слово' : words < 5 ? 'слова' : 'слов'} · ориентир 150–160`;
    countLabel.style.color = words > 0 && (words < 80 || words > 220) ? 'var(--terracotta)' : '';
  };
  if (customBody) {
    updateCount();
    customBody.addEventListener('input', () => {
      state.customBody = customBody.value;
      updateCount();
      if (!customBody.value.trim()) return;
      newCard.querySelectorAll('.choice').forEach(choice => choice.classList.toggle('is-selected', choice.dataset.textId === '__custom'));
      state.selectedId = '__custom';
    });
    customTitle.addEventListener('input', () => { state.customTitle = customTitle.value; });
  }

  newCard.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener('click', () => {
      state.selectedId = choice.dataset.textId;
      newCard.querySelectorAll('.choice').forEach(item => item.classList.toggle('is-selected', item === choice));
      const isCustom = choice.dataset.textId === '__custom';
      customBox.hidden = !isCustom;
      if (isCustom) setTimeout(() => customBody?.focus(), 30);
    });
  });

  const resolveText = () => {
    const text = selectedTextFromState();
    if (!text) {
      toast('Вставьте текст объёмом хотя бы 20 слов.', 'error');
      if (state.selectedId === '__custom') customBody?.focus();
      return null;
    }
    return text;
  };

  newCard.querySelector('#startPrepBtn').addEventListener('click', () => {
    const text = resolveText();
    if (!text) return;
    state.text = text;
    state.error = '';
    renderPrep(root);
  });

  newCard.querySelector('#manualBtn').addEventListener('click', () => {
    const text = resolveText();
    if (!text) return;
    state.text = text;
    state.metrics = null;
    state.transcript = '';
    state.audioUrl = null;
    state.asrError = '';
    renderReview(root, { manual: true });
  });
}

function startTimer(seconds, onTick, onDone) {
  const end = performance.now() + seconds * 1000;
  const tick = () => {
    const remaining = Math.max(0, (end - performance.now()) / 1000);
    onTick(remaining);
    if (remaining <= 0) {
      clearInterval(interval);
      onDone?.();
    }
  };
  tick();
  const interval = setInterval(tick, 200);
  return () => clearInterval(interval);
}

function renderPrep(root, error = '') {
  state.phase = 'prep';
  const text = state.text;
  const card = root.querySelector('#checkCard');
  if (!card) return;
  const words = countWords(text.body);
  card.outerHTML = `<div id="checkCard">${cardShell(2, `
    <div class="timer-stage timer-stage--prep">
      <div class="timer-ring" id="timerRing" style="--progress:100%">
        <div>
          <div class="timer-ring__value" id="timerValue">1:30</div>
          <div class="timer-ring__label" id="timerLabel">подготовка · молча</div>
        </div>
      </div>
      <p class="check-sub" style="margin-top:22px;text-align:center">Прочитайте текст про себя. Отметьте числа, имена и длинные слова. Не начинайте вслух — берегите дыхание.</p>
      ${error ? `<div class="notice notice--warn mt-16" style="max-width:560px;text-align:left">${icon('alert')}<span>${esc(error)}</span></div>` : ''}
    </div>
    <div class="reading-mini" aria-label="Текст задания">
      <div class="row row--between" style="margin-bottom:8px">
        <span class="mini-label">${esc(text.title)} · ${words} слов</span>
        <span class="small">${esc(text.titleRu || '')}</span>
      </div>
      ${text.body.split(/\n{2,}/).map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}
    </div>
    <div class="check-actions">
      <button class="btn btn--primary btn--large" type="button" id="beginReadBtn">${icon('mic', 'icon--sm')}Начать чтение</button>
      <button class="btn btn--ghost" type="button" id="backSetupBtn">Выбрать другой текст</button>
    </div>
    <p class="support-note">Браузер попросит доступ к микрофону. Чтение — не более 1:30.</p>
  `)}
  </div>`;

  const newCard = root.querySelector('#checkCard');
  const ring = newCard.querySelector('#timerRing');
  const value = newCard.querySelector('#timerValue');
  const label = newCard.querySelector('#timerLabel');
  state.timerStop?.();
  state.timerStop = startTimer(90, remaining => {
    value.textContent = fmtClock(remaining);
    ring.style.setProperty('--progress', `${(remaining / 90) * 100}%`);
    if (remaining <= 0) {
      label.textContent = 'время подготовки вышло';
    }
  }, () => {
    label.textContent = 'время подготовки вышло';
  });

  newCard.querySelector('#backSetupBtn').addEventListener('click', () => {
    state.timerStop?.();
    renderSetup(root);
  });
  newCard.querySelector('#beginReadBtn').addEventListener('click', () => {
    state.timerStop?.();
    beginReading(root);
  });
}

function renderRead(root) {
  state.phase = 'read';
  const text = state.text;
  const card = root.querySelector('#checkCard');
  if (!card) return;
  card.outerHTML = `<div id="checkCard">${cardShell(2, `
    <div class="timer-stage">
      <div class="timer-ring" id="timerRing" style="--progress:100%">
        <div>
          <div class="timer-ring__value" id="timerValue">1:30</div>
          <div class="timer-ring__label" id="timerLabel">осталось · идёт запись</div>
        </div>
      </div>
      <div class="rec-status" id="recStatus"><span class="record-dot"></span><span>Включаю микрофон…</span></div>
    </div>
    <div class="rec-wave is-idle" id="recWave" aria-hidden="true">
      ${Array.from({ length: 46 }, () => '<span class="rec-wave__bar"></span>').join('')}
      <span class="rec-wave__idle-label">уровень микрофона</span>
    </div>
    <div class="transcript-box">
      <p class="mini-label" style="margin-bottom:6px">Распознавание речи</p>
      <div class="transcript-live" id="liveTranscript" aria-live="polite"><span class="muted">Начните читать — текст появится здесь.</span></div>
    </div>
    <div class="reading-mini" aria-label="Текст перед глазами">
      ${text.body.split(/\n{2,}/).map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}
    </div>
    <div class="check-actions">
      <button class="btn btn--accent btn--large" type="button" id="stopBtn" disabled>${icon('stop', 'icon--sm')}Остановить и проверить</button>
      <button class="btn btn--ghost" type="button" id="cancelReadBtn" disabled>Отменить</button>
    </div>
    <p class="support-note" id="asrNote">${recorder && recorder.asrSupported ? 'Распознавание работает параллельно с записью.' : 'Если распознавание недоступно, вставите текст вручную после записи.'}</p>
  `)}
  </div>`;

  const wave = root.querySelector('#recWave');
  const bars = [...wave.querySelectorAll('.rec-wave__bar')];
  const levels = Array(bars.length).fill(0.06);
  const transcriptEl = root.querySelector('#liveTranscript');
  const statusEl = root.querySelector('#recStatus');
  const asrNote = root.querySelector('#asrNote');
  const stopButton = root.querySelector('#stopBtn');
  const cancelButton = root.querySelector('#cancelReadBtn');

  const paint = level => {
    levels.shift();
    levels.push(Math.max(0.06, level));
    bars.forEach((bar, index) => {
      const value = levels[(index + performance.now() / 900) % levels.length | 0] || 0.06;
      bar.style.height = `${Math.max(6, Math.min(100, value * 100))}%`;
      bar.style.opacity = String(0.35 + Math.min(0.55, value));
    });
  };

  recorder = new ReadingRecorder({
    lang: getSettings().asrLang || 'en-GB',
    onLevel: level => {
      paint(level);
      if (level > 0.04) wave.classList.remove('is-idle');
    },
    onTranscript: (finalText, interim) => {
      state.transcript = finalText;
      state.interim = interim;
      if (!finalText && !interim) {
        transcriptEl.innerHTML = '<span class="muted">Слушаю…</span>';
        return;
      }
      transcriptEl.innerHTML = `${esc(finalText)}${interim ? ` <span class="interim">${esc(interim)}</span>` : ''}`;
      transcriptEl.scrollTop = transcriptEl.scrollHeight;
    },
    onAsrError: message => {
      state.asrError = message;
      if (asrNote) {
        asrNote.textContent = message;
        asrNote.style.color = 'var(--terracotta)';
      }
    },
    onStateChange: () => {}
  });

  const finish = async () => {
    if (!recorder || !recorder.isRecording) return;
    stopButton.disabled = true;
    cancelButton.disabled = true;
    state.timerStop?.();
    statusEl.innerHTML = '<span class="spinner"></span><span>Обрабатываю запись…</span>';
    root.querySelector('#timerLabel').textContent = 'запись завершена';
    const result = await recorder.stop();
    state.transcript = result.transcript || state.transcript;
    state.interim = '';
    state.metrics = result.metrics;
    state.audioUrl = result.audioUrl;
    state.asrError = result.asrError || state.asrError;
    state.timerStop = null;
    renderReview(root, { manual: false });
  };

  stopButton.addEventListener('click', finish);
  cancelButton.addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Отменить запись?',
      body: 'Текущая запись не сохранится.',
      confirmLabel: 'Отменить запись',
      danger: true
    });
    if (!ok) return;
    state.timerStop?.();
    if (recorder) {
      try {
        await recorder.stop();
      } catch {
        /* ignore */
      }
    }
    renderSetup(root);
  });

  (async () => {
    try {
      await recorder.start();
      if (state.phase !== 'read') return;
      wave.classList.remove('is-idle');
      wave.querySelector('.rec-wave__idle-label')?.remove();
      statusEl.innerHTML = '<span class="record-dot"></span><span>Запись идёт — говорите в микрофон</span>';
      stopButton.disabled = false;
      cancelButton.disabled = false;
      if (!recorder.asrSupported) {
        asrNote.textContent = 'Браузер не поддерживает распознавание речи. Запись и аудиометрия работают — текст вставите вручную.';
      }
      const ring = root.querySelector('#timerRing');
      const value = root.querySelector('#timerValue');
      const label = root.querySelector('#timerLabel');
      state.timerStop = startTimer(90, remaining => {
        if (!ring || !value) return;
        value.textContent = fmtClock(remaining);
        ring.style.setProperty('--progress', `${(remaining / 90) * 100}%`);
        if (remaining <= 10) label.textContent = 'завершайте мысль';
      }, () => {
        finish();
      });
    } catch (error) {
      state.timerStop?.();
      recorder.cleanup();
      recorder = null;
      renderPrep(root, error.message);
      toast(error.message, 'error', 6000);
    }
  })();
}

function renderReview(root, { manual = false } = {}) {
  state.phase = 'review';
  const text = state.text;
  const card = root.querySelector('#checkCard');
  if (!card) return;
  const metrics = state.metrics;
  const transcript = manual ? '' : (state.transcript || '');
  const words = countWords(transcript);
  const wpm = metrics?.durationSec && words ? Math.round((words / metrics.durationSec) * 60) : null;
  const tempo = wpm !== null ? getTempoBand(wpm) : null;

  card.outerHTML = `<div id="checkCard">${cardShell(3, `
    <h2 class="check-title">${manual ? 'Вставьте транскрипт' : 'Проверьте транскрипт перед разбором'}</h2>
    <p class="check-sub">${manual ? 'Вставьте то, что вы прочитали. Проверка будет без аудиометрии: движок увидит слова, но не паузы и тон.' : 'Распознавание могло ошибиться. Исправьте слова, которые оно услышало неверно, — иначе движок посчитает их ошибками чтения.'}</p>
    ${state.asrError ? `<div class="notice notice--warn mt-16">${icon('alert')}<span>${esc(state.asrError)}</span></div>` : ''}
    ${metrics ? `
      <div class="metric-grid mt-16">
        <div class="metric"><div class="metric__label">Длительность</div><div class="metric__value">${fmtDuration(metrics.durationSec)}</div></div>
        <div class="metric"><div class="metric__label">Длинные паузы</div><div class="metric__value">${metrics.pauseCount}<small>шт.</small></div></div>
        <div class="metric"><div class="metric__label">Самая долгая</div><div class="metric__value">${metrics.longestPause ? metrics.longestPause.toFixed(1) : '0'}<small>с</small></div></div>
        <div class="metric"><div class="metric__label">Доля речи</div><div class="metric__value">${Math.round((metrics.speechRatio || 0) * 100)}<small>%</small></div></div>
      </div>` : `<div class="notice mt-16">${icon('info')}<span>Режим без микрофона: паузы, темп и интонация не измеряются. Проверка будет только по словам и транскрипту.</span></div>`}
    ${state.audioUrl ? `<div class="playback"><span class="mini-label">Ваша запись</span><audio controls preload="metadata" src="${esc(state.audioUrl)}"></audio></div>` : ''}
    <div class="field mt-16">
      <label for="transcriptEdit">Транскрипт чтения</label>
      <textarea class="textarea" id="transcriptEdit" rows="7" placeholder="Вставьте распознанный или напечатанный текст…">${esc(transcript)}</textarea>
      <div class="row row--between">
        <p class="field-note" id="transcriptCount">${words} слов${tempo ? ` · ${wpm} слов/мин` : ''}</p>
        <button class="text-btn" type="button" id="reRecordBtn">Перезаписать</button>
      </div>
    </div>
    <div class="check-actions">
      <button class="btn btn--primary btn--large" type="button" id="analyzeBtn">${icon('sparkle', 'icon--sm')}Проверить чтение</button>
      <button class="btn btn--ghost" type="button" id="changeTextBtn">Другой текст</button>
    </div>
    <p class="support-note">Движок применит логику критерия 1/0 и покажет, что исправить. Это предварительная оценка, не официальный балл.</p>
  `)}
  </div>`;

  const newCard = root.querySelector('#checkCard');
  const area = newCard.querySelector('#transcriptEdit');
  const count = newCard.querySelector('#transcriptCount');
  area.addEventListener('input', () => {
    const current = countWords(area.value);
    count.textContent = `${current} слов${metrics ? '' : ' · без аудиометрии'}`;
  });

  newCard.querySelector('#reRecordBtn').addEventListener('click', () => {
    state.transcript = '';
    state.metrics = null;
    state.audioUrl = null;
    state.asrError = '';
    renderPrep(root);
  });
  newCard.querySelector('#changeTextBtn').addEventListener('click', () => {
    renderSetup(root);
  });
  newCard.querySelector('#analyzeBtn').addEventListener('click', async () => {
    const value = area.value.trim();
    if (countWords(value) < 5) {
      const ok = await confirmDialog({
        title: 'Транскрипт почти пуст',
        body: 'Вердикт будет «недостаточно данных». Всё равно перейти к разбору?',
        confirmLabel: 'Перейти к разбору'
      });
      if (!ok) {
        area.focus();
        return;
      }
    }
    const button = newCard.querySelector('#analyzeBtn');
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span>Считаю…';
    await new Promise(resolve => setTimeout(resolve, 60));
    const report = analyzeReading({
      text: text.body,
      transcript: value,
      metrics: state.metrics,
      textTraps: text.traps || [],
      textId: text.id,
      textTitle: text.title
    });
    report.id = uid('report');
    const saved = saveReport(report);
    if (!saved) {
      toast('Не удалось сохранить отчёт: хранилище браузера переполнено.', 'error', 6000);
      button.disabled = false;
      button.innerHTML = `${icon('sparkle', 'icon--sm')}Проверить чтение`;
      return;
    }
    if (state.audioUrl) {
      cacheAudio(report.id, state.audioUrl);
      state.audioReportId = report.id;
      recorder?.releaseAudio();
    }
    toast('Разбор готов', 'success');
    location.hash = `#/report/${report.id}`;
  });
}

export function render(root, { query } = {}) {
  state = freshState(query);
  root.innerHTML = `
    <div class="page-head">
      <div class="page-head__text">
        <span class="kicker">Живая проверка</span>
        <h1 class="h2">Прочитайте вслух. Услышьте, что мешает.</h1>
        <p class="lead">Таймер, микрофон, распознавание речи и разбор по логике критерия ФИПИ. Одна запись — один понятный следующий шаг.</p>
      </div>
      <div class="page-head__actions">
        <a class="btn btn--ghost" href="#/texts">${icon('book', 'icon--sm')}К текстам</a>
      </div>
    </div>
    <div class="grid--check">
      <div id="checkCard"></div>
      <aside class="check-aside">
        <div class="side-card">
          <p class="side-card__title">Что учитывает разбор</p>
          <ul class="aside-list">
            <li>${icon('check')}<span>Слова, пропуски, окончания и числа</span></li>
            <li>${icon('check')}<span>Паузы, темп и доля речи</span></li>
            <li>${icon('check')}<span>Слова-ловушки и минимальные пары</span></li>
            <li>${icon('check')}<span>Движение тона и монотонность</span></li>
          </ul>
        </div>
        <div class="side-card">
          <p class="side-card__title">Перед записью</p>
          <ul class="aside-list">
            <li>${icon('info')}<span>Один спокойный вдох. Начните чуть медленнее, чем хочется.</span></li>
            <li>${icon('info')}<span>Пауза — только между смысловыми группами.</span></li>
            <li>${icon('info')}<span>Ошибка в слове — не повод начинать заново.</span></li>
          </ul>
        </div>
        <div class="side-card">
          <p class="side-card__title">Демонстрация</p>
          <p class="aside-note">Посмотрите, как выглядит полный отчёт: вердикт, метрики, подсветка слов и план исправлений.</p>
          <button class="btn btn--soft btn--small btn--block" type="button" id="demoBtn" style="margin-top:12px">${icon('eye', 'icon--sm')}Открыть демо-разбор</button>
        </div>
        <div class="side-card card--accent" style="border-color:rgba(185,87,58,.2)">
          <p class="mini-label" style="color:var(--danger)">Важно</p>
          <p class="aside-note" style="margin-top:6px">Распознавание речи может ошибаться. Всегда сверяйтесь с записью и правьте транскрипт. Оценка ALOUD — тренировочная, а не официальная.</p>
        </div>
      </aside>
    </div>
  `;

  renderSetup(root);
  root.querySelector('#demoBtn').addEventListener('click', () => {
    const demo = makeDemoReport(TEXTS[0]);
    demo.id = uid('report');
    const saved = saveReport(demo);
    if (!saved) {
      toast('Не удалось сохранить демо-отчёт.', 'error');
      return;
    }
    toast('Это демонстрационный отчёт', 'info');
    location.hash = `#/report/${demo.id}`;
  });
}

export function cleanup() {
  if (state) {
    state.timerStop?.();
    if (state.audioUrl && !state.audioReportId) {
      URL.revokeObjectURL(state.audioUrl);
      state.audioUrl = null;
    }
  }
  if (recorder) {
    const currentUrl = recorder.audioUrl;
    if (currentUrl && !state?.audioReportId) URL.revokeObjectURL(currentUrl);
    recorder.destroy();
    recorder = null;
  }
  state = null;
}

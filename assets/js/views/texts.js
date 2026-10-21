import { TEXTS, TOPICS } from '../data/texts.js';
import { countWords, tokenizeDisplay } from '../engine.js';
import { getCustomTexts, saveCustomText, deleteCustomText, getSettings } from '../store.js';
import { esc, icon, toast, openModal, confirmDialog, uid, fmtDate } from '../ui.js';

function allTexts() {
  return [...TEXTS, ...getCustomTexts()];
}

function cardHtml(text, custom = false) {
  const words = countWords(text.body);
  const excerpt = text.body.replace(/\s+/g, ' ').slice(0, 190);
  return `
    <article class="text-card${text.model ? ' text-card--model' : ''}${custom ? ' text-card--custom' : ''}" data-open="#/texts/${esc(text.id)}" data-topic="${esc(text.topic || 'Свои тексты')}" data-search="${esc(`${text.title} ${text.titleRu || ''} ${text.topic || ''} ${text.body}`.toLowerCase())}">
      <div class="text-card__top">
        <div class="row gap-6">
          ${text.model ? '<span class="tag tag--gold">Образец разбора</span>' : ''}
          ${custom ? '<span class="tag tag--outline">Свой текст</span>' : `<span class="tag">${esc(text.topic)}</span>`}
        </div>
        <span class="small nowrap">${esc(text.level || 'B1')}</span>
      </div>
      <h3 class="text-card__title"><a href="#/texts/${esc(text.id)}">${esc(text.title)}</a></h3>
      <p class="text-card__ru">${esc(text.titleRu || 'Пользовательский текст')}</p>
      <p class="text-card__excerpt">${esc(excerpt)}…</p>
      <div class="text-card__foot">
        <span>${words} слов</span>
        <span class="dot"></span>
        <span>${(text.traps || []).length} слов-ловушек</span>
        ${custom ? `<button class="text-btn" type="button" data-delete="${esc(text.id)}" style="margin-left:auto;color:var(--danger)">Удалить</button>` : ''}
        <span class="text-card__arrow" aria-hidden="true">${icon('arrow-right')}</span>
      </div>
    </article>`;
}

export function render(root) {
  const customTexts = getCustomTexts();
  root.innerHTML = `
    <div class="page-head">
      <div class="page-head__text">
        <span class="kicker">Библиотека</span>
        <h1 class="h2">Тексты для чтения вслух</h1>
        <p class="lead">10 оригинальных текстов в формате задания 1: 150–160 слов, научно-популярный тон, числа и слова-ловушки. Плюс ваши собственные тексты из банка ФИПИ.</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--primary" type="button" id="importBtn">${icon('plus', 'icon--sm')}Добавить свой текст</button>
      </div>
    </div>

    <div class="filter-bar">
      <div class="search">${icon('search')}<input type="search" id="textSearch" placeholder="Найти текст или тему…" aria-label="Поиск по текстам"></div>
      <div class="chips" id="topicChips">
        ${TOPICS.map((topic, index) => `<button class="chip${index === 0 ? ' is-active' : ''}" type="button" data-topic="${esc(topic)}">${esc(topic)}</button>`).join('')}
        ${customTexts.length ? '<button class="chip" type="button" data-topic="Свои тексты">Свои тексты</button>' : ''}
      </div>
    </div>

    <div class="row row--between" style="margin-bottom:14px">
      <p class="small" id="textCount">${TEXTS.length + customTexts.length} текстов</p>
      <p class="small">${icon('info', 'icon--sm')} Официальные тексты ФИПИ не копируются — их можно вставить вручную.</p>
    </div>

    <div class="text-grid" id="textGrid">
      ${allTexts().map(text => cardHtml(text, text.custom)).join('')}
    </div>
    <div class="empty" id="textEmpty" hidden>
      <div class="empty__icon">${icon('search', 'icon--lg')}</div>
      <h3>Ничего не найдено</h3>
      <p>Попробуйте другую тему или добавьте свой текст.</p>
      <button class="btn btn--ghost" type="button" id="clearFilters">Сбросить фильтры</button>
    </div>

    <section class="section">
      <div class="card card--quiet">
        <div class="row row--between gap-16" style="align-items:flex-start">
          <div style="max-width:700px">
            <span class="kicker kicker--muted">Импорт из ФИПИ</span>
            <h3 class="h3 mt-8">Как добавить официальный текст</h3>
            <p class="small mt-8">Откройте открытый банк ФИПИ, выберите английский язык → устная часть → чтение текста вслух. Скопируйте текст задания и вставьте его сюда. Текст останется только в вашем браузере, на сервер ничего не отправляется.</p>
          </div>
          <a class="btn btn--ghost" href="https://ege.fipi.ru/bank/" target="_blank" rel="noopener">Открыть банк ФИПИ ${icon('arrow-right', 'icon--sm')}</a>
        </div>
      </div>
    </section>
  `;

  const grid = root.querySelector('#textGrid');
  const search = root.querySelector('#textSearch');
  const chips = root.querySelector('#topicChips');
  const count = root.querySelector('#textCount');
  const empty = root.querySelector('#textEmpty');
  let activeTopic = 'Все';

  const applyFilter = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    grid.querySelectorAll('.text-card').forEach(card => {
      const topicMatch = activeTopic === 'Все' || card.dataset.topic === activeTopic;
      const queryMatch = !query || card.dataset.search.includes(query);
      const show = topicMatch && queryMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? 'текст' : visible < 5 ? 'текста' : 'текстов'}`;
    empty.hidden = visible !== 0;
  };

  search.addEventListener('input', applyFilter);
  chips.addEventListener('click', event => {
    const button = event.target.closest('[data-topic]');
    if (!button) return;
    activeTopic = button.dataset.topic;
    chips.querySelectorAll('.chip').forEach(chip => chip.classList.toggle('is-active', chip === button));
    applyFilter();
  });
  root.querySelector('#clearFilters')?.addEventListener('click', () => {
    search.value = '';
    activeTopic = 'Все';
    chips.querySelectorAll('.chip').forEach(chip => chip.classList.toggle('is-active', chip.dataset.topic === 'Все'));
    applyFilter();
  });

  grid.addEventListener('click', async event => {
    const deleteButton = event.target.closest('[data-delete]');
    if (deleteButton) {
      event.stopPropagation();
      const id = deleteButton.dataset.delete;
      const ok = await confirmDialog({
        title: 'Удалить текст?',
        body: 'Текст и его история проверок останутся только в отчётах. Это действие нельзя отменить.',
        confirmLabel: 'Удалить',
        danger: true
      });
      if (!ok) return;
      deleteCustomText(id);
      toast('Текст удалён', 'success');
      render(root);
      return;
    }
    if (event.target.closest('a')) return;
    const card = event.target.closest('[data-open]');
    if (card) location.hash = card.dataset.open;
  });
  grid.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('[data-open]');
    if (card) {
      event.preventDefault();
      location.hash = card.dataset.open;
    }
  });

  root.querySelector('#importBtn').addEventListener('click', () => {
    openImportModal(() => render(root));
  });
}

function openImportModal(onSaved) {
  const settings = getSettings();
  openModal({
    title: 'Свой текст',
    body: `
      <div class="form-stack" style="margin-top:0">
        <div class="field">
          <label for="customTitle">Название</label>
          <input class="input" id="customTitle" placeholder="Например, текст из банка ФИПИ" maxlength="90">
        </div>
        <div class="field">
          <label for="customBody">Текст задания</label>
          <textarea class="textarea" id="customBody" rows="9" placeholder="Вставьте 150–160 слов. Абзацы сохранятся."></textarea>
          <p class="field-note" id="customCount">0 слов · ориентир 150–160</p>
        </div>
        <p class="notice">${icon('info')} Текст сохраняется только на этом устройстве. Он не отправляется на сервер и не попадает в общий архив ФИПИ.</p>
      </div>`,
    actions: [
      { id: 'cancel', label: 'Отмена', className: 'btn--ghost' },
      { id: 'save', label: 'Сохранить текст', className: 'btn--primary' }
    ],
    onMount: (node, close) => {
      const title = node.querySelector('#customTitle');
      const body = node.querySelector('#customBody');
      const counter = node.querySelector('#customCount');
      const updateCount = () => {
        const words = countWords(body.value);
        counter.textContent = `${words} ${words === 1 ? 'слово' : words < 5 ? 'слова' : 'слов'} · ориентир 150–160`;
        counter.style.color = words > 0 && (words < 80 || words > 220) ? 'var(--terracotta)' : '';
      };
      body.addEventListener('input', updateCount);
      setTimeout(() => title.focus(), 40);
      node.querySelector('[data-modal-action="cancel"]')?.addEventListener('click', close);
      node.querySelector('[data-modal-action="save"]')?.addEventListener('click', () => {
        const text = body.value.trim();
        const words = countWords(text);
        if (words < 20) {
          toast('Слишком короткий текст: нужно хотя бы 20 слов.', 'error');
          body.focus();
          return;
        }
        const custom = {
          id: `custom-${uid('t')}`,
          title: title.value.trim() || 'Мой текст',
          titleRu: 'Пользовательский текст',
          topic: 'Свои тексты',
          level: words >= 140 && words <= 180 ? '≈ формат' : `${words} слов`,
          custom: true,
          createdAt: new Date().toISOString(),
          body: text,
          traps: []
        };
        saveCustomText(custom);
        close();
        toast('Текст добавлен в библиотеку', 'success');
        onSaved?.();
      });
    }
  });
}

function renderReadingText(body, traps) {
  const trapMap = new Map();
  for (const trap of traps || []) {
    if (!trap.word.includes(' ')) trapMap.set(trap.word.toLowerCase(), trap);
  }
  const tokens = tokenizeDisplay(body);
  let html = '';
  for (const token of tokens) {
    if (token.type === 'space') {
      html += token.raw.replace(/\n/g, '<br>');
      continue;
    }
    if (token.type === 'punct') {
      html += esc(token.raw);
      continue;
    }
    const clean = token.raw.toLowerCase().replace(/[’']/g, '');
    const trap = trapMap.get(clean);
    const isNumber = /^\d/.test(token.raw);
    if (trap) {
      html += `<span class="trap-word" title="${esc(`${trap.ipa || ''} — ${trap.note || ''}`)}">${esc(token.raw)}</span>`;
    } else if (isNumber) {
      html += `<span class="num-word">${esc(token.raw)}</span>`;
    } else {
      html += esc(token.raw);
    }
  }
  return html;
}

function markupHtml(markup) {
  return esc(markup)
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\s\/\s/g, ' <b>/</b> ');
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Текст скопирован', 'success');
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
      toast('Текст скопирован', 'success');
    } catch {
      toast('Не удалось скопировать. Выделите текст вручную.', 'error');
    }
    area.remove();
  }
}

export function renderTextDetail(root, { id }) {
  const text = allTexts().find(item => item.id === id);
  if (!text) {
    root.innerHTML = `<div class="empty"><div class="empty__icon">${icon('book-open', 'icon--lg')}</div><h3>Текст не найден</h3><p>Возможно, он был удалён.</p><a class="btn btn--primary" href="#/texts">В библиотеку</a></div>`;
    return;
  }
  const words = countWords(text.body);
  const traps = text.traps || [];
  const isCustom = Boolean(text.custom);
  const paragraphs = text.body.split(/\n{2,}/);
  const readingHtml = paragraphs.map(paragraph => `<p>${renderReadingText(paragraph, traps)}</p>`).join('');

  root.innerHTML = `
    <div class="breadcrumbs"><a href="#/texts">Библиотека</a>${icon('chevron')}<span>${esc(text.title)}</span></div>
    <div class="reader-head">
      <div class="row gap-8" style="margin-bottom:10px">
        ${text.model ? '<span class="tag tag--gold">Образец разбора</span>' : ''}
        <span class="tag">${esc(text.topic || 'Свои тексты')}</span>
        <span class="tag tag--outline">${esc(text.level || 'B1')}</span>
      </div>
      <h1 class="h2">${esc(text.title)}</h1>
      <p class="small" style="margin-top:5px">${esc(text.titleRu || '')}</p>
      <div class="reader-head__meta">
        <span class="tag">${words} слов</span>
        <span class="tag">${traps.length} слов-ловушек</span>
        <span class="tag">подготовка 1:30</span>
        <span class="tag">чтение 1:30</span>
      </div>
    </div>

    <div class="reader-layout">
      <div>
        <article class="reading-panel">
          <div class="reading-panel__top">
            <span class="reading-panel__label">Текст задания · читайте вслух</span>
            <button class="btn btn--soft btn--small" type="button" id="copyBtn">Копировать</button>
          </div>
          <div class="reading-text">${readingHtml}</div>
          <div class="reading-toolbar">
            <a class="btn btn--primary" href="#/check?text=${esc(text.id)}">${icon('mic', 'icon--sm')}Читать с проверкой</a>
            <button class="btn btn--ghost" type="button" id="speakBtn">${icon('volume', 'icon--sm')}Прослушать пример</button>
            ${isCustom ? `<button class="btn btn--danger" type="button" id="deleteBtn">${icon('trash', 'icon--sm')}Удалить</button>` : ''}
          </div>
          ${text.modelNotes ? `
            <div class="model-notes">
              <div class="model-note">
                <strong>Почему это ${esc(text.modelNotes.verdict)}</strong>
                <ul class="list-check" style="margin-top:7px">
                  ${text.modelNotes.why.map(item => `<li>${icon('check')}<span>${esc(item)}</span></li>`).join('')}
                </ul>
              </div>
              <div class="model-note" style="border-color:var(--terracotta)">
                <strong>На что смотреть в записи</strong>
                <ul class="list-dash" style="margin-top:7px">
                  ${text.modelNotes.watch.map(item => `<li>${esc(item)}</li>`).join('')}
                </ul>
              </div>
              <div class="model-markup">${markupHtml(text.modelNotes.markup)}</div>
              <p class="report-note">Курсивом — смысловые акценты. Косая черта — граница смысловой группы. Это модель разбора, а не официальная запись эксперта.</p>
            </div>` : ''}
        </article>
      </div>

      <aside class="side-stack">
        <div class="side-card">
          <p class="side-card__title">План чтения</p>
          <div class="plan-list">
            <div class="plan-list__item"><span class="plan-list__num">1</span><div class="plan-list__body"><strong>Прочитайте про себя</strong><span>Отметьте числа, имена и длинные слова. Не спешите начинать вслух.</span></div></div>
            <div class="plan-list__item"><span class="plan-list__num">2</span><div class="plan-list__body"><strong>Соберите смысловые группы</strong><span>Пауза — только на точке, запятой и границе мысли.</span></div></div>
            <div class="plan-list__item"><span class="plan-list__num">3</span><div class="plan-list__body"><strong>Начните спокойно</strong><span>Первую фразу читайте чуть медленнее, чем хочется.</span></div></div>
          </div>
          <a class="btn btn--primary btn--block" href="#/check?text=${esc(text.id)}" style="margin-top:18px">${icon('mic', 'icon--sm')}Записать чтение</a>
        </div>
        ${traps.length ? `
          <div class="side-card">
            <p class="side-card__title">Слова-ловушки</p>
            <div class="trap-list">
              ${traps.slice(0, 10).map(trap => `
                <div class="trap-item">
                  <div class="trap-item__head">
                    <span class="trap-item__word">${esc(trap.word)}</span>
                    <button class="speak-btn" type="button" data-speak="${esc(trap.word)}" aria-label="Прослушать ${esc(trap.word)}">${icon('volume')}</button>
                  </div>
                  <div class="trap-item__ipa">${esc(trap.ipa || '')}</div>
                  <p class="trap-item__note">${esc(trap.note || '')}</p>
                </div>`).join('')}
            </div>
            ${traps.length > 10 ? `<p class="small" style="margin-top:10px">Ещё ${traps.length - 10} — в полном разборе после записи.</p>` : ''}
          </div>` : ''}
        <div class="side-card">
          <p class="side-card__title">Связанные разделы</p>
          <div class="stack gap-8">
            <a class="link" href="#/mistakes">Частые ошибки ${icon('arrow-right')}</a>
            <a class="link" href="#/fluency">Паузы и единство речи ${icon('arrow-right')}</a>
            <a class="link" href="#/rules">Числительные и правила ${icon('arrow-right')}</a>
          </div>
        </div>
      </aside>
    </div>
  `;

  root.querySelector('#copyBtn')?.addEventListener('click', () => copyText(text.body));
  root.querySelector('#speakBtn')?.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.body);
      utterance.lang = getSettings().asrLang || 'en-GB';
      utterance.rate = 0.88;
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === utterance.lang);
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    } else {
      toast('Синтез речи не поддерживается этим браузером.', 'error');
    }
  });
  root.querySelector('#deleteBtn')?.addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Удалить текст?',
      body: 'Сохранённые отчёты останутся в прогрессе, но текст исчезнет из библиотеки.',
      confirmLabel: 'Удалить',
      danger: true
    });
    if (!ok) return;
    deleteCustomText(text.id);
    toast('Текст удалён', 'success');
    location.hash = '#/texts';
  });
}

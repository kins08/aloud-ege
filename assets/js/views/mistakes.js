import {
  WORD_BANK, WORD_CATEGORIES, TOP_ERRORS, MINIMAL_PAIRS, ACCENT_HABITS
} from '../data/words.js';
import { esc, icon, speak } from '../ui.js';

let selectedCat = 'all';
let query = '';

function speakButton(word, label = 'Прослушать') {
  return `<button class="speak-btn" type="button" data-speak="${esc(word)}" aria-label="${esc(label)}: ${esc(word)}" title="${esc(label)}">${icon('volume')}</button>`;
}

function topCard(entry) {
  return `
    <article class="word-card word-card--top">
      <div class="word-card__head">
        <div>
          <span class="tag tag--accent">ошибка №${entry.top}</span>
          <h3 class="word-card__word" style="margin-top:8px">${esc(entry.word)}</h3>
          <p class="word-card__ipa ipa">${esc(entry.ipa)}</p>
          <p class="word-card__ru">${esc(entry.ru)}</p>
        </div>
        ${speakButton(entry.word)}
      </div>
      <p class="word-card__wrong">${icon('alert')}как звучит у многих: ${esc(entry.wrong)}</p>
      <p class="word-card__note">${esc(entry.note)}</p>
    </article>`;
}

function wordCard(entry) {
  return `
    <article class="word-card">
      <div class="word-card__head">
        <div>
          <h3 class="word-card__word">${esc(entry.word)}${entry.critical ? ' <span class="tag tag--accent" style="vertical-align:middle">смысл</span>' : ''}</h3>
          <p class="word-card__ipa ipa">${esc(entry.ipa)}</p>
          <p class="word-card__ru">${esc(entry.ru)}</p>
        </div>
        ${speakButton(entry.word)}
      </div>
      <p class="word-card__wrong">${icon('x')}${esc(entry.wrong)}</p>
      <p class="word-card__note">${esc(entry.note)}</p>
    </article>`;
}

function filteredWords() {
  const needle = query.trim().toLowerCase();
  return WORD_BANK.filter(entry => {
    if (selectedCat !== 'all' && entry.cat !== selectedCat) return false;
    if (!needle) return true;
    return [entry.word, entry.ru, entry.ipa, entry.note, entry.wrong]
      .some(value => String(value || '').toLowerCase().includes(needle));
  });
}

function pairCard(pair) {
  return `
    <article class="pair-card">
      <div class="pair-card__words">
        <b>${esc(pair.a.word)}</b><span class="ipa">${esc(pair.a.ipa)}</span>
        ${speakButton(pair.a.word, 'Прослушать')}
        <span>⇄</span>
        <b>${esc(pair.b.word)}</b><span class="ipa">${esc(pair.b.ipa)}</span>
        ${speakButton(pair.b.word, 'Прослушать')}
      </div>
      <p class="pair-card__why">${esc(pair.a.ru)} / ${esc(pair.b.ru)}. ${esc(pair.why)}</p>
    </article>`;
}

function bindSpeak(root) {
  root.querySelectorAll('[data-speak]').forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = '1';
    button.addEventListener('click', () => speak(button.dataset.speak));
  });
}

function paintWords(root) {
  const grid = root.querySelector('#wordGrid');
  const count = root.querySelector('#wordCount');
  if (!grid) return;
  const words = filteredWords();
  if (count) count.textContent = `${words.length} из ${WORD_BANK.length} слов`;
  grid.innerHTML = words.length
    ? words.map(wordCard).join('')
    : `<div class="empty" style="grid-column:1/-1;padding:32px 20px"><div class="empty__icon">${icon('search')}</div><h3>Ничего не найдено</h3><p>Попробуйте другое слово или сбросьте фильтр.</p></div>`;
  bindSpeak(grid);
}

export function render(root) {
  selectedCat = 'all';
  query = '';
  const criticalCount = WORD_BANK.filter(entry => entry.critical).length;
  root.innerHTML = `
    <div class="page-head">
      <div class="page-head__text">
        <span class="kicker">Частые ошибки</span>
        <h1 class="h2">Не «сильный акцент», а конкретные замены.</h1>
        <p class="lead">Задание 1 снижает балл не за британский или американский вариант, а за слова, которые меняют смысл, теряют окончания или ломают ритм. Начните с верхушки списка.</p>
      </div>
      <div class="page-head__actions">
        <a class="btn btn--ghost" href="#/rules">${icon('book-open', 'icon--sm')}Как исправлять</a>
        <a class="btn btn--primary" href="#/check">${icon('mic', 'icon--sm')}Проверить себя</a>
      </div>
    </div>

    <div class="row gap-8" style="margin-bottom:26px">
      <span class="tag tag--accent">${icon('alert', 'icon--sm')}${TOP_ERRORS.length} слов в топе</span>
      <span class="tag tag--gold">${criticalCount} пар меняют смысл</span>
      <span class="tag">${WORD_BANK.length} слов в словаре</span>
      <span class="tag tag--outline">IPA · британский вариант</span>
    </div>

    <section class="section" style="margin-top:0">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Начните здесь</span>
          <h2 class="h2">Слова, которые чаще всего звучат неверно</h2>
        </div>
      </div>
      <div class="word-grid">${TOP_ERRORS.map(topCard).join('')}</div>
      <p class="speak-tip">${icon('volume')}Нажмите на динамик, чтобы услышать слово в браузере. Сравнивайте не с русской транскрипцией, а со звучанием.</p>
    </section>

    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Минимальные пары</span>
          <h2 class="h2">Одно отличие — другой смысл</h2>
          <p class="lead" style="font-size:13.5px;margin-top:10px">В критерии ФИПИ отдельно выделены ошибки, искажающие смысл. Это как раз те случаи, когда замена звука превращает одно слово в другое.</p>
        </div>
      </div>
      <div class="pair-grid">${MINIMAL_PAIRS.map(pairCard).join('')}</div>
    </section>

    <section class="section">
      <div class="grid--sidebar" style="display:grid">
        <div class="card">
          <span class="kicker kicker--muted">Привычки</span>
          <h2 class="h2" style="margin-top:10px">Что русская речь делает с английской</h2>
          <div class="habit-list" style="margin-top:16px">
            ${ACCENT_HABITS.map(habit => `
              <div class="habit">
                <span class="habit__num">${esc(habit.num)}</span>
                <div>
                  <h4>${esc(habit.title)}</h4>
                  <p>${esc(habit.body)}</p>
                  <span class="tag tag--outline">${esc(habit.tag)}</span>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <aside class="stack gap-16">
          <div class="side-card card--dark">
            <span class="kicker" style="color:#e9c79b">Правило пяти</span>
            <h3 class="h3" style="margin-top:9px;color:var(--paper)">5 ошибок — не приговор</h3>
            <p class="aside-note" style="color:rgba(242,236,223,.75);margin-top:8px">По критерию задания 1 допускается до пяти фонетических ошибок, в том числе одна–две искажающие смысл. Но «легкость восприятия» важнее арифметики.</p>
            <a class="link" href="#/sources" style="color:#e9c79b;margin-top:12px">Открыть критерий ${icon('arrow-right')}</a>
          </div>
          <div class="side-card">
            <p class="side-card__title">Порядок работы</p>
            <ol class="aside-list" style="list-style:none">
              <li><span class="badge">1</span><span>Выпишите 3 слова, которые чаще всего путаете.</span></li>
              <li><span class="badge">2</span><span>Повторите минимальные пары вслух по 5 раз.</span></li>
              <li><span class="badge">3</span><span>Прочитайте абзац текста, следя только за этими словами.</span></li>
              <li><span class="badge">4</span><span>Сделайте запись и сверьте аудио с транскриптом.</span></li>
            </ol>
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Словарь</span>
          <h2 class="h2">Все слова-ловушки в одном месте</h2>
        </div>
        <span class="small" id="wordCount">${WORD_BANK.length} из ${WORD_BANK.length} слов</span>
      </div>
      <div class="filter-bar">
        <label class="search" for="wordSearch">
          ${icon('search')}
          <input id="wordSearch" type="search" placeholder="Найти слово, перевод или ошибку…" autocomplete="off">
        </label>
        <div class="chips" id="wordChips">
          ${WORD_CATEGORIES.map(cat => `<button class="chip${cat.id === 'all' ? ' is-active' : ''}" type="button" data-cat="${esc(cat.id)}">${esc(cat.label)}</button>`).join('')}
        </div>
      </div>
      <div class="word-grid" id="wordGrid">${WORD_BANK.map(wordCard).join('')}</div>
    </section>
  `;

  bindSpeak(root);

  const search = root.querySelector('#wordSearch');
  search?.addEventListener('input', () => {
    query = search.value;
    paintWords(root);
  });

  root.querySelectorAll('[data-cat]').forEach(button => {
    button.addEventListener('click', () => {
      selectedCat = button.dataset.cat;
      root.querySelectorAll('[data-cat]').forEach(item => item.classList.toggle('is-active', item === button));
      paintWords(root);
    });
  });
}

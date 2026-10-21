import { TEXTS } from '../data/texts.js';
import { EXAM_FACTS, CRITERIA } from '../data/sources.js';
import { countWords } from '../engine.js';
import { getProgressSummary } from '../store.js';
import { esc, fmtDate, icon } from '../ui.js';

export function render(root) {
  const featured = TEXTS.find(text => text.model) || TEXTS[0];
  const featuredWords = countWords(featured.body);
  const progress = getProgressSummary();
  const latest = progress.latest;

  root.innerHTML = `
    <section class="hero">
      <div class="hero__copy">
        <span class="kicker">ЕГЭ 2026 · устная часть · задание 1</span>
        <h1 class="display">Читайте так, чтобы вас было <em>легко слушать.</em></h1>
        <p class="lead hero__lead">Персональная студия чтения вслух: критерии ФИПИ, разбор произношения, паузы, интонация и живая проверка записи. Без хаоса и случайных советов.</p>
        <div class="hero__actions">
          <a class="btn btn--primary btn--large" href="#/check">${icon('mic')}Проверить чтение</a>
          <a class="btn btn--ghost btn--large" href="#/texts">Открыть библиотеку</a>
        </div>
        <p class="hero__note">${icon('check')}1:30 на подготовку · 1:30 на чтение · 1 первичный балл</p>
      </div>
      <aside class="hero__card" aria-label="Паспорт задания 1">
        <div class="hero__card-top">
          <div>
            <p class="hero__card-label">Паспорт задания</p>
            <h2 class="hero__card-title">Чтение текста<br>вслух</h2>
          </div>
          <div class="hero__stamp"><strong>1</strong><small>балл<br>ФИПИ</small></div>
        </div>
        <div class="hero__wave" aria-hidden="true">
          ${Array.from({ length: 38 }, () => '<span></span>').join('')}
        </div>
        <div class="hero__facts">
          <div class="hero__fact"><strong>1:30</strong><span>подготовка</span></div>
          <div class="hero__fact"><strong>150+</strong><span>слов в тексте</span></div>
          <div class="hero__fact"><strong>5</strong><span>ошибок — предел</span></div>
        </div>
        <div class="hero__card-foot">
          <span>Формат ФИПИ · английский язык</span>
          <span>2026</span>
        </div>
      </aside>
    </section>

    <div class="fact-strip">
      ${EXAM_FACTS.map(fact => `
        <div class="fact-strip__item">
          <p class="fact-strip__label">${esc(fact.label)}</p>
          <p class="fact-strip__value">${esc(fact.value)}</p>
          <p class="fact-strip__note">${esc(fact.note)}</p>
        </div>`).join('')}
    </div>

    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker">Три опоры</span>
          <h2 class="h2">Не «учите акцент». Убирайте то, что мешает понять вас.</h2>
        </div>
        <a class="link" href="#/sources">Как устроен метод ${icon('arrow-right')}</a>
      </div>
      <div class="pillar-grid">
        <a class="pillar" href="#/mistakes">
          <span class="pillar__num">01</span>
          <span class="pillar__icon">${icon('alert', 'icon--lg')}</span>
          <h3 class="h3">Частые ошибки</h3>
          <p>Слова, которые чаще всего звучат неверно: IPA, привычная русская подмена и объяснение, что именно поправить.</p>
          <span class="pillar__foot">Топ-12 слов и минимальные пары ${icon('arrow-right')}</span>
        </a>
        <a class="pillar" href="#/rules">
          <span class="pillar__num">02</span>
          <span class="pillar__icon">${icon('book-open', 'icon--lg')}</span>
          <h3 class="h3">Как не ошибаться</h3>
          <p>Ударение, окончания, немые буквы, имена и числительные — правила, которые реально встречаются в текстах задания 1.</p>
          <span class="pillar__foot">Правила, таблицы и квизы ${icon('arrow-right')}</span>
        </a>
        <a class="pillar" href="#/fluency">
          <span class="pillar__num">03</span>
          <span class="pillar__icon">${icon('speech', 'icon--lg')}</span>
          <h3 class="h3">Единство речи</h3>
          <p>Смысловые группы, оправданные паузы, фразовое ударение и спокойный интонационный контур вместо чтения по словам.</p>
          <span class="pillar__foot">Ритм, паузы и тон ${icon('arrow-right')}</span>
        </a>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker">Как это работает</span>
          <h2 class="h2">От записи до конкретного следующего шага.</h2>
        </div>
      </div>
      <div class="steps">
        <div class="step"><span class="step__num">01</span><h4>Выберите текст</h4><p>Тренировочный из библиотеки или свой — вставьте текст из банка ФИПИ.</p></div>
        <div class="step"><span class="step__num">02</span><h4>Прочитайте вслух</h4><p>Таймер 1:30, микрофон и живое распознавание речи. Можно остановить раньше.</p></div>
        <div class="step"><span class="step__num">03</span><h4>Получите разбор</h4><p>Движок сопоставляет транскрипт с текстом, считает паузы, темп и тон.</p></div>
        <div class="step"><span class="step__num">04</span><h4>Исправьте одно</h4><p>Три конкретных действия, слова-ловушки и повторная запись через день.</p></div>
      </div>
    </section>

    <section class="section">
      <div class="criteria-card card card--dark">
        <span class="kicker">Критерий ФИПИ · задание 1</span>
        <blockquote class="criteria-quote">${esc(CRITERIA.one)}</blockquote>
        <div class="criteria-limits">
          ${CRITERIA.limits.map(limit => `
            <div class="criteria-limit">
              <strong>${esc(limit.value)}</strong>
              <span>${esc(limit.label)}</span>
              <small>${esc(limit.note)}</small>
            </div>`).join('')}
        </div>
        <a class="link mt-24" href="#/rules" style="color:#f0dfc6">Разобрать критерий по частям ${icon('arrow-right')}</a>
      </div>
    </section>

    ${latest ? `
      <section class="section">
        <div class="section-head">
          <div class="section-head__text">
            <span class="kicker">Ваш прогресс</span>
            <h2 class="h2">Последняя попытка.</h2>
          </div>
          <a class="link" href="#/progress">Вся история ${icon('arrow-right')}</a>
        </div>
        <div class="card">
          <div class="progress-mini">
            <div class="progress-mini__score${latest.verdict === 0 ? ' is-zero' : ''}">${latest.verdict === 1 ? '1' : latest.verdict === 0 ? '0' : '—'}<small>${latest.verdict === 1 ? 'балл' : latest.verdict === 0 ? 'баллов' : 'нет данных'}</small></div>
            <div>
              <div class="row row--between">
                <strong>${esc(latest.textTitle || 'Чтение')}</strong>
                <span class="small">${esc(fmtDate(latest.createdAt, true))}</span>
              </div>
              <div class="progress-mini__bar"><span style="width:${Math.round((latest.scores?.overall || 0))}%"></span></div>
              <div class="progress-mini__meta">
                <span>${latest.wpm ?? '—'} слов/мин</span>
                <span>Покрытие ${Math.round((latest.coverage || 0) * 100)}%</span>
                <span>${latest.issues?.length || 0} замечаний</span>
              </div>
            </div>
            <a class="btn btn--ghost btn--small" href="#/report/${esc(latest.id)}">Открыть</a>
          </div>
        </div>
      </section>` : ''}

    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker">Текст недели</span>
          <h2 class="h2">Начните с разбора, а не с записи.</h2>
        </div>
        <a class="link" href="#/texts">Все тексты ${icon('arrow-right')}</a>
      </div>
      <div class="feature">
        <div>
          <div class="row gap-8" style="margin-bottom:14px">
            <span class="tag tag--forest">Образец разбора</span>
            <span class="tag">${esc(featured.topic)}</span>
            <span class="tag">${esc(featured.level)}</span>
          </div>
          <h3 class="h2" style="font-size:clamp(1.4rem,2.4vw,2rem)">${esc(featured.title)}</h3>
          <p class="small" style="margin-top:4px">${esc(featured.titleRu)}</p>
          <p class="feature__preview" style="margin-top:20px">${esc(featured.body.split(/\n\n/)[0])}</p>
        </div>
        <div class="feature__meta">
          <div class="feature__stats">
            <div class="feature__stat"><span>Объём</span><strong>${featuredWords} слов</strong></div>
            <div class="feature__stat"><span>Слов-ловушек</span><strong>${featured.traps.length}</strong></div>
            <div class="feature__stat"><span>Образцовый разбор</span><strong>${featured.modelNotes ? 'есть' : '—'}</strong></div>
            <div class="feature__stat"><span>Время</span><strong>≈ 1:30</strong></div>
          </div>
          <div class="feature__actions">
            <a class="btn btn--primary" href="#/texts/${esc(featured.id)}">Открыть разбор</a>
            <a class="btn btn--ghost" href="#/check?text=${esc(featured.id)}">${icon('mic', 'icon--sm')}Записать чтение</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="card card--quiet">
        <div class="row row--between gap-16" style="align-items:flex-start">
          <div style="max-width:720px">
            <span class="kicker kicker--muted">О базе</span>
            <h3 class="h3 mt-8">Почему здесь нет скопированных текстов ФИПИ</h3>
            <p class="small mt-8">Официальные тексты — объект авторского права, поэтому ALOUD не выкладывает их архивом. В библиотеке — 10 оригинальных текстов того же формата, а официальные материалы открываются по ссылкам на ФИПИ. Свой текст из открытого банка можно вставить и разобрать локально.</p>
          </div>
          <a class="btn btn--ghost" href="#/sources">${icon('flag', 'icon--sm')}Источники и метод</a>
        </div>
      </div>
    </section>
  `;
}

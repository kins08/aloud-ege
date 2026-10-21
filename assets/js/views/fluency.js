import {
  FLUENCY_PILLARS, THOUGHT_GROUP_RULES, PHRASE_EXAMPLES, PAUSE_HIERARCHY,
  WEAK_FORMS, SENTENCE_STRESS, INTONATION_PATTERNS, LINKING_RULES,
  TEMPO, PHRASE_TRAINER, MIC_TIPS
} from '../data/fluency.js';
import { QUIZZES } from '../data/lessons.js';
import { esc, icon, speak, renderQuiz, bindQuizzes } from '../ui.js';

function chunksList(chunks) {
  return `
    <div class="chunk-list">
      ${chunks.map(chunk => `
        <button class="chunk" type="button" data-speak="${esc(chunk.text)}" title="Прослушать группу">
          ${esc(chunk.text)}
          <span class="chunk__note">${esc(chunk.note || '')}</span>
        </button>`).join('')}
    </div>`;
}

function pillarsSection() {
  return `
    <div class="pillar-mini-grid">
      ${FLUENCY_PILLARS.map(pillar => `
        <article class="pillar-mini">
          <span class="pillar-mini__num">${esc(pillar.num)}</span>
          <h4>${esc(pillar.title)}</h4>
          <p>${esc(pillar.text)}</p>
          <div class="pillar-mini__symbol">${esc(pillar.symbol)}</div>
        </article>`).join('')}
    </div>`;
}

function thoughtGroups() {
  return `
    <section class="section">
      <div class="grid--sidebar" style="display:grid">
        <div class="card">
          <span class="kicker kicker--muted">Смысловые группы</span>
          <h3 class="h3" style="margin-top:8px">Пауза — на границе мысли</h3>
          <p class="small" style="margin-top:6px">Английская фраза не рассыпается на слова. Внутри группы слова звучат слитно, а пауза появляется там, где заканчивается мысль.</p>
          <div style="margin-top:10px">
            ${THOUGHT_GROUP_RULES.map(rule => `
              <div class="group-rule">
                <h4>${esc(rule.title)}</h4>
                <p>${esc(rule.rule)}</p>
                <div class="group-compare">
                  <div class="good"><small>так</small>${esc(rule.good)}</div>
                  <div class="bad"><small>не так</small>${esc(rule.bad)}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <aside class="stack gap-16">
          <div class="side-card">
            <p class="side-card__title">Иерархия пауз</p>
            <div class="pause-table">
              ${PAUSE_HIERARCHY.map(row => `
                <div class="pause-row">
                  <b>${esc(row.mark)}</b>
                  <span>${esc(row.length)}</span>
                  <span>${esc(row.note)}</span>
                </div>`).join('')}
            </div>
          </div>
          <div class="side-card card--dark">
            <span class="kicker" style="color:#e9c79b">Одна мысль</span>
            <p class="aside-note" style="color:rgba(242,236,223,.78);margin-top:8px">Если вы не можете объяснить, зачем здесь пауза, — её, скорее всего, не нужно. Дыхание берём на границе смысла, а не после каждого слова.</p>
          </div>
        </aside>
      </div>
    </section>`;
}

function phraseExamples() {
  return `
    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Разметка</span>
          <h2 class="h2">Как звучит текст по группам</h2>
          <p class="lead" style="font-size:13.5px;margin-top:10px">Наводите курсор или фокусируйтесь на группе, чтобы увидеть пояснение. Нажатие озвучивает фрагмент — соединяйте их без лишних пауз.</p>
        </div>
      </div>
      <div class="grid grid--2">
        ${PHRASE_EXAMPLES.map(example => `
          <div class="card">
            <span class="kicker kicker--muted">${esc(example.title)}</span>
            <p class="small" style="margin-top:6px">${esc(example.meta)}</p>
            ${chunksList(example.chunks)}
          </div>`).join('')}
      </div>
    </section>`;
}

function stressSection() {
  const uppercase = esc(SENTENCE_STRESS.example.full).replace(/\b([A-Z][A-Z'-]{1,}(?:\s+[A-Z][A-Z'-]+)*)\b/g, '<b>$1</b>');
  return `
    <section class="section">
      <div class="grid--sidebar" style="display:grid">
        <div class="card">
          <span class="kicker kicker--muted">Фразовое ударение</span>
          <h3 class="h3" style="margin-top:8px">Сильные слова, слабые слова</h3>
          <p class="small" style="margin-top:6px">${esc(SENTENCE_STRESS.principle)}</p>
          <div class="stress-example">${uppercase}</div>
          <p class="small" style="margin-top:10px">${esc(SENTENCE_STRESS.example.caption)}</p>
          <div class="row gap-8" style="margin-top:12px">
            <button class="btn btn--soft btn--small" type="button" data-speak="${esc(SENTENCE_STRESS.example.full.replace(/\b([A-Z]{2,})\b/g, word => word.toLowerCase()))}">${icon('volume', 'icon--sm')}Прослушать ритм</button>
            <span class="tag tag--outline">${esc(SENTENCE_STRESS.example.note)}</span>
          </div>
        </div>
        <aside class="side-card">
          <p class="side-card__title">Слабые формы</p>
          <p class="aside-note">Служебные слова почти не получают ударения. Именно поэтому «bread and butter» звучит как одно слово, а не как три.</p>
          <div style="overflow-x:auto;margin-top:12px">
            <table class="weak-table">
              <thead><tr><th>Слово</th><th>Сильно</th><th>Слабо</th><th>Пример</th></tr></thead>
              <tbody>
                ${WEAK_FORMS.map(form => `
                  <tr>
                    <td>${esc(form.word)}</td>
                    <td class="ipa">${esc(form.strong)}</td>
                    <td class="ipa">${esc(form.weak)}</td>
                    <td class="small">${esc(form.example)}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </section>`;
}

function intonationSection() {
  return `
    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Тон</span>
          <h2 class="h2">Контур, который несёт смысл</h2>
          <p class="lead" style="font-size:13.5px;margin-top:10px">В задании 1 нужен спокойный информационный тон. Утверждение завершается падением, перечисление — чередованием подъёма и падения. Театральность не нужна.</p>
        </div>
      </div>
      <div class="intonation-grid">
        ${INTONATION_PATTERNS.map(pattern => `
          <article class="intonation-card">
            <div class="row row--between">
              <span class="intonation-card__symbol">${esc(pattern.symbol)}</span>
              <button class="speak-btn" type="button" data-speak="${esc(pattern.example)}" aria-label="Прослушать пример">${icon('volume')}</button>
            </div>
            <h4>${esc(pattern.title)}</h4>
            <p>${esc(pattern.rule)}</p>
            <div class="intonation-card__example">${esc(pattern.example)}</div>
            <p class="intonation-card__note">${esc(pattern.note)}</p>
          </article>`).join('')}
      </div>
    </section>`;
}

function linkingSection() {
  return `
    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Связность</span>
          <h2 class="h2">Почему англичане «проглатывают» границы слов</h2>
          <p class="lead" style="font-size:13.5px;margin-top:10px">Связывание — не трюк, а естественный результат быстрой артикуляции. Оно делает речь слитной, но не отменяет окончания.</p>
        </div>
      </div>
      <div class="card">
        ${LINKING_RULES.map(rule => `
          <div class="linking-row">
            <h4>${esc(rule.title)}</h4>
            <p>${esc(rule.rule)}</p>
            <div class="linking-row__example">
              <button class="chunk chunk--pair" type="button" data-speak="${esc(rule.example)}">${esc(rule.example)}</button>
              <span class="ipa">${esc(rule.phonetic)}</span>
              <span class="small">${esc(rule.note)}</span>
            </div>
          </div>`).join('')}
      </div>
    </section>`;
}

function tempoSection() {
  return `
    <section class="section">
      <div class="grid--sidebar" style="display:grid">
        <div class="tempo-card">
          <span class="kicker">Темп</span>
          <div class="tempo-card__value">${esc(TEMPO.target)}</div>
          <p class="tempo-card__formula">${esc(TEMPO.formula)}</p>
          <p>${esc(TEMPO.tip)}</p>
          <div class="tempo-scale" aria-hidden="true">
            <span></span><span></span><span class="is-target"></span><span class="is-target"></span><span></span><span></span>
          </div>
          <div class="tempo-scale__labels"><span>медленно</span><span>цель</span><span>быстро</span></div>
        </div>
        <aside class="stack gap-16">
          <div class="side-card">
            <p class="side-card__title">Слишком быстро</p>
            <p class="aside-note">${esc(TEMPO.fast)}</p>
          </div>
          <div class="side-card">
            <p class="side-card__title">Слишком медленно</p>
            <p class="aside-note">${esc(TEMPO.slow)}</p>
          </div>
        </aside>
      </div>
    </section>`;
}

function trainerSection() {
  return `
    <section class="section">
      <div class="grid--sidebar" style="display:grid">
        <div class="card">
          <span class="kicker kicker--muted">Мини-тренажёр</span>
          <h2 class="h2" style="margin-top:8px">${esc(PHRASE_TRAINER.title)}</h2>
          <p class="small" style="margin-top:6px">${esc(PHRASE_TRAINER.intro)}</p>
          ${chunksList(PHRASE_TRAINER.chunks)}
          <div class="row gap-8" style="margin-top:14px">
            <button class="btn btn--primary btn--small" type="button" id="trainerSpeak">${icon('play', 'icon--sm')}Прослушать целиком</button>
            <span class="small">Сначала по группам, затем целиком.</span>
          </div>
        </div>
        <aside class="side-card">
          <p class="side-card__title">Работа с микрофоном</p>
          <div class="stack gap-12">
            ${MIC_TIPS.map(tip => `
              <div>
                <h4 style="font-size:12px">${esc(tip.title)}</h4>
                <p class="aside-note" style="margin-top:2px">${esc(tip.text)}</p>
              </div>`).join('')}
          </div>
        </aside>
      </div>
    </section>`;
}

function bindSpeak(root) {
  root.querySelectorAll('[data-speak]').forEach(button => {
    button.addEventListener('click', () => speak(button.dataset.speak));
  });
}

export function render(root) {
  root.innerHTML = `
    <div class="page-head">
      <div class="page-head__text">
        <span class="kicker">Единство речи</span>
        <h1 class="h2">Не слова. Группы, паузы и один спокойный тон.</h1>
        <p class="lead">«Лёгкость восприятия» из критерия ФИПИ — это не идеальный акцент, а понятная структура. Смысловые группы, оправданные паузы, фразовое ударение и движение тона собирают текст в речь.</p>
      </div>
      <div class="page-head__actions">
        <a class="btn btn--ghost" href="#/rules">${icon('book-open', 'icon--sm')}Правила</a>
        <a class="btn btn--primary" href="#/check">${icon('mic', 'icon--sm')}Записать чтение</a>
      </div>
    </div>

    ${pillarsSection()}
    ${thoughtGroups()}
    ${phraseExamples()}
    ${stressSection()}
    ${intonationSection()}
    ${linkingSection()}
    ${tempoSection()}
    ${trainerSection()}

    <section class="section">
      <div class="grid--sidebar" style="display:grid">
        <div>
          <div class="section-head">
            <div class="section-head__text">
              <span class="kicker kicker--muted">Проверка</span>
              <h2 class="h2">Где пауза?</h2>
            </div>
          </div>
          ${renderQuiz(QUIZZES.pause, 'fluency-pause')}
        </div>
        <aside class="side-card card--dark">
          <span class="kicker" style="color:#e9c79b">Финальная мысль</span>
          <h3 class="h3" style="margin-top:9px;color:var(--paper)">Читайте так, чтобы вас было легко слушать.</h3>
          <p class="aside-note" style="color:rgba(242,236,223,.78);margin-top:8px">Один короткий вдох перед стартом. Ровная скорость важнее спешки к концу. Ошибка в слове — не повод останавливать текст.</p>
          <a class="link" href="#/check" style="color:#e9c79b;margin-top:14px">Проверить запись ${icon('arrow-right')}</a>
        </aside>
      </div>
    </section>
  `;

  bindSpeak(root);
  bindQuizzes(root);

  root.querySelector('#trainerSpeak')?.addEventListener('click', () => {
    speak(PHRASE_TRAINER.chunks.map(chunk => chunk.text).join(' '));
  });
}

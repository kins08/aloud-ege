import {
  STRESS_RULES, ENDING_RULES, LETTER_PATTERNS, PROPER_NAMES, HOMOGRAPHS,
  NUMERAL_SECTIONS, NUMBER_STRESS, QUIZZES, CHECKLIST
} from '../data/lessons.js';
import {
  esc, icon, speak, renderQuiz, bindQuizzes
} from '../ui.js';
import { getChecklist, saveChecklist } from '../store.js';

function speakBtn(text, label = 'Прослушать') {
  return `<button class="speak-btn" type="button" data-speak="${esc(text)}" aria-label="${esc(label)}: ${esc(text)}" title="${esc(label)}">${icon('volume')}</button>`;
}

function exampleChip(word, ipa) {
  return `
    <button class="example-chip" type="button" data-speak="${esc(word)}" title="Прослушать: ${esc(word)}">
      <b>${esc(word)}</b>${ipa ? `<span class="ipa">${esc(ipa)}</span>` : ''}
    </button>`;
}

function stressSection() {
  return `
    <section class="section" id="stressSection">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Ударение</span>
          <h2 class="h2">Куда падает ударение — и почему</h2>
          <p class="lead" style="font-size:13.5px;margin-top:10px">Не нужно запоминать каждое длинное слово отдельно. Большинство интернациональных слов подчиняются суффиксным правилам. Учите не слово, а семью слов.</p>
        </div>
      </div>
      <div class="grid grid--2">
        ${STRESS_RULES.map(rule => `
          <article class="rule-card">
            <span class="rule-card__tag">${esc(rule.tag)}</span>
            <h3>${esc(rule.title)}</h3>
            <p>${esc(rule.rule)}</p>
            <div class="example-row">
              ${rule.examples.map(example => exampleChip(example.word, example.ipa)).join('')}
            </div>
          </article>`).join('')}
      </div>
      <p class="speak-tip">${icon('volume')}Нажимайте на чипы: сначала слушайте, затем повторяйте вслух. Ударный слог — громче и чуть длиннее, но без театральности.</p>
    </section>`;
}

function endingsSection() {
  const renderEnding = (title, key, note) => `
    <div class="card">
      <div class="row row--between" style="align-items:flex-start">
        <div>
          <span class="kicker kicker--muted">${esc(key === 'ed' ? 'Прошедшее время' : 'Множественное число и 3-е лицо')}</span>
          <h3 class="h3" style="margin-top:6px">${esc(title)}</h3>
        </div>
        <span class="tag tag--outline">${esc(note)}</span>
      </div>
      <div class="ending-grid" style="margin-top:16px">
        ${ENDING_RULES[key].map(group => `
          <div class="ending-card">
            <div class="ending-card__sound">${esc(group.sound)}</div>
            <div class="ending-card__cond">${esc(group.condition)}</div>
            <p class="ending-card__tip">${esc(group.tip)}</p>
            <div class="example-row">
              ${group.examples.map(example => exampleChip(example.word, example.ipa)).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  return `
    <section class="section" id="endingsSection">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Окончания</span>
          <h2 class="h2">Окончание — это звук, а не буква</h2>
          <p class="lead" style="font-size:13.5px;margin-top:10px">В задании 1 потерянное -ed или -s почти сразу слышно. Правило простое: звук зависит от последнего звука основы, а не от написания.</p>
        </div>
      </div>
      <div class="stack gap-16">
        ${renderEnding('-ed: три варианта', 'ed', '/t/ · /d/ · /ɪd/')}
        ${renderEnding('-s / -es: три варианта', 's', '/s/ · /z/ · /ɪz/')}
      </div>
    </section>`;
}

function lettersSection() {
  return `
    <section class="section" id="lettersSection">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Буквы и звуки</span>
          <h2 class="h2">Английское написание обманывает</h2>
          <p class="lead" style="font-size:13.5px;margin-top:10px">th, ough, ea, oo, ch, wh — самые нестабильные сочетания. Учите их через слова, а не через одно универсальное правило.</p>
        </div>
      </div>
      <div class="pattern-list">
        ${LETTER_PATTERNS.map(pattern => `
          <article class="pattern-card">
            <h4>${esc(pattern.title)}</h4>
            <p>${esc(pattern.rule)}</p>
            <div class="example-row">
              ${pattern.chips.map(chip => {
                const match = chip.match(/^(.*?)\s+(\/.*\/)$/);
                return exampleChip(match ? match[1] : chip, match ? match[2] : '');
              }).join('')}
            </div>
          </article>`).join('')}
      </div>
    </section>`;
}

function namesSection() {
  return `
    <section class="section" id="namesSection">
      <div class="grid--sidebar" style="display:grid">
        <div class="card">
          <span class="kicker kicker--muted">Имена и места</span>
          <h3 class="h3" style="margin-top:8px">География, которую трудно угадать</h3>
          <p class="small" style="margin-top:6px">В текстах о городах, музеях и путешествиях эти названия встречаются постоянно. Прочитайте таблицу вслух вслед за синтезатором речи.</p>
          <div style="overflow-x:auto;margin-top:14px">
            <table class="names-table">
              <thead><tr><th>Название</th><th>Произношение</th><th>Подсказка</th><th></th></tr></thead>
              <tbody>
                ${PROPER_NAMES.map(place => `
                  <tr>
                    <td>${esc(place.name)}</td>
                    <td><span class="ipa">${esc(place.ipa)}</span></td>
                    <td class="small">${esc(place.note)}</td>
                    <td>${speakBtn(place.name)}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <aside class="stack gap-16">
          <div class="side-card card--dark">
            <span class="kicker" style="color:#e9c79b">Перед чтением</span>
            <p class="aside-note" style="color:rgba(242,236,223,.78);margin-top:8px">На подготовке обведите каждое имя собственное и число. Если название незнакомо, произнесите его шёпотом один раз — чтобы не встретить впервые вслух.</p>
          </div>
          <div class="side-card">
            <p class="side-card__title">Осторожно</p>
            <p class="aside-note">Austria /ˈɒstriə/ и Australia /ɒˈstreɪliə/ — разные страны. Europe начинается с /j/. Thames звучит как /temz/, а не «Тэймс».</p>
          </div>
        </aside>
      </div>
    </section>`;
}

function homographsSection() {
  return `
    <section class="section" id="homographsSection">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Один вид — разный звук</span>
          <h2 class="h2">Слова, которые меняются в контексте</h2>
          <p class="lead" style="font-size:13.5px;margin-top:10px">Перед чтением посмотрите на роль слова в предложении: существительное или глагол, настоящее или прошедшее время. От этого зависит произношение.</p>
        </div>
        <span class="tag tag--gold">${HOMOGRAPHS.length} пар</span>
      </div>
      <div class="card">
        ${HOMOGRAPHS.map(item => `
          <div class="homograph">
            <div class="row row--between">
              <span class="homograph__word">${esc(item.word)}</span>
              <span class="tag tag--outline">проверьте контекст</span>
            </div>
            <div class="homograph__pair">
              <div class="homograph__side">
                <b>${esc(item.a.pos)} ${speakBtn(item.word, 'Прослушать вариант')}</b>
                <span class="ipa">${esc(item.a.ipa)}</span>
                <span>«${esc(item.a.example)}»</span>
                <span>${esc(item.a.ru)}</span>
              </div>
              <div class="homograph__side">
                <b>${esc(item.b.pos)} ${speakBtn(item.word, 'Прослушать вариант')}</b>
                <span class="ipa">${esc(item.b.ipa)}</span>
                <span>«${esc(item.b.example)}»</span>
                <span>${esc(item.b.ru)}</span>
              </div>
            </div>
            <p class="homograph__tip">${esc(item.tip)}</p>
          </div>`).join('')}
      </div>
      <p class="report-note" style="margin-top:10px">Кнопка озвучивания читает написание, а не выбранный смысл. Для пар вроде read /red/ ориентируйтесь на транскрипцию и контекст.</p>
    </section>`;
}

function numeralsSection() {
  return `
    <section class="section" id="numeralsSection">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Числительные</span>
          <h2 class="h2">Числа читаются не так, как выглядят</h2>
          <p class="lead" style="font-size:13.5px;margin-top:10px">Год — не «тысяча девятьсот…», дата — не «пятое марта» по-русски, а «the fifth of March». Ниже — все типы, которые встречаются в текстах задания 1.</p>
        </div>
      </div>
      <div class="numeral-grid">
        ${NUMERAL_SECTIONS.map(section => `
          <article class="numeral-section">
            <div class="numeral-section__head">
              <h4>${esc(section.title)}</h4>
              <span class="badge">${section.items.length}</span>
            </div>
            <p class="numeral-section__intro">${esc(section.intro)}</p>
            <div class="numeral-rows">
              ${section.items.map(item => `
                <div class="numeral-row">
                  <span class="numeral-row__value">${esc(item.value)}</span>
                  <span class="numeral-row__say">${esc(item.say)} ${speakBtn(item.say, 'Прослушать число')}</span>
                  <span class="numeral-row__note">${esc(item.note)}</span>
                </div>`).join('')}
            </div>
          </article>`).join('')}
      </div>

      <div class="card" style="margin-top:18px">
        <div class="row row--between" style="align-items:flex-start">
          <div>
            <span class="kicker kicker--muted">Ударение в числах</span>
            <h3 class="h3" style="margin-top:6px">Thirteen или thirty?</h3>
          </div>
          <span class="tag tag--accent">частая ошибка</span>
        </div>
        <div style="overflow-x:auto;margin-top:14px">
          <table class="names-table">
            <thead><tr><th>Пара</th><th>-teen: ударение в конце</th><th>-ty: ударение в начале</th></tr></thead>
            <tbody>
              ${NUMBER_STRESS.map(item => `
                <tr>
                  <td>${esc(item.pair)}</td>
                  <td>${esc(item.a)} <span class="ipa">${esc(item.aIpa)}</span> ${speakBtn(item.a)}</td>
                  <td>${esc(item.b)} <span class="ipa">${esc(item.bIpa)}</span> ${speakBtn(item.b)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <p class="small" style="margin-top:10px">В -teen ударение на последний слог и долгий /iː/. В -ty ударение на первый, финал короткий. В беглом чтении эта разница должна сохраняться.</p>
      </div>

      <div class="grid grid--2" style="margin-top:18px">
        ${renderQuiz(QUIZZES.years, 'rules-years')}
        ${renderQuiz(QUIZZES.ed, 'rules-ed')}
      </div>
    </section>`;
}

function checklistSection() {
  const saved = getChecklist();
  return `
    <section class="section" id="checklistSection">
      <div class="grid--sidebar" style="display:grid">
        <div class="card">
          <span class="kicker kicker--muted">Чек-лист</span>
          <h2 class="h2" style="margin-top:10px">Перед каждой записью</h2>
          <p class="small" style="margin-top:8px">Отмечайте пункты прямо здесь — состояние сохранится на устройстве. Чек-лист не заменяет подготовку, но не даёт забыть главное.</p>
          <div class="checklist" style="margin-top:12px">
            ${CHECKLIST.map((item, index) => `
              <label class="checklist-item${saved[index] ? ' is-done' : ''}">
                <input type="checkbox" data-check="${index}" ${saved[index] ? 'checked' : ''}>
                <span>${esc(item)}</span>
              </label>`).join('')}
          </div>
        </div>
        <aside class="stack gap-16">
          <div class="side-card">
            <p class="side-card__title">Три вопроса после чтения</p>
            <ol class="aside-list" style="list-style:none">
              <li><span class="badge">1</span><span>Слышны ли окончания -ed и -s?</span></li>
              <li><span class="badge">2</span><span>Не разорваны ли артикли, предлоги и прилагательные?</span></li>
              <li><span class="badge">3</span><span>Есть ли падение тона в конце утверждений?</span></li>
            </ol>
          </div>
          <div class="side-card card--accent">
            <p class="mini-label" style="color:var(--danger)">Помните</p>
            <p class="aside-note" style="margin-top:6px">Одна ошибка в слове не требует начинать текст заново. Эксперт оценивает общую лёгкость восприятия, а не безупречность.</p>
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
        <span class="kicker">Как не ошибаться</span>
        <h1 class="h2">Правила, которые слышны в чтении.</h1>
        <p class="lead">Ударение, окончания, буквосочетания и числа — четыре зоны, где автоматический разбор чаще всего находит расхождения. Здесь же — минимальный чек-лист перед записью.</p>
      </div>
      <div class="page-head__actions">
        <a class="btn btn--ghost" href="#/mistakes">${icon('alert', 'icon--sm')}Слова-ловушки</a>
        <a class="btn btn--primary" href="#/check">${icon('mic', 'icon--sm')}К проверке</a>
      </div>
    </div>

    <div class="row gap-8" style="margin-bottom:26px">
      <span class="tag tag--gold">${STRESS_RULES.length} правил ударения</span>
      <span class="tag">${LETTER_PATTERNS.length} буквенных ловушек</span>
      <span class="tag">${NUMERAL_SECTIONS.length} типов чисел</span>
      <span class="tag tag--outline">чек-лист внутри</span>
    </div>

    ${stressSection()}
    ${endingsSection()}
    ${lettersSection()}
    ${namesSection()}
    ${homographsSection()}
    ${numeralsSection()}

    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Проверка</span>
          <h2 class="h2">Ещё два вопроса</h2>
        </div>
      </div>
      <div class="grid grid--2">
        ${renderQuiz(QUIZZES.pairs, 'rules-pairs')}
        ${renderQuiz(QUIZZES.intonation, 'rules-intonation')}
      </div>
    </section>

    ${checklistSection()}
  `;

  bindSpeak(root);
  bindQuizzes(root);

  root.querySelectorAll('[data-check]').forEach(input => {
    input.addEventListener('change', () => {
      input.closest('.checklist-item')?.classList.toggle('is-done', input.checked);
      const values = [...root.querySelectorAll('[data-check]')]
        .sort((a, b) => Number(a.dataset.check) - Number(b.dataset.check))
        .map(item => item.checked);
      saveChecklist(values);
    });
  });
}

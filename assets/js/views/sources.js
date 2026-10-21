import {
  CRITERIA, EXAM_FACTS, PRONUNCIATION_RULES, SOURCES, METHOD, COPYRIGHT_NOTE, VERSION
} from '../data/sources.js';
import { esc, icon } from '../ui.js';

function criteriaCard() {
  return `
    <section class="card card--dark criteria-card">
      <span class="kicker" style="color:#e9c79b">Критерий ФИПИ · задание 1</span>
      <h2 class="h2" style="margin-top:12px;color:var(--paper)">Один балл за лёгкость восприятия.</h2>
      <p class="criteria-quote">${esc(CRITERIA.one)}</p>
      <div class="criteria-limits">
        ${CRITERIA.limits.map(limit => `
          <div class="criteria-limit">
            <strong>${esc(limit.value)}</strong>
            <span>${esc(limit.label)}</span>
            <small>${esc(limit.note)}</small>
          </div>`).join('')}
      </div>
    </section>

    <section class="section">
      <div class="grid--sidebar" style="display:grid">
        <div class="card">
          <span class="kicker kicker--muted">Когда ставится 0</span>
          <h3 class="h3" style="margin-top:10px">Что обнуляет ответ</h3>
          <p class="small" style="margin-top:12px">${esc(CRITERIA.zero)}</p>
        </div>
        <aside class="side-card">
          <p class="side-card__title">Что это значит на практике</p>
          <ul class="list-dash">
            <li>Ошибки считаются фонетические: звук, ударение, окончание, искажение слова.</li>
            <li>Пауза «на подумать» посреди фразы — необоснованная. Пауза на границе мысли — норма.</li>
            <li>Смысловые ошибки опаснее: три искажения — и балл уже 0, даже если речь плавная.</li>
          </ul>
        </aside>
      </div>
    </section>`;
}

function factsStrip() {
  return `
    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Паспорт задания</span>
          <h2 class="h2">Формат без домыслов</h2>
        </div>
      </div>
      <div class="fact-strip">
        ${EXAM_FACTS.map(fact => `
          <div class="fact-strip__item" title="${esc(fact.source)}">
            <p class="fact-strip__label">${esc(fact.label)}</p>
            <p class="fact-strip__value">${esc(fact.value)}</p>
            <p class="fact-strip__note">${esc(fact.note)}</p>
          </div>`).join('')}
      </div>
    </section>`;
}

function pronunciationRules() {
  return `
    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Рамки оценивания</span>
          <h2 class="h2">Акцент, нормы и смысл</h2>
          <p class="small" style="margin-top:10px">Три вопроса, которые чаще всего вызывают спор: какой акцент «правильный», что именно считают ошибкой и когда она искажает смысл.</p>
        </div>
      </div>
      <div class="grid grid--3">
        ${PRONUNCIATION_RULES.map(rule => `
          <article class="card">
            <h3 class="h4">${esc(rule.title)}</h3>
            <p class="small" style="margin-top:9px">${esc(rule.text)}</p>
            <p class="mini-label" style="margin-top:14px">${esc(rule.source)}</p>
          </article>`).join('')}
      </div>
    </section>`;
}

function methodSection() {
  return `
    <section class="section" id="method">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Метод</span>
          <h2 class="h2">${esc(METHOD.title)}</h2>
          <p class="small" style="margin-top:10px">${esc(METHOD.intro)}</p>
        </div>
      </div>
      <div class="grid--sidebar" style="display:grid">
        <div class="card">
          <div class="method-steps">
            ${METHOD.steps.map(step => `
              <div class="method-step">
                <span class="method-step__num">${esc(step.num)}</span>
                <div>
                  <h4>${esc(step.title)}</h4>
                  <p>${esc(step.text)}</p>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <aside class="stack gap-16">
          <div class="side-card">
            <p class="side-card__title">Логика вердикта</p>
            <ul class="list-dash">
              ${METHOD.verdictLogic.map(line => `<li>${esc(line)}</li>`).join('')}
            </ul>
          </div>
          <div class="side-card card--accent">
            <p class="side-card__title" style="color:var(--danger)">Важные оговорки</p>
            <ul class="list-dash">
              ${METHOD.caveats.map(line => `<li>${esc(line)}</li>`).join('')}
            </ul>
          </div>
        </aside>
      </div>
    </section>`;
}

function sourcesSection() {
  return `
    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <span class="kicker kicker--muted">Библиография</span>
          <h2 class="h2">Источники, на которые опирается ALOUD</h2>
          <p class="small" style="margin-top:10px">Официальные документы ФИПИ — первоисточник критериев. Методические разборы и словарь — вспомогательные материалы для объяснений.</p>
        </div>
      </div>
      <div class="source-list">
        ${SOURCES.map(source => `
          <a class="source" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">
            <div class="source__body">
              <p class="source__title">${esc(source.title)}</p>
              <p class="source__meta">
                <span class="tag ${source.type === 'Официальный источник' ? 'tag--forest' : 'tag--outline'}">${esc(source.type)}</span>
                <span>${esc(source.publisher)}</span>
              </p>
              <p class="source__note">${esc(source.note)}</p>
            </div>
            <span class="source__arrow">${icon('arrow-right')}</span>
          </a>`).join('')}
      </div>
      <div class="copyright mt-24">
        <strong>Об авторских правах.</strong> ${esc(COPYRIGHT_NOTE)}
      </div>
      <p class="small mt-24" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <span class="tag tag--outline">${esc(VERSION)}</span>
        <span>Сайт не является официальным сервисом ФИПИ и не выставляет экзаменационный балл.</span>
      </p>
    </section>`;
}

export function render(root) {
  root.innerHTML = `
    <div class="page-head">
      <div class="page-head__text">
        <span class="kicker">Источники и метод</span>
        <h1 class="h2">Критерий — официальный. Оценка — тренировочная.</h1>
        <p class="lead">Здесь собрано, на чём основаны правила сайта: формулировка ФИПИ, формат задания и логика автоматической проверки. Без «секретных критериев» и непроверенных советов.</p>
      </div>
      <div class="page-head__actions">
        <a class="btn btn--ghost" href="https://ege.fipi.ru/bank/" target="_blank" rel="noopener noreferrer">${icon('flag', 'icon--sm')}Открытый банк ФИПИ</a>
        <a class="btn btn--primary" href="#/check">${icon('mic', 'icon--sm')}Проверить чтение</a>
      </div>
    </div>

    ${criteriaCard()}
    ${factsStrip()}
    ${pronunciationRules()}
    ${methodSection()}
    ${sourcesSection()}
  `;
}

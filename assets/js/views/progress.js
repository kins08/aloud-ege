import { getProgressSummary, deleteReport } from '../store.js';
import { categoryLabel, getCoverageLabel } from '../engine.js';
import { esc, icon, fmtDate, fmtDuration, confirmDialog, toast } from '../ui.js';

function verdictTag(verdict) {
  if (verdict === 1) return '<span class="tag tag--good">1 балл</span>';
  if (verdict === 0) return '<span class="tag tag--accent">0 баллов</span>';
  return '<span class="tag tag--gold">мало данных</span>';
}

function statCard(label, value, suffix, note) {
  return `
    <div class="stat-card">
      <p class="stat-card__label">${esc(label)}</p>
      <p class="stat-card__value">${value}${suffix ? `<small>${esc(suffix)}</small>` : ''}</p>
      <p class="stat-card__note">${esc(note)}</p>
    </div>`;
}

function chart(reports) {
  const recent = reports.slice(0, 12).reverse();
  if (!recent.length) return '';
  return `
    <div class="chart-card">
      <div class="row row--between" style="align-items:flex-start">
        <div>
          <p class="mini-label">Динамика</p>
          <h3 class="h4" style="margin-top:4px">Последние ${recent.length} ${recent.length === 1 ? 'попытка' : recent.length < 5 ? 'попытки' : 'попыток'}</h3>
        </div>
        <span class="small">${icon('chart', 'icon--sm')} оценка тренажёра, 0–100</span>
      </div>
      <div class="chart" role="list" aria-label="Оценки последних попыток">
        ${recent.map(report => {
          const score = Math.round(report.scores?.overall || 0);
          const date = new Date(report.createdAt);
          const label = Number.isNaN(date.getTime())
            ? ''
            : new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit' }).format(date);
          return `
            <a class="chart__col${report.verdict === 0 ? ' is-zero' : ''}" role="listitem"
               href="#/report/${esc(report.id)}"
               title="${esc(report.textTitle || 'Чтение')} · ${score}/100 · ${esc(fmtDate(report.createdAt))}">
              <span class="chart__value">${score}</span>
              <span class="chart__bar" style="height:${Math.max(4, score)}%"></span>
              <span class="chart__label">${esc(label)}</span>
            </a>`;
        }).join('')}
      </div>
    </div>`;
}

function focusCard(reports) {
  const counts = new Map();
  reports.forEach(report => {
    (report.issues || []).forEach(issue => {
      if (issue.kind === 'insertion' || issue.kind === 'extra') return;
      if (!issue.probable) return;
      const key = issue.category || 'pronunciation';
      counts.set(key, (counts.get(key) || 0) + 1);
    });
  });
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const [topCategory, topCount] = ranked[0] || [];
  const latest = reports[0];
  return `
    <aside class="stack gap-16">
      <div class="side-card">
        <p class="side-card__title">Следующий фокус</p>
        ${topCategory ? `
          <p class="h4">${esc(categoryLabel(topCategory))}</p>
          <p class="aside-note" style="margin-top:5px">${topCount} ${topCount === 1 ? 'пометка' : topCount < 5 ? 'пометки' : 'пометок'} в проверенных попытках. Начните с раздела «Частые ошибки» — там слова с IPA и подсказками.</p>
          <a class="link" href="#/mistakes" style="margin-top:12px">Разобрать ошибки ${icon('arrow-right')}</a>`
        : `<p class="h4">Повторяющихся ошибок нет</p>
          <p class="aside-note" style="margin-top:5px">В сохранённых попытках движок не нашёл устойчивых фонетических пометок. Возьмите новый текст или более длинный фрагмент, чтобы проверить себя на другом материале.</p>
          <a class="link" href="#/texts" style="margin-top:12px">Выбрать текст ${icon('arrow-right')}</a>`}
      </div>
      ${latest ? `
        <div class="side-card card--dark">
          <p class="side-card__title" style="color:rgba(242,236,223,.55)">Последняя попытка</p>
          <p class="h3" style="color:var(--paper);margin-top:4px">${esc(latest.textTitle || 'Чтение')}</p>
          <div class="row gap-8" style="margin-top:10px">
            ${verdictTag(latest.verdict)}
            <span class="tag tag--outline" style="border-color:rgba(255,255,255,.25);color:rgba(242,236,223,.8)">${esc(fmtDate(latest.createdAt, true))}</span>
          </div>
          <a class="link" href="#/report/${esc(latest.id)}" style="color:#e9c79b;margin-top:14px">Открыть разбор ${icon('arrow-right')}</a>
        </div>` : ''}
      <div class="side-card">
        <p class="side-card__title">Как читать график</p>
        <p class="aside-note">Столбики — оценка тренажёра по произношению, темпу и интонации, а не официальный балл. Красный столбик означает вердикт «0» из-за ошибок или пауз.</p>
      </div>
    </aside>`;
}

function historyItem(report) {
  const score = Math.round(report.scores?.overall || 0);
  const tone = report.verdict === 1 ? '' : report.verdict === 0 ? ' is-zero' : ' is-unknown';
  const mark = report.verdict === 1 ? '1' : report.verdict === 0 ? '0' : '?';
  return `
    <div class="history-item">
      <span class="history-item__score${tone}" aria-label="${report.verdict === 1 ? 'Один балл' : report.verdict === 0 ? 'Ноль баллов' : 'Недостаточно данных'}">${mark}</span>
      <div>
        <a class="history-item__title" href="#/report/${esc(report.id)}">${esc(report.textTitle || 'Чтение')}</a>
        <div class="history-item__meta">
          <span>${esc(fmtDate(report.createdAt, true))}</span>
          ${report.wpm ? `<span>${report.wpm} слов/мин</span>` : ''}
          ${report.durationSec ? `<span>${fmtDuration(report.durationSec)}</span>` : ''}
          <span>${esc(getCoverageLabel(report.coverage))}</span>
          ${report.probableErrorCount ? `<span>${report.probableErrorCount} ${report.probableErrorCount === 1 ? 'пометка' : 'пометки'}</span>` : '<span>без явных ошибок</span>'}
          ${report.demo ? '<span class="tag tag--gold">демо</span>' : ''}
        </div>
      </div>
      <div class="history-item__actions">
        <span class="history-item__score" style="width:auto;height:auto;border-radius:6px;background:var(--surface-3);color:var(--ink-soft);font-size:10px;padding:4px 8px" title="Оценка тренажёра">${score}/100</span>
        <a class="btn btn--small btn--ghost" href="#/report/${esc(report.id)}">Разбор</a>
        <button class="icon-btn" type="button" data-delete-report="${esc(report.id)}" aria-label="Удалить попытку" title="Удалить">${icon('trash')}</button>
      </div>
    </div>`;
}

export function render(root) {
  const progress = getProgressSummary();
  const reports = progress.reports;
  const passRate = progress.attempts ? Math.round((progress.passed / progress.attempts) * 100) : 0;

  root.innerHTML = `
    <div class="page-head">
      <div class="page-head__text">
        <span class="kicker">Прогресс</span>
        <h1 class="h2">Не количество попыток, а динамика.</h1>
        <p class="lead">История чтений, средние показатели и слабые зоны. Все отчёты хранятся только в этом браузере — аудиозаписи живут до перезагрузки страницы.</p>
      </div>
      <div class="page-head__actions">
        <a class="btn btn--ghost" href="#/texts">${icon('book', 'icon--sm')}Выбрать текст</a>
        <a class="btn btn--primary" href="#/check">${icon('mic', 'icon--sm')}Новая проверка</a>
      </div>
    </div>

    ${reports.length ? `
      <div class="progress-stats">
        ${statCard('Попыток', String(progress.attempts), '', 'без демо-записей')}
        ${statCard('С оценкой 1', String(progress.passed), '', `${passRate}% проверенных чтений`)}
        ${statCard('Средняя оценка', String(progress.averageScore), '/100', 'композит тренажёра')}
        ${statCard('Покрытие текста', String(Math.round(progress.averageCoverage * 100)), '%', 'доля прочитанных слов')}
      </div>

      <div class="section">
        <div class="grid--sidebar" style="display:grid">
          ${chart(reports)}
          ${focusCard(reports)}
        </div>
      </div>

      <section class="section">
        <div class="section-head">
          <div class="section-head__text">
            <span class="kicker kicker--muted">История</span>
            <h2 class="h2">Все проверки</h2>
          </div>
          <span class="small">${reports.length} из 30 сохраняемых</span>
        </div>
        <div class="history-list">
          ${reports.map(historyItem).join('')}
        </div>
      </section>` : `
      <div class="empty">
        <div class="empty__icon">${icon('chart')}</div>
        <h3>Пока ни одной проверки</h3>
        <p>Запишите чтение или вставьте транскрипт вручную. После разбора здесь появится динамика, слабые зоны и история попыток.</p>
        <div class="row" style="justify-content:center">
          <a class="btn btn--primary" href="#/check">${icon('mic', 'icon--sm')}Проверить чтение</a>
          <a class="btn btn--ghost" href="#/texts">Открыть библиотеку</a>
        </div>
      </div>`}
  `;

  root.querySelectorAll('[data-delete-report]').forEach(button => {
    button.addEventListener('click', async () => {
      const ok = await confirmDialog({
        title: 'Удалить попытку?',
        body: 'Отчёт исчезнет из истории и с графика. Это действие нельзя отменить.',
        confirmLabel: 'Удалить',
        danger: true
      });
      if (!ok) return;
      deleteReport(button.dataset.deleteReport);
      toast('Попытка удалена.', 'success');
      render(root);
    });
  });
}

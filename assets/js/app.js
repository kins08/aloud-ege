import * as homeView from './views/home.js';
import * as checkView from './views/check.js';
import * as textsView from './views/texts.js';
import * as reportView from './views/report.js';
import * as mistakesView from './views/mistakes.js';
import * as rulesView from './views/rules.js';
import * as fluencyView from './views/fluency.js';
import * as progressView from './views/progress.js';
import * as sourcesView from './views/sources.js';
import * as settingsView from './views/settings.js';
import { esc, icon } from './ui.js';

const PAGES = {
  home: { title: 'Обзор', eyebrow: 'ALOUD', nav: 'home' },
  check: { title: 'Проверка чтения', eyebrow: 'Тренажёр', nav: 'check' },
  texts: { title: 'Библиотека текстов', eyebrow: 'Тренажёр', nav: 'texts' },
  textDetail: { title: 'Текст', eyebrow: 'Библиотека', nav: 'texts' },
  report: { title: 'Разбор чтения', eyebrow: 'Отчёт', nav: null },
  mistakes: { title: 'Частые ошибки', eyebrow: 'Знания', nav: 'mistakes' },
  rules: { title: 'Как не ошибаться', eyebrow: 'Знания', nav: 'rules' },
  fluency: { title: 'Единство речи', eyebrow: 'Знания', nav: 'fluency' },
  progress: { title: 'Прогресс', eyebrow: 'История', nav: 'progress' },
  sources: { title: 'Источники и метод', eyebrow: 'О проекте', nav: 'sources' },
  settings: { title: 'Настройки', eyebrow: 'Профиль', nav: null },
  notFound: { title: 'Страница не найдена', eyebrow: 'ALOUD', nav: null }
};

const view = document.getElementById('view');
const pageLabel = document.querySelector('.topbar__page');
const eyebrowLabel = document.querySelector('.topbar__eyebrow');
const menuBtn = document.getElementById('menuBtn');
const drawer = document.getElementById('drawer');

let activeCleanup = null;
let lastRenderedHash = null;

function parseHash() {
  const raw = location.hash.replace(/^#/, '');
  if (!raw || raw === '/') return { name: 'home', query: {} };
  const [pathPart, queryPart] = raw.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  const query = Object.fromEntries(new URLSearchParams(queryPart || ''));
  if (!segments.length) return { name: 'home', query };
  const [head, param] = segments;
  if (segments.length === 1) {
    if (['check', 'texts', 'mistakes', 'rules', 'fluency', 'progress', 'sources', 'settings'].includes(head)) {
      return { name: head, query };
    }
    return { name: 'notFound', query };
  }
  if (segments.length === 2 && param) {
    const id = decodeURIComponent(param);
    if (head === 'texts') return { name: 'textDetail', id, query };
    if (head === 'report') return { name: 'report', id, query };
  }
  return { name: 'notFound', query };
}

function paintShell(route) {
  const meta = PAGES[route.name] || PAGES.notFound;
  if (pageLabel) pageLabel.textContent = meta.title;
  if (eyebrowLabel) eyebrowLabel.textContent = meta.eyebrow;
  document.title = `${meta.title} · ALOUD`;
  document.querySelectorAll('[data-route]').forEach(item => {
    item.classList.toggle('is-active', Boolean(meta.nav) && item.dataset.route === meta.nav);
  });
}

function renderView(route) {
  view.innerHTML = '';
  switch (route.name) {
    case 'home':
      homeView.render(view);
      break;
    case 'check':
      checkView.render(view, { query: route.query });
      break;
    case 'texts':
      textsView.render(view);
      break;
    case 'textDetail':
      textsView.renderTextDetail(view, { id: route.id });
      break;
    case 'report':
      reportView.render(view, { id: route.id });
      break;
    case 'mistakes':
      mistakesView.render(view);
      break;
    case 'rules':
      rulesView.render(view);
      break;
    case 'fluency':
      fluencyView.render(view);
      break;
    case 'progress':
      progressView.render(view);
      break;
    case 'sources':
      sourcesView.render(view);
      break;
    case 'settings':
      settingsView.render(view);
      break;
    default:
      view.innerHTML = `
        <div class="empty" style="margin-top:40px">
          <div class="empty__icon">${icon('search')}</div>
          <h3>Такой страницы нет</h3>
          <p>Возможно, ссылка устарела. Вернитесь к обзору или начните новую проверку.</p>
          <div class="row" style="justify-content:center">
            <a class="btn btn--primary" href="#/">${icon('home', 'icon--sm')}На обзор</a>
            <a class="btn btn--ghost" href="#/check">Проверить чтение</a>
          </div>
        </div>`;
  }
}

function route() {
  if (activeCleanup) {
    try {
      activeCleanup();
    } catch (error) {
      console.warn('ALOUD cleanup:', error);
    }
    activeCleanup = null;
  }
  const parsed = parseHash();
  paintShell(parsed);
  try {
    renderView(parsed);
    activeCleanup = parsed.name === 'check' ? checkView.cleanup : null;
  } catch (error) {
    console.error('ALOUD render:', error);
    view.innerHTML = `
      <div class="notice notice--danger" style="margin-top:30px">
        ${icon('alert')}
        <span>Не удалось открыть раздел: ${esc(error.message || 'неизвестная ошибка')}. Обновите страницу.</span>
      </div>`;
    activeCleanup = null;
  }
  closeDrawer();
  window.scrollTo(0, 0);
  if (lastRenderedHash !== null) view.focus({ preventScroll: true });
  lastRenderedHash = location.hash;
}

let drawerReturnFocus = null;

function drawerFocusable() {
  return [...drawer.querySelectorAll('a[href], button:not([disabled])')];
}

function openDrawer() {
  if (!drawer || !menuBtn) return;
  drawerReturnFocus = document.activeElement;
  drawer.hidden = false;
  document.body.style.overflow = 'hidden';
  menuBtn.setAttribute('aria-expanded', 'true');
  document.addEventListener('keydown', onDrawerKey);
  setTimeout(() => drawer.querySelector('[data-close-drawer].icon-btn')?.focus(), 30);
}

function closeDrawer() {
  if (!drawer || drawer.hidden) return;
  drawer.hidden = true;
  document.body.style.overflow = '';
  menuBtn?.setAttribute('aria-expanded', 'false');
  document.removeEventListener('keydown', onDrawerKey);
  if (drawerReturnFocus && typeof drawerReturnFocus.focus === 'function') {
    drawerReturnFocus.focus({ preventScroll: true });
  }
  drawerReturnFocus = null;
}

function onDrawerKey(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeDrawer();
    return;
  }
  if (event.key !== 'Tab') return;
  const items = drawerFocusable();
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

menuBtn?.addEventListener('click', () => {
  if (drawer?.hidden) openDrawer();
  else closeDrawer();
});

drawer?.querySelectorAll('[data-close-drawer]').forEach(node => {
  node.addEventListener('click', closeDrawer);
});

drawer?.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

document.querySelector('.skip-link')?.addEventListener('click', event => {
  event.preventDefault();
  view.focus();
  view.scrollIntoView({ block: 'start' });
});

window.addEventListener('hashchange', route);
route();

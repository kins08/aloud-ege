export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function icon(name, className = '') {
  return `<svg class="icon ${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}

export function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function fmtNumber(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export function fmtDate(iso, withTime = false) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {})
  }).format(date);
}

export function fmtDuration(seconds) {
  if (seconds === null || seconds === undefined || Number.isNaN(Number(seconds))) return '—';
  const total = Math.max(0, Math.round(Number(seconds)));
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return `${min}:${String(sec).padStart(2, '0')}`;
}

export function fmtClock(seconds) {
  const total = Math.max(0, Math.ceil(Number(seconds) || 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export function pct(value, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return `${Math.round(Number(value) * 100)}${digits ? '.' + String(Math.round(Number(value) * 1000) % 10) : ''}%`;
}

export function pluralRu(n, one, few, many) {
  const value = Math.abs(n) % 100;
  const last = value % 10;
  if (value > 10 && value < 20) return many;
  if (last > 1 && last < 5) return few;
  if (last === 1) return one;
  return many;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function toast(message, type = 'info', timeout = 4000) {
  const stack = document.getElementById('toasts');
  if (!stack) return;
  const node = document.createElement('div');
  node.className = `toast${type === 'error' ? ' toast--error' : ''}`;
  node.innerHTML = `${icon(type === 'error' ? 'alert' : type === 'success' ? 'check' : 'info')}<span>${esc(message)}</span>`;
  stack.appendChild(node);
  setTimeout(() => {
    node.classList.add('is-leaving');
    setTimeout(() => node.remove(), 240);
  }, timeout);
}

export function renderMarkdownLite(text) {
  const escaped = esc(text).replace(/\r\n/g, '\n');
  const lines = escaped.split('\n');
  let html = '';
  let inList = false;
  const closeList = () => {
    if (inList) {
      html += '</ul>';
      inList = false;
    }
  };
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      closeList();
      continue;
    }
    if (/^#{1,4}\s/.test(line)) {
      closeList();
      html += `<h4>${line.replace(/^#{1,4}\s+/, '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</h4>`;
      continue;
    }
    if (/^[-•*]\s+/.test(line)) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${line.replace(/^[-•*]\s+/, '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</li>`;
      continue;
    }
    closeList();
    html += `<p>${line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</p>`;
  }
  closeList();
  return html;
}

let lastUtterance = null;

export function speak(text, lang = 'en-GB') {
  if (!('speechSynthesis' in window)) {
    toast('В этом браузере нет синтеза речи. Откройте сайт в Chrome или Safari.', 'error');
    return false;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text));
  utterance.lang = lang;
  utterance.rate = 0.88;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang === lang && /google|natural|premium/i.test(v.name))
    || voices.find(v => v.lang === lang)
    || voices.find(v => v.lang && v.lang.startsWith('en'));
  if (preferred) utterance.voice = preferred;
  lastUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function openModal({ title, body, actions = [], onMount = null, wide = false }) {
  const root = document.getElementById('modalRoot');
  if (!root) return { close: () => {} };
  const keepFocus = document.activeElement;
  root.innerHTML = `
    <div class="modal-scrim" data-modal-scrim>
      <div class="modal${wide ? ' modal--wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal__head">
          <h2 class="modal__title" id="modalTitle">${esc(title)}</h2>
          <button class="icon-btn" type="button" data-modal-close aria-label="Закрыть">${icon('x')}</button>
        </div>
        <div class="modal__body">${body}</div>
        ${actions.length ? `<div class="modal__actions">${actions.map(action => `<button class="btn ${action.className || 'btn--ghost'}" type="button" data-modal-action="${esc(action.id)}">${action.label}</button>`).join('')}</div>` : ''}
      </div>
    </div>`;
  const close = () => {
    root.innerHTML = '';
    document.removeEventListener('keydown', onKey);
    if (keepFocus && typeof keepFocus.focus === 'function') keepFocus.focus();
  };
  const onKey = event => {
    if (event.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKey);
  root.querySelectorAll('[data-modal-close]').forEach(button => button.addEventListener('click', close));
  root.querySelector('[data-modal-scrim]')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) close();
  });
  if (onMount) onMount(root.querySelector('.modal'), close);
  setTimeout(() => {
    const focusable = root.querySelector('.modal__actions .btn, .modal__head .icon-btn');
    focusable?.focus();
  }, 30);
  return { close };
}

export function confirmDialog({ title, body, confirmLabel = 'Подтвердить', cancelLabel = 'Отмена', danger = false }) {
  return new Promise(resolve => {
    let settled = false;
    const finish = value => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    const modal = openModal({
      title,
      body: `<p>${body}</p>`,
      actions: [
        { id: 'cancel', label: cancelLabel, className: 'btn--ghost' },
        { id: 'confirm', label: confirmLabel, className: danger ? 'btn--danger' : 'btn--primary' }
      ],
      onMount: (node, close) => {
        node.querySelector('[data-modal-action="cancel"]')?.addEventListener('click', () => {
          finish(false);
          close();
        });
        node.querySelector('[data-modal-action="confirm"]')?.addEventListener('click', () => {
          finish(true);
          close();
        });
        node.querySelector('[data-modal-close]')?.addEventListener('click', () => finish(false));
        node.querySelector('[data-modal-scrim]')?.addEventListener('click', event => {
          if (event.target === event.currentTarget) finish(false);
        });
        document.addEventListener('keydown', function onKey(event) {
          if (event.key === 'Escape') {
            finish(false);
            document.removeEventListener('keydown', onKey);
          }
        });
      }
    });
    return modal;
  });
}

export function renderQuiz(quiz, id, extraClass = '') {
  return `
    <div class="quiz ${extraClass}" data-quiz="${esc(id)}">
      <div class="row row--between">
        <span class="quiz__tag">${esc(quiz.tag)}</span>
        <span class="mini-label">Проверь себя</span>
      </div>
      <h3 class="quiz__question">${esc(quiz.question)}</h3>
      <div class="quiz__options">
        ${quiz.options.map((option, index) => `
          <button class="quiz-option" type="button" data-correct="${option.correct ? '1' : '0'}" data-explain="${esc(option.explain)}">
            <span class="quiz-option__mark">${String.fromCharCode(65 + index)}</span>
            <span>${esc(option.label)}</span>
          </button>`).join('')}
      </div>
      <div class="quiz__explain" aria-live="polite"></div>
      <button class="quiz__reset" type="button" data-quiz-reset>Пройти заново</button>
    </div>`;
}

export function bindQuizzes(root) {
  root.querySelectorAll('[data-quiz]').forEach(quiz => {
    quiz.querySelectorAll('.quiz-option').forEach(button => {
      button.addEventListener('click', () => {
        if (quiz.dataset.answered) return;
        quiz.dataset.answered = '1';
        quiz.querySelectorAll('.quiz-option').forEach(option => {
          const correct = option.dataset.correct === '1';
          option.disabled = true;
          if (correct) option.classList.add('is-correct');
          if (option === button && !correct) option.classList.add('is-wrong');
          option.querySelector('.quiz-option__mark').textContent = correct ? '✓' : option === button ? '×' : '';
        });
        const explain = quiz.querySelector('.quiz__explain');
        explain.textContent = button.dataset.explain;
        explain.classList.add('is-visible');
      });
    });
    quiz.querySelector('[data-quiz-reset]')?.addEventListener('click', () => {
      delete quiz.dataset.answered;
      quiz.querySelectorAll('.quiz-option').forEach(option => {
        option.disabled = false;
        option.classList.remove('is-correct', 'is-wrong');
      });
      quiz.querySelectorAll('.quiz-option__mark').forEach((mark, index) => {
        mark.textContent = String.fromCharCode(65 + index);
      });
      const explain = quiz.querySelector('.quiz__explain');
      explain.textContent = '';
      explain.classList.remove('is-visible');
    });
  });
}

export function scoreTone(score) {
  if (score >= 75) return 'good';
  if (score >= 55) return 'warn';
  return 'bad';
}

export function clampText(value, max = 160) {
  const text = String(value || '').trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

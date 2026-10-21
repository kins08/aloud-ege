import {
  getSettings, saveSettings, getReports, getCustomTexts,
  downloadExport, importData, clearReports, clearAllData
} from '../store.js';
import { VERSION } from '../data/sources.js';
import { esc, icon, toast, confirmDialog } from '../ui.js';

const PROVIDER_DEFAULTS = {
  openai: { baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
  anthropic: { baseUrl: 'https://api.anthropic.com', model: 'claude-3-5-haiku-latest' }
};

export function render(root) {
  const settings = getSettings();
  const reports = getReports();
  const customTexts = getCustomTexts();
  const tutor = settings.tutor;

  root.innerHTML = `
    <div class="page-head">
      <div class="page-head__text">
        <span class="kicker">Настройки</span>
        <h1 class="h2">Тихие настройки под себя.</h1>
        <p class="lead">Имя для сертификата, язык распознавания и необязательный AI-наставник. Всё хранится локально в этом браузере.</p>
      </div>
      <div class="page-head__actions">
        <a class="btn btn--ghost" href="#/sources">${icon('info', 'icon--sm')}Метод и источники</a>
      </div>
    </div>

    <div class="settings-grid">
      <form class="form-card" id="settingsForm" autocomplete="off">
        <h3>Профиль и распознавание</h3>
        <p class="small">Имя подставляется в сертификат. Язык влияет на распознавание речи и синтез в тренажёре.</p>
        <div class="form-stack">
          <div class="field">
            <label for="settingName">Имя для сертификата</label>
            <input class="input" id="settingName" name="name" maxlength="60" placeholder="Например, Анна" value="${esc(settings.name)}">
            <p class="field-note">Можно оставить пустым — тогда будет «Практика ALOUD».</p>
          </div>
          <div class="field">
            <label for="settingLang">Вариант английского</label>
            <select class="select" id="settingLang" name="asrLang">
              <option value="en-GB"${settings.asrLang === 'en-GB' ? ' selected' : ''}>Британский · en-GB</option>
              <option value="en-US"${settings.asrLang === 'en-US' ? ' selected' : ''}>Американский · en-US</option>
            </select>
            <p class="field-note">ФИПИ не требует конкретного варианта. Главное — не смешивать их внутри одного ответа.</p>
          </div>

          <div style="border-top:1px solid var(--line);padding-top:20px">
            <div class="row row--between">
              <div>
                <h3 style="font-family:var(--font-serif);font-size:1.05rem">AI-наставник</h3>
                <p class="small" style="margin-top:4px">Необязательный слой поверх локального движка. Добавляет человеческий разбор и дрилл.</p>
              </div>
              <span class="tag ${tutor.apiKey ? 'tag--good' : 'tag--outline'}">${tutor.apiKey ? 'ключ добавлен' : 'выключен'}</span>
            </div>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="settingProvider">Провайдер</label>
              <select class="select" id="settingProvider" name="provider">
                <option value="openai"${tutor.provider === 'openai' ? ' selected' : ''}>OpenAI-совместимый</option>
                <option value="anthropic"${tutor.provider === 'anthropic' ? ' selected' : ''}>Anthropic</option>
              </select>
            </div>
            <div class="field">
              <label for="settingModel">Модель</label>
              <input class="input" id="settingModel" name="model" maxlength="80" value="${esc(tutor.model)}" placeholder="gpt-4o-mini">
            </div>
          </div>

          <div class="field">
            <label for="settingBaseUrl">Base URL</label>
            <input class="input" id="settingBaseUrl" name="baseUrl" maxlength="200" spellcheck="false" value="${esc(tutor.baseUrl)}" placeholder="https://api.openai.com/v1">
            <p class="field-note" id="baseUrlHint">Для OpenAI-совместимых API — корень с /v1. Можно указать полный адрес /chat/completions.</p>
          </div>

          <div class="field">
            <label for="settingKey">API-ключ</label>
            <div style="position:relative">
              <input class="input" id="settingKey" name="apiKey" type="password" maxlength="300" spellcheck="false" autocomplete="off" value="${esc(tutor.apiKey)}" placeholder="sk-…" style="padding-right:48px">
              <button class="icon-btn" type="button" id="toggleKey" aria-label="Показать ключ" title="Показать ключ" style="position:absolute;right:6px;top:50%;transform:translateY(-50%)">${icon('eye')}</button>
            </div>
            <p class="field-note">Ключ хранится только в localStorage этого браузера и отправляется напрямую выбранному провайдеру. Он не попадает в экспорт и не уходит на сервер ALOUD.</p>
          </div>

          <div class="notice">
            ${icon('info')}
            <span>Без ключа сайт полностью работает: проверка, метрики, отчёт и сертификат считаются локально. AI-разбор — только дополнительный текст.</span>
          </div>

          <div class="row row--between" style="border-top:1px solid var(--line);padding-top:18px">
            <span class="small">Изменения применяются сразу после сохранения.</span>
            <button class="btn btn--primary" type="submit">${icon('check', 'icon--sm')}Сохранить настройки</button>
          </div>
        </div>
      </form>

      <aside class="settings-side">
        <div class="form-card">
          <h3>Данные</h3>
          <p class="small">Отчёты, тексты и чек-лист — в этом браузере.</p>
          <div style="margin-top:14px">
            <div class="kv"><span>Попыток в истории</span><b>${reports.length} / 30</b></div>
            <div class="kv"><span>Своих текстов</span><b>${customTexts.length}</b></div>
            <div class="kv"><span>Аудиозаписи</span><b>до перезагрузки</b></div>
            <div class="kv"><span>Версия</span><b>${esc(VERSION.replace('ALOUD 1.0 · ', ''))}</b></div>
          </div>
          <button class="btn btn--ghost btn--block mt-16" type="button" id="exportBtn">${icon('download', 'icon--sm')}Скачать резервную копию</button>
          <p class="field-note mt-8">JSON без API-ключа: настройки, отчёты, свои тексты и чек-лист.</p>
          <label class="btn btn--ghost btn--block mt-8" for="importFile">${icon('upload', 'icon--sm')}Загрузить из копии</label>
          <input id="importFile" type="file" accept="application/json,.json" hidden>
          <p class="field-note mt-8">Переносит отчёты и свои тексты в этот браузер, не стирая существующие. Ключ AI-наставника в файле нет — его вводить заново.</p>
        </div>

        <div class="form-card danger-zone">
          <h3>Осторожно</h3>
          <p class="small">Эти действия необратимы. Сначала лучше скачать резервную копию.</p>
          <div class="stack gap-8 mt-16">
            <button class="btn btn--danger btn--block" type="button" id="clearReportsBtn">${icon('trash', 'icon--sm')}Очистить историю</button>
            <button class="btn btn--danger btn--block" type="button" id="clearAllBtn">${icon('trash', 'icon--sm')}Удалить все данные</button>
          </div>
        </div>

        <div class="side-card">
          <p class="side-card__title">Приватность</p>
          <p class="aside-note">Запись обрабатывается в браузере. Аудио не загружается на сервер. При включённом AI-наставнике провайдеру отправляется только текстовая сводка разбора — без аудио и без вашего голоса.</p>
        </div>
      </aside>
    </div>
  `;

  const form = root.querySelector('#settingsForm');
  const provider = root.querySelector('#settingProvider');
  const baseUrl = root.querySelector('#settingBaseUrl');
  const model = root.querySelector('#settingModel');
  const keyInput = root.querySelector('#settingKey');
  const hint = root.querySelector('#baseUrlHint');

  const defaultsFor = name => PROVIDER_DEFAULTS[name] || PROVIDER_DEFAULTS.openai;

  provider.addEventListener('change', () => {
    const next = defaultsFor(provider.value);
    const knownBases = Object.values(PROVIDER_DEFAULTS).map(item => item.baseUrl);
    const knownModels = Object.values(PROVIDER_DEFAULTS).map(item => item.model);
    if (!baseUrl.value.trim() || knownBases.includes(baseUrl.value.trim())) baseUrl.value = next.baseUrl;
    if (!model.value.trim() || knownModels.includes(model.value.trim())) model.value = next.model;
    hint.textContent = provider.value === 'anthropic'
      ? 'Для Anthropic — https://api.anthropic.com или полный адрес /v1/messages.'
      : 'Для OpenAI-совместимых API — корень с /v1. Можно указать полный адрес /chat/completions.';
  });

  root.querySelector('#toggleKey').addEventListener('click', event => {
    const button = event.currentTarget;
    const show = keyInput.type === 'password';
    keyInput.type = show ? 'text' : 'password';
    button.setAttribute('aria-label', show ? 'Скрыть ключ' : 'Показать ключ');
    button.title = show ? 'Скрыть ключ' : 'Показать ключ';
    button.innerHTML = icon(show ? 'x' : 'eye');
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = root.querySelector('#settingName').value.trim();
    const asrLang = root.querySelector('#settingLang').value === 'en-US' ? 'en-US' : 'en-GB';
    const nextProvider = provider.value === 'anthropic' ? 'anthropic' : 'openai';
    saveSettings({
      name,
      asrLang,
      tutor: {
        provider: nextProvider,
        apiKey: keyInput.value.trim(),
        model: model.value.trim() || defaultsFor(nextProvider).model,
        baseUrl: baseUrl.value.trim() || defaultsFor(nextProvider).baseUrl
      }
    });
    toast('Настройки сохранены.', 'success');
    render(root);
  });

  root.querySelector('#exportBtn').addEventListener('click', () => {
    downloadExport();
    toast('Резервная копия скачана без API-ключа.', 'success');
  });

  root.querySelector('#importFile').addEventListener('change', async event => {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;
    try {
      const summary = importData(JSON.parse(await file.text()));
      toast(`Загружено: ${summary.reports} отчётов, ${summary.customTexts} своих текстов.`, 'success');
      render(root);
    } catch {
      toast('Файл не читается: нужен JSON из резервной копии ALOUD.', 'error');
    }
  });

  root.querySelector('#clearReportsBtn').addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Очистить историю?',
      body: 'Все отчёты и график прогресса будут удалены. Свои тексты и настройки останутся.',
      confirmLabel: 'Очистить историю',
      danger: true
    });
    if (!ok) return;
    clearReports();
    toast('История очищена.', 'success');
    render(root);
  });

  root.querySelector('#clearAllBtn').addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Удалить все данные?',
      body: 'Исчезнут отчёты, свои тексты, чек-лист, настройки и API-ключ. Отменить это нельзя.',
      confirmLabel: 'Удалить всё',
      danger: true
    });
    if (!ok) return;
    clearAllData();
    toast('Все данные удалены.', 'success');
    location.hash = '#/';
  });
}

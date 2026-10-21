const PREFIX = 'aloud:v1:';
const REPORT_LIMIT = 30;

export const DEFAULT_SETTINGS = {
  name: '',
  asrLang: 'en-GB',
  tutor: {
    provider: 'openai',
    apiKey: '',
    model: 'gpt-4o-mini',
    baseUrl: 'https://api.openai.com/v1'
  }
};

function readRaw(key) {
  try {
    return localStorage.getItem(PREFIX + key);
  } catch {
    return null;
  }
}

function writeRaw(key, value) {
  try {
    localStorage.setItem(PREFIX + key, value);
    return true;
  } catch (error) {
    console.warn('ALOUD storage:', error);
    return false;
  }
}

export function readJSON(key, fallback) {
  const raw = readRaw(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  return writeRaw(key, JSON.stringify(value));
}

export function getSettings() {
  const stored = readJSON('settings', null);
  if (!stored) return structuredClone(DEFAULT_SETTINGS);
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    tutor: { ...DEFAULT_SETTINGS.tutor, ...(stored.tutor || {}) }
  };
}

export function saveSettings(patch) {
  const next = {
    ...getSettings(),
    ...patch,
    tutor: { ...getSettings().tutor, ...(patch.tutor || {}) }
  };
  writeJSON('settings', next);
  return next;
}

export function getReports() {
  const reports = readJSON('reports', []);
  return Array.isArray(reports) ? reports : [];
}

export function getReport(id) {
  return getReports().find(report => report.id === id) || null;
}

export function saveReport(report) {
  const { alignmentOps, ...persisted } = report;
  const reports = getReports().filter(item => item.id !== persisted.id);
  reports.unshift(persisted);
  const trimmed = reports.slice(0, REPORT_LIMIT);
  const ok = writeJSON('reports', trimmed);
  return ok ? persisted : null;
}

export function deleteReport(id) {
  writeJSON('reports', getReports().filter(report => report.id !== id));
}

export function clearReports() {
  writeJSON('reports', []);
}

export function clearAllData() {
  try {
    ['settings', 'reports', 'customTexts', 'checklist'].forEach(key => localStorage.removeItem(PREFIX + key));
    audioUrls.clear();
    return true;
  } catch (error) {
    console.warn('ALOUD storage:', error);
    return false;
  }
}

export function getCustomTexts() {
  const texts = readJSON('customTexts', []);
  return Array.isArray(texts) ? texts : [];
}

export function saveCustomText(text) {
  const texts = getCustomTexts().filter(item => item.id !== text.id);
  texts.unshift(text);
  writeJSON('customTexts', texts.slice(0, 40));
  return text;
}

export function deleteCustomText(id) {
  writeJSON('customTexts', getCustomTexts().filter(text => text.id !== id));
}

export function getChecklist() {
  const value = readJSON('checklist', []);
  return Array.isArray(value) ? value : [];
}

export function saveChecklist(items) {
  writeJSON('checklist', items);
}

export function getProgressSummary() {
  const reports = getReports().filter(report => !report.demo);
  const attempts = reports.length;
  const passed = reports.filter(report => report.verdict === 1).length;
  const best = reports.reduce((max, report) => Math.max(max, report.verdict === 1 ? 1 : 0), 0);
  const latest = reports[0] || null;
  const averageCoverage = attempts
    ? reports.reduce((sum, report) => sum + (report.coverage || 0), 0) / attempts
    : 0;
  const averageScore = attempts
    ? Math.round(reports.reduce((sum, report) => sum + (report.scores?.overall || 0), 0) / attempts)
    : 0;
  return { attempts, passed, best, latest, averageCoverage, averageScore, reports };
}

export function exportData() {
  const settings = getSettings();
  return {
    app: 'ALOUD',
    version: 1,
    exportedAt: new Date().toISOString(),
    settings: {
      name: settings.name,
      asrLang: settings.asrLang,
      tutorProvider: settings.tutor.provider,
      tutorModel: settings.tutor.model
    },
    reports: getReports(),
    customTexts: getCustomTexts(),
    checklist: getChecklist()
  };
}

export function downloadExport() {
  const data = exportData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `aloud-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function mergeById(incoming, existing, limit) {
  const merged = [];
  const seen = new Set();
  for (const item of [...incoming, ...existing]) {
    if (!item || typeof item.id !== 'string' || seen.has(item.id)) continue;
    seen.add(item.id);
    merged.push(item);
  }
  merged.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  return merged.slice(0, limit);
}

export function importData(payload) {
  if (!payload || payload.app !== 'ALOUD') throw new Error('Не похоже на резервную копию ALOUD');
  const saved = payload.settings || {};
  const current = getSettings();
  saveSettings({
    name: typeof saved.name === 'string' ? saved.name : current.name,
    asrLang: saved.asrLang === 'en-US' ? 'en-US' : current.asrLang
  });
  const reports = mergeById(Array.isArray(payload.reports) ? payload.reports : [], getReports(), REPORT_LIMIT);
  const customTexts = mergeById(Array.isArray(payload.customTexts) ? payload.customTexts : [], getCustomTexts(), 40);
  writeJSON('reports', reports);
  writeJSON('customTexts', customTexts);
  if (Array.isArray(payload.checklist)) writeJSON('checklist', payload.checklist);
  return { reports: reports.length, customTexts: customTexts.length };
}

const audioUrls = new Map();
export function cacheAudio(reportId, url) {
  if (!url) return;
  const previous = audioUrls.get(reportId);
  if (previous) URL.revokeObjectURL(previous);
  audioUrls.set(reportId, url);
}

export function getCachedAudio(reportId) {
  return audioUrls.get(reportId) || null;
}

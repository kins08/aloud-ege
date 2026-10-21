import { WORD_BANK, MINIMAL_PAIRS } from './data/words.js';

const FUNCTION_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'for', 'from', 'with',
  'by', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am', 'do', 'does', 'did',
  'has', 'have', 'had', 'it', 'its', 'this', 'that', 'these', 'those', 'there', 'their',
  'they', 'we', 'you', 'he', 'she', 'i', 'him', 'her', 'us', 'them', 'my', 'your', 'his',
  'our', 'not', 'no', 'so', 'than', 'then', 'if', 'when', 'while', 'which', 'who', 'whom',
  'whose', 'what', 'where', 'why', 'how', 'into', 'over', 'under', 'between', 'through',
  'during', 'without', 'about', 'after', 'before', 'up', 'down', 'out', 'off', 'again',
  'more', 'most', 'some', 'any', 'all', 'both', 'each', 'such', 'only', 'just', 'also'
]);

const SPELLING_VARIANTS = {
  behavior: 'behaviour', behaviors: 'behaviours', favorite: 'favourite', favorites: 'favourites',
  color: 'colour', colors: 'colours', colored: 'coloured', coloring: 'colouring',
  organize: 'organise', organized: 'organised', organizes: 'organises', organizing: 'organising',
  realize: 'realise', realized: 'realised', realizes: 'realises', realizing: 'realising',
  recognize: 'recognise', recognized: 'recognised', recognizes: 'recognises', recognizing: 'recognising',
  center: 'centre', centers: 'centres', theater: 'theatre', theaters: 'theatres',
  traveled: 'travelled', traveling: 'travelling', canceled: 'cancelled',
  defense: 'defence', license: 'licence', program: 'programme', programs: 'programmes',
  analyze: 'analyse', analyzed: 'analysed', analyzes: 'analyses', analyzing: 'analysing'
};

const CONTRACTIONS = {
  "i'm": ['i', 'am'], "i've": ['i', 'have'], "i'll": ['i', 'will'], "i'd": ['i', 'would'],
  "you're": ['you', 'are'], "you've": ['you', 'have'], "you'll": ['you', 'will'], "you'd": ['you', 'would'],
  "he's": ['he', 'is'], "he'll": ['he', 'will'], "he'd": ['he', 'would'],
  "she's": ['she', 'is'], "she'll": ['she', 'will'], "she'd": ['she', 'would'],
  "it's": ['it', 'is'], "it'll": ['it', 'will'], "it'd": ['it', 'would'],
  "we're": ['we', 'are'], "we've": ['we', 'have'], "we'll": ['we', 'will'], "we'd": ['we', 'would'],
  "they're": ['they', 'are'], "they've": ['they', 'have'], "they'll": ['they', 'will'], "they'd": ['they', 'would'],
  "that's": ['that', 'is'], "there's": ['there', 'is'], "there're": ['there', 'are'],
  "what's": ['what', 'is'], "who's": ['who', 'is'], "where's": ['where', 'is'], "when's": ['when', 'is'],
  "how's": ['how', 'is'], "here's": ['here', 'is'],
  "isn't": ['is', 'not'], "aren't": ['are', 'not'], "wasn't": ['was', 'not'], "weren't": ['were', 'not'],
  "don't": ['do', 'not'], "doesn't": ['does', 'not'], "didn't": ['did', 'not'],
  "haven't": ['have', 'not'], "hasn't": ['has', 'not'], "hadn't": ['had', 'not'],
  "won't": ['will', 'not'], "wouldn't": ['would', 'not'], "can't": ['can', 'not'], "cannot": ['can', 'not'],
  "couldn't": ['could', 'not'], "shouldn't": ['should', 'not'], "mustn't": ['must', 'not'],
  "let's": ['let', 'us']
};

const SMALL = {
  zero: 0, oh: 0, o: 0, nought: 0, naught: 0,
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19
};
const TENS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const SCALES = { hundred: 100, thousand: 1000, million: 1000000, billion: 1000000000 };
const ORDINAL_WORDS = {
  first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9,
  tenth: 10, eleventh: 11, twelfth: 12, thirteenth: 13, fourteenth: 14, fifteenth: 15, sixteenth: 16,
  seventeenth: 17, eighteenth: 18, nineteenth: 19, twentieth: 20, thirtieth: 30, fortieth: 40,
  fiftieth: 50, sixtieth: 60, seventieth: 70, eightieth: 80, ninetieth: 90,
  hundredth: 100, thousandth: 1000, millionth: 1000000
};
const TENS_ORDINAL_BASE = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const NUMBER_WORDS = new Set([...Object.keys(SMALL), ...Object.keys(TENS), ...Object.keys(SCALES), 'and', 'point']);

const HARD_WORDS = new Map();
for (const entry of WORD_BANK) {
  HARD_WORDS.set(entry.word.toLowerCase(), entry);
  HARD_WORDS.set(stem(entry.word), entry);
}

const CRITICAL_PAIRS = new Map();
for (const pair of MINIMAL_PAIRS) {
  const left = pair.a.word.toLowerCase();
  const right = pair.b.word.toLowerCase();
  if (!CRITICAL_PAIRS.has(left)) CRITICAL_PAIRS.set(left, new Set());
  if (!CRITICAL_PAIRS.has(right)) CRITICAL_PAIRS.set(right, new Set());
  CRITICAL_PAIRS.get(left).add(right);
  CRITICAL_PAIRS.get(right).add(left);
}
const CRITICAL_WORDS = new Set(CRITICAL_PAIRS.keys());
const FILLERS = new Set(['um', 'uh', 'erm', 'er', 'ah', 'hmm', 'mmm', 'eh']);

const WORD_PATTERN = /[A-Za-z]+(?:[’'][A-Za-z]+)*(?:-[A-Za-z]+)*|\d+(?:[.,]\d+)*(?:[a-z]+)?|[%]/g;

function stem(word) {
  return word.toLowerCase()
    .replace(/[’']s$/, '')
    .replace(/ies$/, 'y')
    .replace(/(ches|shes|xes|zes)$/, m => m.slice(0, -2))
    .replace(/es$/, '')
    .replace(/s$/, '')
    .replace(/ied$/, 'y')
    .replace(/ed$/, '')
    .replace(/ing$/, '');
}

function normaliseWord(raw) {
  let word = raw.toLowerCase().replace(/’/g, "'");
  if (SPELLING_VARIANTS[word]) word = SPELLING_VARIANTS[word];
  if (word.endsWith("'s") && !CONTRACTIONS[word]) word = word.slice(0, -2);
  return word.replace(/'/g, '');
}

export function countWords(text) {
  return (text.match(WORD_PATTERN) || []).length;
}

export function tokenizeDisplay(text) {
  const tokens = [];
  let wordIndex = 0;
  let lastIndex = 0;
  const re = new RegExp(WORD_PATTERN.source, 'g');
  let match;
  while ((match = re.exec(text))) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'space', raw: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    const isWord = /[A-Za-z0-9%]/.test(raw);
    tokens.push({ type: isWord ? 'word' : 'punct', raw, wordIndex: isWord ? wordIndex : null });
    if (isWord) wordIndex += 1;
    lastIndex = match.index + raw.length;
  }
  if (lastIndex < text.length) tokens.push({ type: 'space', raw: text.slice(lastIndex) });
  return tokens;
}

function expandContraction(word) {
  const key = word.toLowerCase().replace(/’/g, "'");
  return CONTRACTIONS[key] || null;
}

function parseYear(tokens, start) {
  const first = readSmall(tokens, start);
  if (!first || first.value < 10 || first.value > 99) return null;
  let index = start + first.len;
  if (tokens[index] && ['hundred'].includes(tokens[index].norm)) {
    let rest = 0;
    let len = first.len + 1;
    if (tokens[index + 1] && tokens[index + 1].norm === 'and') {
      index += 1;
      len += 1;
    }
    const small = readSmall(tokens, index + 1);
    if (small) {
      rest = small.value;
      len += small.len;
    }
    return { value: first.value * 100 + rest, len };
  }
  if (tokens[index] && ['oh', 'zero', 'nought'].includes(tokens[index].norm)) {
    const digit = tokens[index + 1];
    if (digit && SMALL[digit.norm] !== undefined && SMALL[digit.norm] >= 1 && SMALL[digit.norm] <= 9) {
      return { value: first.value * 100 + SMALL[digit.norm], len: first.len + 2 };
    }
  }
  const second = readSmall(tokens, index);
  if (second && second.value >= 10 && second.value <= 99) {
    return { value: first.value * 100 + second.value, len: first.len + second.len };
  }
  return null;
}

function readSmall(tokens, start) {
  const token = tokens[start];
  if (!token) return null;
  const n = token.norm;
  if (SMALL[n] !== undefined && n !== 'oh' && n !== 'o' && n !== 'zero' && n !== 'nought' && n !== 'naught') {
    return { value: SMALL[n], len: 1 };
  }
  const hyphen = n.match(/^([a-z]+)-([a-z]+)$/);
  if (hyphen && TENS[hyphen[1]] !== undefined && SMALL[hyphen[2]] !== undefined
    && SMALL[hyphen[2]] >= 1 && SMALL[hyphen[2]] <= 9) {
    return { value: TENS[hyphen[1]] + SMALL[hyphen[2]], len: 1 };
  }
  if (TENS[n] !== undefined) {
    const next = tokens[start + 1];
    if (next && SMALL[next.norm] !== undefined && SMALL[next.norm] >= 1 && SMALL[next.norm] <= 9) {
      return { value: TENS[n] + SMALL[next.norm], len: 2 };
    }
    return { value: TENS[n], len: 1 };
  }
  if (n === 'zero') return { value: 0, len: 1 };
  return null;
}

function parseCardinal(tokens, start) {
  let total = 0;
  let current = 0;
  let len = 0;
  let sawNumber = false;
  let lastWasAnd = false;
  for (let i = start; i < tokens.length; i += 1) {
    const norm = tokens[i].norm;
    const small = readSmall(tokens, i);
    if (small) {
      current += small.value;
      len += small.len;
      i += small.len - 1;
      sawNumber = true;
      lastWasAnd = false;
      continue;
    }
    if (norm === 'hundred') {
      current = (current || 1) * 100;
      len += 1;
      sawNumber = true;
      lastWasAnd = false;
      continue;
    }
    if (SCALES[norm] && SCALES[norm] >= 1000) {
      total += (current || 1) * SCALES[norm];
      current = 0;
      len += 1;
      sawNumber = true;
      lastWasAnd = false;
      continue;
    }
    if (norm === 'and' && sawNumber) {
      len += 1;
      lastWasAnd = true;
      continue;
    }
    if (norm === 'point' && sawNumber) {
      let decimals = '';
      let j = i + 1;
      let added = 0;
      while (j < tokens.length && SMALL[tokens[j].norm] !== undefined) {
        decimals += String(SMALL[tokens[j].norm]);
        added += 1;
        j += 1;
      }
      if (decimals) {
        return { value: `${total + current}.${decimals}`, len: len + 1 + added };
      }
      return null;
    }
    break;
  }
  if (!sawNumber || lastWasAnd) return null;
  return { value: total + current, len };
}

function parseOrdinal(word) {
  const norm = word.toLowerCase().replace(/’/g, "'");
  if (ORDINAL_WORDS[norm]) return ORDINAL_WORDS[norm];
  const compound = norm.match(/^(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)-(.+)$/);
  if (compound && ORDINAL_WORDS[compound[2]] && ORDINAL_WORDS[compound[2]] < 10) {
    return TENS_ORDINAL_BASE[compound[1]] + ORDINAL_WORDS[compound[2]];
  }
  return null;
}

function canonicalNumber(raw) {
  let text = raw.toLowerCase().replace(/,/g, '');
  const ordinalMatch = text.match(/^(\d+)(st|nd|rd|th)$/);
  if (ordinalMatch) return `#ord:${Number(ordinalMatch[1])}`;
  const decadeMatch = text.match(/^(\d{4})s$/);
  if (decadeMatch) return `#year:${decadeMatch[1]}s`;
  const numeric = text.match(/^(\d+(?:\.\d+)?)(%.*)?$/);
  if (numeric) {
    const value = numeric[1].includes('.') ? numeric[1].replace(/\.?0+$/, '') : numeric[1];
    return `#num:${value}`;
  }
  return null;
}

function numberTokens(tokens) {
  const result = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    const raw = token.norm;
    if (raw === 'percent' || (raw === 'per' && tokens[i + 1] && tokens[i + 1].norm === 'cent')) {
      result.push({ ...token, norm: '%', raw: token.raw, numberLike: true });
      i += raw === 'per' ? 2 : 1;
      continue;
    }
    if (raw === '%') {
      result.push({ ...token, numberLike: true });
      i += 1;
      continue;
    }
    if (/^\d/.test(raw)) {
      const key = canonicalNumber(raw);
      if (key) {
        const isYear = /^\d{3,4}$/.test(raw) && Number(raw) >= 1000 && Number(raw) <= 2099;
        result.push({ ...token, norm: key, raw: token.raw, numberLike: true, isYear });
      } else {
        result.push(token);
      }
      i += 1;
      continue;
    }
    const ordinal = parseOrdinal(raw);
    if (ordinal) {
      result.push({ ...token, norm: `#ord:${ordinal}`, raw: token.raw, numberLike: true });
      i += 1;
      continue;
    }
    const year = parseYear(tokens, i);
    if (year && year.value >= 1000 && year.value <= 2099) {
      const group = tokens.slice(i, i + year.len);
      result.push({
        ...token,
        norm: `#num:${year.value}`,
        raw: group.map(t => t.raw).join(' '),
        numberLike: true,
        isYear: true,
        origIndexes: group.flatMap(t => t.origIndexes || [t.origIndex])
      });
      i += year.len;
      continue;
    }
    if ((NUMBER_WORDS.has(raw) || /^(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)-(one|two|three|four|five|six|seven|eight|nine)$/.test(raw))
      && raw !== 'and' && raw !== 'point' && raw !== 'oh' && raw !== 'o') {
      const card = parseCardinal(tokens, i);
      if (card && card.len > 0) {
        const group = tokens.slice(i, i + card.len);
        const value = String(card.value);
        result.push({
          ...token,
          norm: `#num:${value}`,
          raw: group.map(t => t.raw).join(' '),
          numberLike: true,
          origIndexes: group.flatMap(t => t.origIndexes || [t.origIndex])
        });
        i += card.len;
        continue;
      }
    }
    result.push(token);
    i += 1;
  }
  return result;
}

export function buildAlignmentTokens(text) {
  const display = tokenizeDisplay(text);
  const words = [];
  for (const token of display) {
    if (token.type !== 'word') continue;
    const word = token.raw;
    const expansions = expandContraction(word);
    if (expansions) {
      for (const part of expansions) {
        words.push({
          raw: part,
          norm: normaliseWord(part),
          origIndex: token.wordIndex,
          original: word
        });
      }
    } else if (/^\d/.test(word)) {
      words.push({ raw: word, norm: normaliseWord(word), origIndex: token.wordIndex, original: word });
    } else if (word === '%') {
      words.push({ raw: word, norm: '%', origIndex: token.wordIndex, original: word });
    } else {
      words.push({ raw: word, norm: normaliseWord(word), origIndex: token.wordIndex, original: word });
    }
  }
  return { display, words: numberTokens(words) };
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const prev = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j += 1) prev[j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const temp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = temp;
    }
  }
  return prev[b.length];
}

function phoneticKey(word) {
  let w = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!w) return '';
  w = w.replace(/^kn/, 'n').replace(/^gn/, 'n').replace(/^pn/, 'n').replace(/^wr/, 'r').replace(/^ps/, 's');
  w = w.replace(/ough/g, 'q').replace(/augh/g, 'q').replace(/ph/g, 'f').replace(/th/g, 't')
    .replace(/sh/g, 's').replace(/tch/g, 'c').replace(/ch/g, 'c').replace(/ck/g, 'k')
    .replace(/qu/g, 'kw').replace(/wh/g, 'w').replace(/gh/g, '')
    .replace(/x/g, 'ks').replace(/c(?=[eiy])/g, 's').replace(/c/g, 'k');
  w = w.replace(/([^aeiouy])\1+/g, '$1');
  w = w.replace(/e$/, '');
  return w;
}

function wordSimilarity(a, b) {
  if (a === b) return 1;
  const max = Math.max(a.length, b.length);
  if (!max) return 1;
  const spelling = 1 - levenshtein(a, b) / max;
  const pA = phoneticKey(a);
  const pB = phoneticKey(b);
  const pMax = Math.max(pA.length, pB.length) || 1;
  const phonetic = 1 - levenshtein(pA, pB) / pMax;
  return Math.max(spelling * 0.82, phonetic * 0.94);
}

function align(refTokens, spokenTokens) {
  const n = refTokens.length;
  const m = spokenTokens.length;
  const dp = Array.from({ length: n + 1 }, () => new Float32Array(m + 1));
  const back = Array.from({ length: n + 1 }, () => new Uint8Array(m + 1));
  const GAP = 0.88;
  for (let i = 1; i <= n; i += 1) { dp[i][0] = i * GAP; back[i][0] = 1; }
  for (let j = 1; j <= m; j += 1) { dp[0][j] = j * GAP; back[0][j] = 2; }
  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= m; j += 1) {
      const a = refTokens[i - 1].norm;
      const b = spokenTokens[j - 1].norm;
      const sim = a === b ? 1 : wordSimilarity(a, b);
      const subCost = a === b ? 0 : Math.min(1.2, 1.06 - sim * 0.92);
      const sub = dp[i - 1][j - 1] + subCost;
      const del = dp[i - 1][j] + GAP;
      const ins = dp[i][j - 1] + GAP;
      if (sub <= del && sub <= ins) {
        dp[i][j] = sub;
        back[i][j] = 0;
      } else if (del <= ins) {
        dp[i][j] = del;
        back[i][j] = 1;
      } else {
        dp[i][j] = ins;
        back[i][j] = 2;
      }
    }
  }
  const ops = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    const direction = back[i][j];
    if (i > 0 && j > 0 && direction === 0) {
      const ref = refTokens[i - 1];
      const spoken = spokenTokens[j - 1];
      const sim = ref.norm === spoken.norm ? 1 : wordSimilarity(ref.norm, spoken.norm);
      ops.push({ type: ref.norm === spoken.norm ? 'match' : sim > 0.985 ? 'match' : 'sub', ref, spoken, similarity: sim });
      i -= 1;
      j -= 1;
    } else if (i > 0) {
      ops.push({ type: 'omit', ref: refTokens[i - 1] });
      i -= 1;
    } else {
      ops.push({ type: 'insert', spoken: spokenTokens[j - 1] });
      j -= 1;
    }
  }
  return ops.reverse();
}

function guessAsrConfidence(spokenWords) {
  const vals = spokenWords.map(t => Number(t.confidence)).filter(v => Number.isFinite(v) && v > 0);
  if (!vals.length) return 0.75;
  return vals.reduce((sum, v) => sum + v, 0) / vals.length;
}

function trapInfoForWord(word, textTraps = []) {
  const lower = word.toLowerCase().replace(/[’']/g, '');
  const direct = textTraps.find(t => t.word.toLowerCase().replace(/[’']/g, '') === lower);
  if (direct) return direct;
  return HARD_WORDS.get(lower) || null;
}

function isEndingMismatch(ref, spoken) {
  if (!ref || !spoken) return null;
  const r = ref.norm;
  const s = spoken.norm;
  if (r === s) return null;
  if (r.replace(/ed$/, '') === s.replace(/ed$/, '') && (r.endsWith('ed') || s.endsWith('ed'))) {
    return ref.raw.toLowerCase().endsWith('ed') ? '-ed' : 'ending';
  }
  if (stem(r) === stem(s) && r !== s) return '-s/-ed';
  return null;
}

function makeIssue({ kind, ref, spoken, category, severity, probable, distortsMeaning, note, tip, refIpa, origIndex }) {
  return {
    kind,
    category,
    severity,
    probable,
    distortsMeaning,
    refWord: ref?.original || ref?.raw || '',
    heard: spoken?.raw || '',
    refIpa: refIpa || '',
    note,
    tip,
    wordIndex: origIndex ?? ref?.origIndex ?? null
  };
}

function categoryLabel(category) {
  return {
    pronunciation: 'Произношение',
    ending: 'Окончание',
    omission: 'Пропуск',
    addition: 'Лишнее слово',
    number: 'Число',
    stress: 'Ударение',
    word: 'Слово',
    filler: 'Запинка',
    repetition: 'Повтор'
  }[category] || 'Слово';
}

export function analyzeReading({ text, transcript, metrics = null, textTraps = [], textId = null, textTitle = '', demo = false }) {
  const ref = buildAlignmentTokens(text);
  const spoken = buildAlignmentTokens(transcript || '');
  const avgConfidence = guessAsrConfidence(spoken.words);
  const ops = align(ref.words, spoken.words);
  const refWordCount = ref.words.filter(t => t.norm !== '%').length;

  let matched = 0;
  const issues = [];
  const extras = { omissions: 0, insertions: 0, fillers: 0, repetitions: 0 };

  ops.forEach((op, idx) => {
    if (op.type === 'match') {
      if (op.ref.norm !== '%') matched += 1;
      return;
    }
    if (op.type === 'sub') {
      const refToken = op.ref;
      const spokenToken = op.spoken;
      const info = trapInfoForWord(refToken.raw, textTraps);
      const ending = isEndingMismatch(refToken, spokenToken);
      const isVariant = SPELLING_VARIANTS[refToken.raw.toLowerCase()] === spokenToken.norm ||
        SPELLING_VARIANTS[spokenToken.raw.toLowerCase()] === refToken.norm;
      if (isVariant || op.similarity > 0.96) return;
      const isCritical = Boolean(CRITICAL_WORDS.has(refToken.norm) || CRITICAL_WORDS.has(stem(refToken.norm)) || info?.critical);
      const isHard = Boolean(info);
      const confident = avgConfidence >= 0.68;
      const likely = isCritical || isHard || (confident && op.similarity < 0.58);
      const severity = isCritical ? 'high' : isHard || likely ? 'medium' : 'low';
      const probable = isCritical || isHard || (confident && op.similarity < 0.62);
      const category = ending ? 'ending' : refToken.numberLike ? 'number' : (info?.cat === 'stress' ? 'stress' : 'pronunciation');
      const note = ending
        ? `Окончание не совпало: в тексте «${refToken.original || refToken.raw}», в распознавании «${spokenToken.raw}».`
        : `В тексте «${refToken.original || refToken.raw}»${info?.ipa ? ` ${info.ipa}` : ''}, распознано «${spokenToken.raw}».`;
      const tip = ending
        ? 'Проверьте правило -ed/-s: звук зависит от последнего звука основы. Прослушайте слово в записи.'
        : info?.note || 'Прослушайте фрагмент и сравните с эталонным произношением. Автоматическое распознавание могло ошибиться.';
      issues.push(makeIssue({
        kind: 'substitution',
        ref: refToken,
        spoken: spokenToken,
        category,
        severity,
        probable,
        distortsMeaning: isCritical,
        note: info?.wrong ? `${note} Частая ошибка: «${info.wrong}».` : note,
        tip,
        refIpa: info?.ipa,
        origIndex: refToken.origIndex
      }));
      return;
    }
    if (op.type === 'omit') {
      const refToken = op.ref;
      if (refToken.norm === '%') return;
      const functionWord = FUNCTION_WORDS.has(refToken.norm) || refToken.norm.length <= 2;
      const info = trapInfoForWord(refToken.raw, textTraps);
      const content = !functionWord;
      extras.omissions += 1;
      issues.push(makeIssue({
        kind: 'omission',
        ref: refToken,
        category: refToken.numberLike ? 'number' : 'omission',
        severity: content ? 'medium' : 'low',
        probable: content && avgConfidence >= 0.7,
        distortsMeaning: false,
        note: content
          ? `Слово «${refToken.original || refToken.raw}»${info?.ipa ? ` ${info.ipa}` : ''} не распознано в записи. Возможно, оно было пропущено или произнесено нечётко.`
          : `Служебное слово «${refToken.raw}» не распознано. Иногда это ошибка распознавания, а не чтения.`,
        tip: info?.note || 'Если слово действительно пропущено, перечитайте фрагмент целиком, не пытаясь вставить его задним числом.',
        refIpa: info?.ipa,
        origIndex: refToken.origIndex
      }));
      return;
    }
    if (op.type === 'insert') {
      const spoken = op.spoken;
      const norm = spoken.norm;
      if (FILLERS.has(norm)) {
        extras.fillers += 1;
        issues.push(makeIssue({
          kind: 'insertion',
          spoken,
          category: 'filler',
          severity: 'low',
          probable: false,
          distortsMeaning: false,
          note: `В записи появилось заполнение паузы: «${spoken.raw}».`,
          tip: 'Лучше сделать короткую молчаливую паузу, чем заполнять её звуком. Это не фонетическая ошибка, но снижает плавность.',
          origIndex: null
        }));
        return;
      }
      const prev = ops[idx - 1];
      if (prev?.type === 'match' && prev.ref.raw.toLowerCase() === spoken.raw.toLowerCase()) {
        extras.repetitions += 1;
        issues.push(makeIssue({
          kind: 'insertion',
          spoken,
          category: 'repetition',
          severity: 'low',
          probable: false,
          distortsMeaning: false,
          note: `Повтор слова «${spoken.raw}» в записи.`,
          tip: 'Не останавливайтесь и не начинайте заново: продолжайте с того же места.',
          origIndex: null
        }));
        return;
      }
      extras.insertions += 1;
      const info = trapInfoForWord(spoken.raw, textTraps);
      issues.push(makeIssue({
        kind: 'insertion',
        spoken,
        category: 'addition',
        severity: 'low',
        probable: false,
        distortsMeaning: false,
        note: `В записи есть слово, которого нет в тексте: «${spoken.raw}». Автоматическое распознавание иногда добавляет слова.`,
        tip: info?.note || 'Сверьте это место с аудиозаписью. Если слово лишнее, не спешите и ведите пальцем по строке.',
        refIpa: info?.ipa,
        origIndex: null
      }));
    }
  });

  const coverage = refWordCount ? matched / refWordCount : 0;
  const probableIssues = issues.filter(i => i.probable && ['substitution', 'ending', 'omission', 'number', 'stress', 'pronunciation'].includes(i.category));
  const probableErrorCount = probableIssues.length;
  const distortionCount = issues.filter(i => i.probable && i.distortsMeaning).length;

  const durationSec = Number(metrics?.durationSec) || null;
  const spokenDuration = Number(metrics?.speechDurationSec) || durationSec;
  const wpm = durationSec ? Math.round((matched / Math.max(durationSec, 1)) * 60) : null;
  const longPauses = Array.isArray(metrics?.longPauses) ? metrics.longPauses : [];
  const pauseCount = Number(metrics?.pauseCount ?? longPauses.length) || 0;
  const longestPause = Number(metrics?.longestPause ?? (longPauses.reduce((max, p) => Math.max(max, p.duration || 0), 0))) || 0;
  const speechRatio = Number.isFinite(Number(metrics?.speechRatio)) ? Number(metrics.speechRatio) : null;
  const pauseIssue = [];
  if (pauseCount > 5 || longestPause >= 3.2) {
    pauseIssue.push(`Обнаружено ${pauseCount} длинных пауз${longestPause ? `, самая долгая — ${longestPause.toFixed(1)} с` : ''}. Для «лёгкого восприятия» это риск.`);
  } else if (pauseCount >= 3) {
    pauseIssue.push(`Длинных пауз ${pauseCount}. Допустимо, но стоит проверить, не рвут ли они смысловые группы.`);
  }
  const tempoTooFast = wpm !== null && wpm > 150;
  const tempoTooSlow = wpm !== null && wpm < 80;
  const fluencyFail = Boolean(
    (pauseCount > 6 || longestPause >= 4 || (speechRatio !== null && speechRatio < 0.48) || tempoTooSlow || (wpm !== null && wpm > 165))
  );
  const insufficient = !transcript || spoken.words.length < 10 || coverage < 0.55 || !refWordCount;

  let verdict = null;
  const reasons = [];
  if (insufficient) {
    reasons.push('Запись слишком короткая или распознано меньше 55% текста — автоматический вердикт будет нечестным.');
    reasons.push('Перезапишите чтение целиком или вставьте транскрипт вручную.');
  } else if (probableErrorCount > 5 || distortionCount >= 3 || fluencyFail) {
    verdict = 0;
    if (probableErrorCount > 5) reasons.push(`Вероятных фонетических ошибок: ${probableErrorCount} — больше пяти.`);
    if (distortionCount >= 3) reasons.push(`Ошибок, искажающих смысл: ${distortionCount} — три и более.`);
    if (fluencyFail) reasons.push('Паузы, темп или доля речи мешают восприятию.');
    if (!reasons.length) reasons.push('Совокупность ошибок соответствует критерию 0 баллов.');
  } else {
    verdict = 1;
    reasons.push(`Вероятных фонетических ошибок: ${probableErrorCount} (допускается до 5).`);
    reasons.push(`Искажающих смысл: ${distortionCount} (допускается 1–2).`);
    if (!metrics) reasons.push('Аудиометрия не выполнялась: вердикт опирается только на слова и транскрипт.');
    else if (!pauseIssue.length) reasons.push('Длинных пауз немного; общий темп не мешает восприятию.');
    else reasons.push('Паузы стоит проверить по записи.');
  }

  const pauseScore = metrics ? clamp(100 - Math.max(0, pauseCount - 2) * 11 - (longestPause > 2.5 ? 12 : 0), 20, 100) : null;
  const tempoPenalty = wpm === null ? 0 : Math.abs(wpm - 106) > 18 ? Math.min(35, (Math.abs(wpm - 106) - 18) * 1.1) : 0;
  const fluencyScore = metrics ? clamp((pauseScore ?? 70) - tempoPenalty - (speechRatio !== null && speechRatio < 0.6 ? 10 : 0), 20, 100) : null;
  const pronunciationScore = clamp(100 - probableErrorCount * 9 - distortionCount * 11, 20, 100);
  const pitchRange = Number.isFinite(Number(metrics?.pitchRangeSemitones)) ? Number(metrics.pitchRangeSemitones) : null;
  const flatRatio = Number.isFinite(Number(metrics?.flatRatio)) ? Number(metrics.flatRatio) : null;
  const intonationScore = metrics && pitchRange !== null
    ? clamp(100 - Math.abs(pitchRange - 5.5) * 7 - (flatRatio !== null && flatRatio > 0.7 ? 22 : 0), 25, 100)
    : null;

  const scores = {
    pronunciation: pronunciationScore,
    fluency: fluencyScore,
    intonation: intonationScore,
    overall: Math.round(
      pronunciationScore * 0.48 +
      (fluencyScore ?? pronunciationScore) * 0.3 +
      (intonationScore ?? pronunciationScore) * 0.22
    )
  };

  const confidence = insufficient
    ? 'low'
    : (!metrics ? 'low' : coverage > 0.9 && avgConfidence >= 0.78 ? 'high' : coverage > 0.75 ? 'medium' : 'low');

  let summary;
  if (verdict === null) {
    summary = 'Пока недостаточно данных для честной оценки. Нужна более полная запись или исправленный транскрипт.';
  } else if (verdict === 1) {
    summary = metrics
      ? 'Формально это близко к 1 баллу: лимиты по вероятным ошибкам и искажающим смысл не превышены. Проверьте отмеченные слова по аудио — распознавание могло ошибиться.'
      : 'По транскрипту расхождений в пределах лимита: слова и окончания не дают оснований для 0 баллов. Паузы, темп и интонация не измерялись — для полной проверки запишите чтение.';
  } else {
    summary = 'Предварительно 0 баллов: найдены основания, по которым эксперт мог бы снизить оценку. Начните с одной-двух самых заметных ошибок.';
  }

  const trapResults = collectTrapResults({ text, textTraps, ops, issues });
  const strengths = [];
  if (coverage >= 0.94) strengths.push('Вы дочитали текст и сохранили почти все слова.');
  if (wpm !== null && wpm >= 90 && wpm <= 125) strengths.push(`Темп ${wpm} слов/мин — в спокойном экзаменационном диапазоне.`);
  if (metrics && pauseCount <= 2) strengths.push('Почти нет длинных пауз — речь звучит слитно.');
  if (intonationScore !== null && intonationScore >= 70) strengths.push('Тон не монотонный: есть движение голоса по фразам.');
  if (trapResults.length && trapResults.every(t => t.status === 'ok')) strengths.push('Все отмеченные слова-ловушки распознаны без замен.');
  if (!strengths.length) strengths.push('Запись уже дала данные для следующего шага — начните с одного изменения, а не со всего сразу.');

  const plan = buildPlan({ issues, metrics, wpm, pauseCount, intonationScore, probableErrorCount, distortionCount });
  const issueGroups = groupIssues(issues);

  return {
    id: `report-${Date.now()}`,
    createdAt: new Date().toISOString(),
    textId,
    textTitle,
    text,
    demo,
    transcript,
    wordCount: refWordCount,
    coverage,
    wpm,
    durationSec,
    metrics: {
      ...metrics,
      coverage,
      wpm,
      pauseCount,
      longestPause,
      speechRatio,
      pitchRange,
      flatRatio,
      avgConfidence
    },
    issues,
    issueGroups,
    probableErrorCount,
    distortionCount,
    counts: extras,
    reasons,
    verdict,
    summary,
    scores,
    confidence,
    strengths,
    plan,
    trapResults,
    pauseIssue,
    insufficient,
    display: ref.display,
    alignmentOps: ops.map(op => ({
      type: op.type,
      ref: op.ref ? { raw: op.ref.raw, origIndex: op.ref.origIndex, norm: op.ref.norm } : null,
      spoken: op.spoken ? { raw: op.spoken.raw } : null,
      similarity: op.similarity
    }))
  };
}

function collectTrapResults({ text, textTraps, ops, issues }) {
  const traps = [...textTraps];
  const existing = new Set(traps.map(t => t.word.toLowerCase()));
  for (const entry of WORD_BANK) {
    if (!existing.has(entry.word.toLowerCase()) && text.toLowerCase().includes(entry.word.toLowerCase())) {
      traps.push(entry);
      existing.add(entry.word.toLowerCase());
    }
  }
  const results = [];
  const consumed = new Set();
  for (const trap of traps) {
    const normalized = trap.word.toLowerCase();
    const matchingOps = ops.filter(op => op.ref && op.ref.raw.toLowerCase().replace(/[’']/g, '') === normalized.replace(/[’']/g, ''));
    if (!matchingOps.length) continue;
    const problem = issues.find(issue => issue.refWord.toLowerCase() === normalized && issue.kind !== 'addition');
    if (!problem) {
      results.push({ word: trap.word, ipa: trap.ipa || '', note: trap.note || '', status: 'ok' });
    } else {
      results.push({ word: trap.word, ipa: trap.ipa || '', note: trap.note || '', status: problem.kind === 'omission' ? 'missed' : 'check', issue: problem });
    }
    consumed.add(normalized);
  }
  return results.slice(0, 18);
}

function buildPlan({ issues, metrics, wpm, pauseCount, intonationScore, probableErrorCount, distortionCount }) {
  const plan = [];
  const critical = issues.filter(i => i.probable && i.distortsMeaning).slice(0, 2);
  if (critical.length) {
    plan.push({
      title: 'Разведите пары, которые меняют смысл',
      text: `Сначала отработайте: ${critical.map(i => `${i.refWord}${i.refIpa ? ` ${i.refIpa}` : ''}`).join(', ')}. Сравните оба слова в разделе «Частые ошибки» и повторите минимальные пары вслух.`,
      href: '#/mistakes'
    });
  }
  if (metrics && pauseCount > 2) {
    plan.push({
      title: 'Соберите паузы по смыслу',
      text: `Длинных пауз: ${pauseCount}. Прочитайте текст по группам, делая остановку только на точке, запятой и границе придаточной части.`,
      href: '#/fluency'
    });
  }
  if (wpm !== null && wpm > 125) {
    plan.push({
      title: 'Снизьте темп до спокойного',
      text: `Текущий темп — ${wpm} слов/мин. Для текста 150–160 слов за 90 секунд ориентир около 100–108. Читайте медленнее на длинных словах, а не на служебных.`,
      href: '#/fluency'
    });
  } else if (wpm !== null && wpm < 88) {
    plan.push({
      title: 'Уберите лишние остановки',
      text: `Темп ${wpm} слов/мин ниже спокойного. Чаще всего причина — чтение по словам. Соберите артикли, прилагательные и существительные в одну группу.`,
      href: '#/fluency'
    });
  }
  if (intonationScore !== null && intonationScore < 65) {
    plan.push({
      title: 'Добавьте движение тона',
      text: 'Звучание близко к монотонному. На каждой точке завершайте фразу падением, а в перечислениях делайте лёгкий подъём на нефинальных элементах.',
      href: '#/fluency'
    });
  }
  const endings = issues.filter(i => i.category === 'ending').length;
  if (endings) {
    plan.push({
      title: 'Верните окончания',
      text: 'Проверьте -ed и -s: /t/, /d/, /ɪd/ и /s/, /z/, /ɪz/. Один короткий дрилл перед следующей записью.',
      href: '#/rules'
    });
  }
  const traps = issues.filter(i => i.refIpa && i.probable).slice(0, 3);
  if (traps.length && plan.length < 3) {
    plan.push({
      title: 'Прослушайте слова-ловушки',
      text: `Особое внимание: ${traps.map(i => i.refWord).join(', ')}. Прослушайте эталон и повторите слово изолированно, затем в фразе.`,
      href: '#/mistakes'
    });
  }
  if (!plan.length) {
    plan.push({
      title: 'Закрепите результат',
      text: probableErrorCount === 0
        ? 'Ошибок не найдено. Перечитайте этот же текст через день в темпе 104–108 слов/мин — стабильность важнее одного удачного дубля.'
        : 'Перечитайте текст ещё раз, сохранив темп и паузы. Перед записью проверьте только отмеченные слова, не пытайтесь исправить всё сразу.',
      href: '#/texts'
    });
  }
  return plan.slice(0, 3);
}

function groupIssues(issues) {
  const groups = {
    pronunciation: { label: 'Произношение и ударение', items: [] },
    ending: { label: 'Окончания', items: [] },
    omission: { label: 'Пропуски и числа', items: [] },
    fluency: { label: 'Плавность', items: [] },
    other: { label: 'Прочее', items: [] }
  };
  for (const issue of issues) {
    if (issue.category === 'filler' || issue.category === 'repetition') groups.fluency.items.push(issue);
    else if (issue.category === 'ending') groups.ending.items.push(issue);
    else if (issue.category === 'omission' || issue.category === 'number') groups.omission.items.push(issue);
    else if (issue.category === 'addition') groups.other.items.push(issue);
    else groups.pronunciation.items.push(issue);
  }
  return Object.entries(groups)
    .filter(([, group]) => group.items.length)
    .map(([id, group]) => ({ id, label: group.label, items: group.items }));
}

export function analyzeTranscript({ text, transcript }) {
  return analyzeReading({ text, transcript, metrics: null, textTraps: [] });
}

export function makeDemoReport(text, metrics = null) {
  const source = text.body || text;
  const transcript = source
    .replace(/\bSeattle\b/, 'settle')
    .replace(/\bsocial\b/, '')
    .replace(/\bsimply\b/, '')
    .replace(/\s+/g, ' ')
    .trim();
  const demoMetrics = metrics || {
    durationSec: 91,
    speechDurationSec: 78,
    speechRatio: 0.7,
    pauseCount: 2,
    longestPause: 1.35,
    longPauses: [{ start: 31, duration: 1.35 }, { start: 68, duration: 1.2 }],
    pitchRangeSemitones: 5.4,
    flatRatio: 0.34
  };
  return analyzeReading({
    text: source,
    transcript,
    metrics: demoMetrics,
    textTraps: text.traps || [],
    textId: text.id,
    textTitle: text.title,
    demo: true
  });
}

export function getHighlightMap(report) {
  const map = new Map();
  for (const issue of report.issues) {
    if (!issue.wordIndex && issue.wordIndex !== 0) continue;
    if (issue.kind === 'insertion') continue;
    const current = map.get(issue.wordIndex);
    if (!current || issue.severity === 'high') {
      map.set(issue.wordIndex, {
        number: map.size + 1,
        severity: issue.severity,
        issue
      });
    }
  }
  return map;
}

export function getTempoBand(wpm) {
  if (wpm === null || wpm === undefined) return { id: 'none', label: 'Нет данных', tone: 'muted' };
  if (wpm < 80) return { id: 'slow', label: 'Медленно', tone: 'warn' };
  if (wpm < 94) return { id: 'calm', label: 'Спокойно', tone: 'good' };
  if (wpm <= 120) return { id: 'target', label: 'В целевом диапазоне', tone: 'good' };
  if (wpm <= 145) return { id: 'fast', label: 'Быстровато', tone: 'warn' };
  return { id: 'toofast', label: 'Слишком быстро', tone: 'bad' };
}

export function getCoverageLabel(coverage) {
  if (coverage >= 0.95) return 'Почти весь текст';
  if (coverage >= 0.85) return 'Большая часть текста';
  if (coverage >= 0.65) return 'Часть текста';
  return 'Мало данных';
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

export { categoryLabel };

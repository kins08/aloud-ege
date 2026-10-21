export const FLUENCY_PILLARS = [
  {
    num: '01',
    title: 'Смысловые группы',
    text: 'Разделяйте текст не по словам, а по группам, которые несут одну мысль. Артикль, прилагательное и существительное остаются вместе.',
    symbol: '/'
  },
  {
    num: '02',
    title: 'Оправданные паузы',
    text: 'Пауза нужна там, где заканчивается мысль или начинается новая. Пауза после каждого слова — главный враг «лёгкости восприятия».',
    symbol: '❘'
  },
  {
    num: '03',
    title: 'Фразовое ударение',
    text: 'Содержательные слова звучат сильнее, служебные — слабее. Благодаря этому английский звучит как английский, а не как список слов.',
    symbol: 'ˈ'
  },
  {
    num: '04',
    title: 'Контур интонации',
    text: 'Утверждение завершается падением, вопрос да/нет — подъёмом. В задании 1 нужен спокойный информационный тон, а не театральная декламация.',
    symbol: '↘'
  }
];

export const THOUGHT_GROUP_RULES = [
  {
    title: 'Артикль / определитель + существительное',
    rule: 'Не разрывайте группу паузой.',
    good: 'the first postcard',
    bad: 'the / first postcard'
  },
  {
    title: 'Прилагательное + существительное',
    rule: 'Эпитет и определяемое слово — одна группа.',
    good: 'a quiet side street',
    bad: 'a quiet / side street'
  },
  {
    title: 'Предлог + существительное',
    rule: 'Пауза перед предлогом возможна, после него — нет.',
    good: 'in the north-east of Italy',
    bad: 'in / the north-east / of / Italy'
  },
  {
    title: 'Вспомогательный + смысловой глагол',
    rule: 'Глагольная группа читается слитно.',
    good: 'has been studied',
    bad: 'has / been / studied'
  },
  {
    title: 'Вводная фраза',
    rule: 'Вводное обстоятельство можно отделить короткой паузой.',
    good: 'For a long time, / people believed...',
    bad: 'For / a / long / time / people / believed...'
  },
  {
    title: 'Придаточная часть',
    rule: 'Перед that, which, who, when, because обычно начинается новая группа.',
    good: '...a result of instinct. / However, / experiments have shown...',
    bad: '...a result / of instinct however / experiments...'
  }
];

export const PHRASE_EXAMPLES = [
  {
    id: 'crows',
    title: 'Научно-популярный текст',
    meta: 'Паузы помогают услышать структуру «тезис — пример — вывод».',
    chunks: [
      { text: 'Crows are among the cleverest birds.', note: 'Полное утверждение; точка — пауза и падение тона.' },
      { text: 'For a long time,', note: 'Вводное обстоятельство; короткая пауза после запятой.' },
      { text: 'people believed', note: 'Подлежащее и глагол; не разрывайте.' },
      { text: 'that their behaviour was a result of instinct.', note: 'Придаточная часть; читается слитно внутри.' },
      { text: 'However,', note: 'Контрастный маркер. Небольшая пауза до и после.' },
      { text: 'experiments have shown', note: 'Новая мысль.' },
      { text: 'that crows can solve problems', note: 'Придаточная часть.' },
      { text: 'that would challenge a young child.', note: 'Финальное утверждение — падение тона.' }
    ]
  },
  {
    id: 'postcard',
    title: 'Исторический текст',
    meta: 'Числа и даты не должны разрывать предложение на куски.',
    chunks: [
      { text: 'The first postcard', note: 'Подлежащее с определением.' },
      { text: 'was sent in Austria', note: 'Глагольная группа + место.' },
      { text: 'in 1869.', note: 'Дата — отдельная группа; падение в конце.' },
      { text: 'It was a rectangle of light brown paper', note: 'Длинная именная группа, но одна мысль.' },
      { text: 'with a message of no more than twenty words.', note: 'Вторая часть; предлог with начинает группу.' }
    ]
  },
  {
    id: 'city',
    title: 'Городской текст',
    meta: 'Покажите контраст между частями сложного предложения.',
    chunks: [
      { text: 'Although the city is small,', note: 'Уступительная часть; запятая задаёт паузу.' },
      { text: 'it attracts thousands of visitors', note: 'Главная часть.' },
      { text: 'every year.', note: 'Финальная группа; завершение тона.' }
    ]
  }
];

export const PAUSE_HIERARCHY = [
  { mark: 'Точка', length: '1–1,5 секунды', note: 'Конец мысли. Тон падает, затем короткая пауза.' },
  { mark: 'Точка с запятой / двоеточие', length: '0,5–0,8 секунды', note: 'Смысловой поворот. Пауза ощутимая, но не как между абзацами.' },
  { mark: 'Запятая', length: '0,2–0,4 секунды', note: 'Не всегда требует паузы; чаще помогает мягко перейти к следующей части.' },
  { mark: 'Без знака', length: '0', note: 'Внутри группы паузы нет. Дыхание берём на границе, а не после каждого слова.' }
];

export const WEAK_FORMS = [
  { word: 'a', strong: '/eɪ/', weak: '/ə/', example: 'a book — /ə bʊk/' },
  { word: 'an', strong: '/æn/', weak: '/ən/', example: 'an apple — /ən ˈæpl/' },
  { word: 'the', strong: '/ðiː/', weak: '/ðə, ði/', example: 'the city — /ðə ˈsɪti/' },
  { word: 'and', strong: '/ænd/', weak: '/ən(d)/', example: 'bread and butter — /bred ən ˈbʌtə/' },
  { word: 'of', strong: '/ɒv/', weak: '/əv/', example: 'a piece of cake — /ə piːs əv keɪk/' },
  { word: 'to', strong: '/tuː/', weak: '/tə/', example: 'to the city — /tə ðə ˈsɪti/' },
  { word: 'for', strong: '/fɔː/', weak: '/fə/', example: 'for a moment — /fər ə ˈməʊmənt/' },
  { word: 'from', strong: '/frɒm/', weak: '/frəm/', example: 'from the station — /frəm ðə ˈsteɪʃn/' },
  { word: 'can', strong: '/kæn/', weak: '/kən/', example: 'We can go — /wi kən ˈɡəʊ/' },
  { word: 'was', strong: '/wɒz/', weak: '/wəz/', example: 'It was late — /ɪt wəz ˈleɪt/' },
  { word: 'than', strong: '/ðæn/', weak: '/ðən/', example: 'older than me — /ˈəʊldə ðən miː/' },
  { word: 'that', strong: '/ðæt/', weak: '/ðət/', example: 'I think that it works — /aɪ ˈθɪŋk ðət ɪt ˈwɜːks/' }
];

export const SENTENCE_STRESS = {
  principle: 'Ударение получают слова, которые несут новую информацию: существительные, смысловые глаголы, прилагательные, наречия и числа. Артикли, предлоги, союзы, вспомогательные глаголы и местоимения обычно ослаблены.',
  example: {
    full: 'The FIRST POSTCARD was SENT in AUSTRIA in eighTEEN sixty-NINE.',
    caption: 'Заглавные буквы — смысловые акценты. Служебные слова между ними звучат слабее и быстрее.',
    note: 'Не ставьте ударение на каждое слово: это ломает ритм и утомляет слушателя.'
  }
};

export const INTONATION_PATTERNS = [
  {
    id: 'fall',
    symbol: '↘',
    title: 'Падение: утверждение',
    rule: 'Основной тон задания 1. Последний ударный слог идёт вниз; после него голос остаётся низким.',
    example: 'The city is famous for its gardens.',
    note: 'Спокойно и уверенно. Не «взлетайте» в конце — это звучит как вопрос.'
  },
  {
    id: 'wh',
    symbol: '↘',
    title: 'Падение: специальный вопрос',
    rule: 'В вопросах с what, where, when, why, how тон в конце падает.',
    example: 'Why did the project begin in 1999?',
    note: 'В текстах задания 1 прямые вопросы встречаются редко, но интонационная логика та же.'
  },
  {
    id: 'rise',
    symbol: '↗',
    title: 'Подъём: вопрос да/нет',
    rule: 'Да/нет-вопросы обычно заканчиваются подъёмом. Не переносите этот контур на утверждения.',
    example: 'Is the museum open today?',
    note: 'Подъём лёгкий, не резкий.'
  },
  {
    id: 'list',
    symbol: '↗ ↘',
    title: 'Перечисление',
    rule: 'Нефинальные элементы — лёгкий подъём, последний — падение. Так слушатель понимает, что список закончился.',
    example: 'We need bread, milk and cheese.',
    note: 'Не делайте одинаковые паузы и одинаковый тон на каждом элементе.'
  },
  {
    id: 'fall-rise',
    symbol: '↘↗',
    title: 'Падение-подъём: контраст',
    rule: 'Показывает «но», сомнение или незавершённость. В задании 1 используйте осторожно: тон должен оставаться информационным.',
    example: 'The ticket was cheap, but the journey took hours.',
    note: 'Смысл «но» создаётся не только словом, но и движением голоса.'
  },
  {
    id: 'paren',
    symbol: '↘',
    title: 'Вводная часть и уточнение',
    rule: 'Вводная фраза произносится быстрее и чуть выше/ровнее, затем следует пауза, и главная мысль завершает контур.',
    example: 'In the nineteenth century, the city changed completely.',
    note: 'Пауза после вводной фразы не должна быть длиннее паузы в конце предложения.'
  }
];

export const LINKING_RULES = [
  {
    title: 'Согласный + гласный',
    rule: 'Конечный согласный «переезжает» к следующему гласному.',
    example: 'turn it on',
    phonetic: '/ˈtɜː.nɪ.tɒn/',
    note: 'Не «тёрн. ит. он» — звучит слитно.'
  },
  {
    title: 'Одинаковые согласные',
    rule: 'Два одинаковых звука сливаются в один долгий.',
    example: 'best time',
    phonetic: '/bes taɪm/',
    note: 'Не «бест тайм» с двойным t.'
  },
  {
    title: '/t/ или /d/ + you',
    rule: 'На стыке появляется /tʃ/ или /dʒ/.',
    example: 'nice to meet you',
    phonetic: '/naɪs tə ˈmiːtʃuː/',
    note: 'Meet you звучит как «митчу».'
  },
  {
    title: '/s/ или /z/ + you',
    rule: 'На стыке появляется /ʃ/ или /ʒ/.',
    example: 'as you know',
    phonetic: '/əʒu nəʊ/',
    note: 'Не разрывайте фразу паузой.'
  },
  {
    title: 'Связующее /r/ (BrE)',
    rule: 'Конечное r произносится, если следующее слово начинается с гласного.',
    example: 'far away',
    phonetic: '/fɑːr əˈweɪ/',
    note: 'В остальных случаях конечное r в BrE не звучит.'
  },
  {
    title: 'Вставные /w/ и /j/',
    rule: 'Между гласными появляется лёгкий переход.',
    example: 'go on; I agree',
    phonetic: '/ɡəʊ wɒn/; /aɪ jəˈɡriː/',
    note: 'Это естественная плавность, а не отдельный звук.'
  }
];

export const TEMPO = {
  target: '100–112 слов в минуту',
  formula: '150–160 слов ÷ 90 секунд × 60 ≈ 100–107 слов/мин',
  fast: 'Если темп выше 130 слов/мин, проверьте, не пропали ли окончания и паузы.',
  slow: 'Если темп ниже 85 слов/мин, скорее всего, появились лишние паузы или по слогам читаются длинные слова.',
  tip: 'Ориентируйтесь не на метроном, а на ощущение спокойной ясности. Один короткий вдох перед стартом, ровный темп, не ускоряйтесь к концу.'
};

export const PHRASE_TRAINER = {
  title: 'Пульс спокойного чтения',
  intro: 'Прочитайте пример по группам. Сначала прослушайте каждую, затем соедините их без лишних пауз.',
  chunks: [
    { text: 'A good reading sounds like a conversation', note: 'Подлежащее + глагол + сравнение.' },
    { text: 'with a patient listener.', note: 'Предлог + группа существительного.' },
    { text: 'You do not need a perfect accent.', note: 'Утверждение; падение в конце.' },
    { text: 'You need clear endings,', note: 'Первый элемент перечисления.' },
    { text: 'steady rhythm', note: 'Второй элемент.' },
    { text: 'and pauses that help the meaning.', note: 'Финальный элемент; завершение.' },
    { text: 'Before you start,', note: 'Вводная фраза; короткая пауза.' },
    { text: 'take one calm breath.', note: 'Команда; падение.' },
    { text: 'Then read the first sentence', note: 'Новая мысль.' },
    { text: 'a little slower than you think you should.', note: 'Естественное завершение.' }
  ]
};

export const MIC_TIPS = [
  { title: 'Позиция', text: 'Микрофон в 15–20 см, чуть сбоку от рта. Не дышите прямо в него.' },
  { title: 'Старт', text: 'Один спокойный вдох. Начните чуть медленнее, чем хочется.' },
  { title: 'Конец', text: 'Не обрывайте последнее слово. Доведите фразу до падения тона.' },
  { title: 'Спокойствие', text: 'Ошибка в слове не повод начинать заново. Продолжайте: важна общая лёгкость восприятия.' }
];

export const STRESS_RULES = [
  {
    id: 'suffix-tion',
    tag: 'Суффиксы',
    title: 'Ударение перед -tion, -sion, -cian',
    rule: 'Суффикс забирает ударение на слог назад. Слушайте ритм: ed-u-CA-tion, de-CI-sion, mu-SI-cian.',
    examples: [
      { word: 'education', ipa: '/ˌedʒuˈkeɪʃn/' },
      { word: 'decision', ipa: '/dɪˈsɪʒn/' },
      { word: 'musician', ipa: '/mjuˈzɪʃn/' },
      { word: 'information', ipa: '/ˌɪnfəˈmeɪʃn/' }
    ]
  },
  {
    id: 'suffix-ic',
    tag: 'Суффиксы',
    title: '-ic и -ical тянут ударение к себе',
    rule: 'Перед -ic / -ical ударным становится предыдущий слог. Это объясняет сдвиг в парах history — historic, economy — economic.',
    examples: [
      { word: 'scientific', ipa: '/ˌsaɪənˈtɪfɪk/' },
      { word: 'economic', ipa: '/ˌiːkəˈnɒmɪk/' },
      { word: 'political', ipa: '/pəˈlɪtɪkl/' },
      { word: 'historic', ipa: '/hɪˈstɒrɪk/' }
    ]
  },
  {
    id: 'suffix-ity',
    tag: 'Суффиксы',
    title: '-ity, -graphy, -logy, -metry',
    rule: 'В этих длинных суффиксах ударение обычно падает на слог перед суффиксом: uni-VER-sity, pho-TO-graphy, tech-NO-logy.',
    examples: [
      { word: 'university', ipa: '/ˌjuːnɪˈvɜːsəti/' },
      { word: 'photography', ipa: '/fəˈtɒɡrəfi/' },
      { word: 'technology', ipa: '/tekˈnɒlədʒi/' },
      { word: 'geometry', ipa: '/dʒiˈɒmətri/' }
    ]
  },
  {
    id: 'noun-verb',
    tag: 'Пары',
    title: 'Существительное — первый слог, глагол — второй',
    rule: 'В парах из двух слогов существительное часто имеет ударение на первом слоге, а глагол — на втором. Это не универсальное правило, но работает для многих частотных слов.',
    examples: [
      { word: 'present (n.)', ipa: '/ˈpreznt/' },
      { word: 'present (v.)', ipa: '/prɪˈzent/' },
      { word: 'record (n.)', ipa: '/ˈrekɔːd/' },
      { word: 'record (v.)', ipa: '/rɪˈkɔːd/' }
    ]
  },
  {
    id: 'teen-ty',
    tag: 'Числа',
    title: 'Thirteen или thirty?',
    rule: 'В -teen ударение на последний слог и долгий /iː/. В -ty ударение на первый слог, финал короткий. Не глотайте эту разницу в тексте с числами.',
    examples: [
      { word: 'thirteen', ipa: '/ˌθɜːˈtiːn/' },
      { word: 'thirty', ipa: '/ˈθɜːti/' },
      { word: 'fourteen', ipa: '/ˌfɔːˈtiːn/' },
      { word: 'forty', ipa: '/ˈfɔːti/' }
    ]
  },
  {
    id: 'compounds',
    tag: 'Слова',
    title: 'Сложные существительные',
    rule: 'В устойчивых compound nouns ударение обычно на первом элементе: FOOTball, SUNglasses, HEADache. В phrasal verbs ударение смещается на частицу: give UP, turn ON.',
    examples: [
      { word: 'football', ipa: '/ˈfʊtbɔːl/' },
      { word: 'sunglasses', ipa: '/ˈsʌnɡlɑːsɪz/' },
      { word: 'headache', ipa: '/ˈhedeɪk/' },
      { word: 'give up', ipa: '/ˌɡɪv ˈʌp/' }
    ]
  },
  {
    id: 'families',
    tag: 'Семьи слов',
    title: 'Ударение переезжает в семье',
    rule: 'Не переносите ударение с одного слова семьи на другое. Фотография-снимок, фотография-искусство и фотограф звучат по-разному.',
    examples: [
      { word: 'photograph', ipa: '/ˈfəʊtəɡrɑːf/' },
      { word: 'photography', ipa: '/fəˈtɒɡrəfi/' },
      { word: 'photographer', ipa: '/fəˈtɒɡrəfə/' },
      { word: 'economy', ipa: '/ɪˈkɒnəmi/' },
      { word: 'economic', ipa: '/ˌiːkəˈnɒmɪk/' }
    ]
  }
];

export const ENDING_RULES = {
  ed: [
    {
      sound: '/t/',
      condition: 'после глухих согласных (кроме t)',
      tip: 'Работает после /k/, /p/, /s/, /ʃ/, /tʃ/, /f/. Отдельного слога нет.',
      examples: [
        { word: 'worked', ipa: '/wɜːkt/' },
        { word: 'stopped', ipa: '/stɒpt/' },
        { word: 'watched', ipa: '/wɒtʃt/' },
        { word: 'baked', ipa: '/beɪkt/' }
      ]
    },
    {
      sound: '/d/',
      condition: 'после гласных и звонких согласных',
      tip: 'Самый частый вариант. Окончание приклеивается к слову, но не превращается в «-эд».',
      examples: [
        { word: 'played', ipa: '/pleɪd/' },
        { word: 'lived', ipa: '/lɪvd/' },
        { word: 'travelled', ipa: '/ˈtrævld/' },
        { word: 'recognised', ipa: '/ˈrekəɡnaɪzd/' }
      ]
    },
    {
      sound: '/ɪd/',
      condition: 'после /t/ или /d/',
      tip: 'Только здесь появляется дополнительный слог. Это не «правило для всех глаголов», а исключение по артикуляции.',
      examples: [
        { word: 'wanted', ipa: '/ˈwɒntɪd/' },
        { word: 'needed', ipa: '/ˈniːdɪd/' },
        { word: 'started', ipa: '/ˈstɑːtɪd/' },
        { word: 'decided', ipa: '/dɪˈsaɪdɪd/' }
      ]
    }
  ],
  s: [
    {
      sound: '/s/',
      condition: 'после глухих согласных',
      tip: 'Если последний звук глухой, окончание тоже глухое.',
      examples: [
        { word: 'cats', ipa: '/kæts/' },
        { word: 'works', ipa: '/wɜːks/' },
        { word: 'months', ipa: '/mʌnθs/' }
      ]
    },
    {
      sound: '/z/',
      condition: 'после гласных и звонких согласных',
      tip: 'Не оглушайте конец: dogs, plays, lives.',
      examples: [
        { word: 'dogs', ipa: '/dɒɡz/' },
        { word: 'plays', ipa: '/pleɪz/' },
        { word: 'lives', ipa: '/lɪvz/' }
      ]
    },
    {
      sound: '/ɪz/',
      condition: 'после шипящих и свистящих',
      tip: 'После /s/, /z/, /ʃ/, /ʒ/, /tʃ/, /dʒ/ нужен дополнительный слог.',
      examples: [
        { word: 'watches', ipa: '/ˈwɒtʃɪz/' },
        { word: 'boxes', ipa: '/ˈbɒksɪz/' },
        { word: 'closes', ipa: '/ˈkləʊzɪz/' },
        { word: 'buses', ipa: '/ˈbʌsɪz/' }
      ]
    }
  ]
};

export const LETTER_PATTERNS = [
  {
    id: 'th',
    title: 'th: /θ/ или /ð/',
    rule: 'Глухой /θ/ — без голоса (think, three, month). Звонкий /ð/ — с голосом (this, there, mother). Служебные слова чаще звонкие.',
    chips: ['think /θɪŋk/', 'three /θriː/', 'month /mʌnθ/', 'this /ðɪs/', 'there /ðeə/', 'mother /ˈmʌðə/']
  },
  {
    id: 'ough',
    title: 'ough: семь разных чтений',
    rule: 'Это самый нестабильный кластер в английском. Учите словами, не правилом: though — through — thought — tough — thorough.',
    chips: ['though /ðəʊ/', 'through /θruː/', 'thought /θɔːt/', 'tough /tʌf/', 'thorough /ˈθʌrə/', 'cough /kɒf/']
  },
  {
    id: 'ea',
    title: 'ea: обычно /iː/, но не всегда',
    rule: 'В большинстве слов — /iː/ (read, dream, tea), но есть /e/ (bread, head, weather) и /eɪ/ (great, break).',
    chips: ['read /riːd/', 'dream /driːm/', 'bread /bred/', 'weather /ˈweðə/', 'great /ɡreɪt/']
  },
  {
    id: 'oo',
    title: 'oo: долгий или короткий',
    rule: 'Чаще /uː/: food, moon, school. Но в book, good, look — короткий /ʊ/. В blood, flood — /ʌ/.',
    chips: ['food /fuːd/', 'school /skuːl/', 'book /bʊk/', 'good /ɡʊd/', 'blood /blʌd/', 'flood /flʌd/']
  },
  {
    id: 'ch',
    title: 'ch: /tʃ/, /k/ или /ʃ/',
    rule: 'Обычно /tʃ/ (chair), в словах греческого происхождения — /k/ (school, chemist), во французских заимствованиях — /ʃ/ (machine, chef).',
    chips: ['chair /tʃeə/', 'school /skuːl/', 'chemist /ˈkemɪst/', 'machine /məˈʃiːn/', 'chef /ʃef/']
  },
  {
    id: 'wh',
    title: 'wh: /w/ или /h/',
    rule: 'В most words — /w/: what, when, white. В who, whose, whole — /h/.',
    chips: ['what /wɒt/', 'when /wen/', 'white /waɪt/', 'who /huː/', 'whole /həʊl/']
  },
  {
    id: 'sion',
    title: '-sion: /ʃn/ или /ʒn/',
    rule: 'После согласной обычно /ʃn/ (decision, tension), в словах с гласной перед -sion часто /ʒn/ (television, conclusion).',
    chips: ['decision /dɪˈsɪʒn/', 'television /ˈtelɪvɪʒn/', 'conclusion /kənˈkluːʒn/', 'tension /ˈtenʃn/']
  },
  {
    id: 'ure',
    title: '-ure: /tʃə/, /ʒə/ или /jʊə/',
    rule: 'Слово nature звучит NAY-chuh, measure — MEZH-uh, pure — pyoor. Окончание зависит от предшествующего согласного.',
    chips: ['nature /ˈneɪtʃə/', 'future /ˈfjuːtʃə/', 'measure /ˈmeʒə/', 'pressure /ˈpreʃə/', 'pure /pjʊə/']
  },
  {
    id: 'silent',
    title: 'Немые буквы',
    rule: 'Немые буквы не «пропадают» из артикуляции — просто не произносятся. Учите слово целиком: KNEE, CLIMB, CASTLE, HOUR.',
    chips: ['know /nəʊ/', 'climb /klaɪm/', 'listen /ˈlɪsn/', 'castle /ˈkɑːsl/', 'hour /ˈaʊə/', 'island /ˈaɪlənd/', 'doubt /daʊt/', 'half /hɑːf/']
  }
];

export const PROPER_NAMES = [
  { name: 'Edinburgh', ipa: '/ˈedɪnbərə/', note: 'ED-in-buh-ruh; -gh немое.' },
  { name: 'Thames', ipa: '/temz/', note: 'Темза, не «Тэймс».' },
  { name: 'Greenwich', ipa: '/ˈɡrenɪtʃ/', note: 'GREN-itch, хотя пишется Green-.' },
  { name: 'Leicester', ipa: '/ˈlestə/', note: 'LES-tuh; -cester часто звучит /stə/.' },
  { name: 'Cambridge', ipa: '/ˈkeɪmbrɪdʒ/', note: 'КЕЙМ-бридж.' },
  { name: 'Oxford', ipa: '/ˈɒksfəd/', note: 'ОКС-фэд, без сильного второго слога.' },
  { name: 'Stratford-upon-Avon', ipa: '/ˌstrætfəd əˌpɒn ˈeɪvən/', note: 'Стратфорд-эпон-Эйвон; ударение в Avon на первый слог.' },
  { name: 'Windsor', ipa: '/ˈwɪnzə/', note: 'WIN-zuh, без /d/.' },
  { name: 'Birmingham', ipa: '/ˈbɜːmɪŋəm/', note: 'BUR-ming-um, финальная h немая.' },
  { name: 'Glasgow', ipa: '/ˈɡlɑːzɡəʊ/', note: 'GLAHZ-goh; не «Глазгов».' },
  { name: 'Liverpool', ipa: '/ˈlɪvəpuːl/', note: 'LI-vuh-pool.' },
  { name: 'Manchester', ipa: '/ˈmæntʃɪstə/', note: 'MAN-chi-stuh.' },
  { name: 'Snowdonia', ipa: '/snəʊˈdəʊniə/', note: 'Snow-DOH-nee-uh.' },
  { name: 'Loch Ness', ipa: '/ˌlɒk ˈnes/', note: 'Loch с /k/ и /ɒ/; Ness — /nes/.' },
  { name: 'Stonehenge', ipa: '/ˈstəʊnhendʒ/', note: 'STONE-henj, финальный /dʒ/.' },
  { name: 'Europe', ipa: '/ˈjʊərəp/', note: 'YOO-ruhp; два слога.' },
  { name: 'Vienna', ipa: '/viˈenə/', note: 'vi-EN-nuh.' },
  { name: 'Seattle', ipa: '/siˈætl/', note: 'si-AT-l.' },
  { name: 'California', ipa: '/ˌkælɪˈfɔːniə/', note: 'ka-li-FOR-nee-uh.' },
  { name: 'Australia', ipa: '/ɒˈstreɪliə/', note: 'os-TRAY-lee-uh; не путать с Austria /ˈɒstriə/.' }
];

export const HOMOGRAPHS = [
  {
    word: 'read',
    a: { pos: 'настоящее время', ipa: '/riːd/', example: 'I read the news every morning.', ru: 'Я читаю новости каждое утро.' },
    b: { pos: 'прошедшее время', ipa: '/red/', example: 'I read that book last year.', ru: 'Я читал эту книгу в прошлом году.' },
    tip: 'В тексте смотрите на время и контекст. Форма прошедшего времени звучит как red.'
  },
  {
    word: 'live',
    a: { pos: 'глагол «жить»', ipa: '/lɪv/', example: 'Millions of people live in this city.', ru: 'Миллионы людей живут в этом городе.' },
    b: { pos: 'прилагательное «живой, прямой»', ipa: '/laɪv/', example: 'The concert was broadcast live.', ru: 'Концерт транслировали в прямом эфире.' },
    tip: 'Глагол — короткий /ɪ/. Прилагательное — /aɪ/.'
  },
  {
    word: 'lead',
    a: { pos: 'глагол «вести»', ipa: '/liːd/', example: 'This path leads to the river.', ru: 'Эта тропинка ведёт к реке.' },
    b: { pos: 'существительное «свинец»', ipa: '/led/', example: 'Old pipes were made of lead.', ru: 'Старые трубы были сделаны из свинца.' },
    tip: 'Металл читается как red, без долгого /iː/.'
  },
  {
    word: 'wind',
    a: { pos: 'существительное «ветер»', ipa: '/wɪnd/', example: 'The wind was strong that day.', ru: 'В тот день ветер был сильный.' },
    b: { pos: 'глагол «заводить, виться»', ipa: '/waɪnd/', example: 'She wound the clock carefully.', ru: 'Она осторожно завела часы.' },
    tip: 'Ветер — /wɪnd/. Действие — /waɪnd/.'
  },
  {
    word: 'wound',
    a: { pos: 'существительное «рана»', ipa: '/wuːnd/', example: 'The wound took weeks to heal.', ru: 'Рана заживала неделями.' },
    b: { pos: 'прошедшее от wind', ipa: '/waʊnd/', example: 'He wound the rope around the post.', ru: 'Он обмотал верёвку вокруг столба.' },
    tip: 'Рана — /wuːnd/. Обмотал — /waʊnd/.'
  },
  {
    word: 'bow',
    a: { pos: 'глагол «кланяться»', ipa: '/baʊ/', example: 'The actor bowed to the audience.', ru: 'Актёр поклонился публике.' },
    b: { pos: 'существительное «лук»', ipa: '/bəʊ/', example: 'He drew the bow and aimed.', ru: 'Он натянул лук и прицелился.' },
    tip: 'Поклон — /baʊ/. Лук — /bəʊ/.'
  },
  {
    word: 'row',
    a: { pos: 'ряд, линия', ipa: '/rəʊ/', example: 'They sat in the front row.', ru: 'Они сидели в первом ряду.' },
    b: { pos: 'ссора (BrE)', ipa: '/raʊ/', example: 'They had a row about money.', ru: 'У них была ссора из-за денег.' },
    tip: 'В FIPI-текстах чаще ряд /rəʊ/. Но ссора звучит иначе.'
  },
  {
    word: 'tear',
    a: { pos: 'глагол «рвать»', ipa: '/teə/', example: 'Be careful not to tear the page.', ru: 'Осторожно, не порви страницу.' },
    b: { pos: 'существительное «слеза»', ipa: '/tɪə/', example: 'A tear rolled down her cheek.', ru: 'Слеза скатилась по её щеке.' },
    tip: 'Рвать — /teə/. Слеза — /tɪə/.'
  },
  {
    word: 'close',
    a: { pos: 'глагол «закрывать»', ipa: '/kləʊz/', example: 'Please close the window.', ru: 'Пожалуйста, закрой окно.' },
    b: { pos: 'прилагательное «близкий»', ipa: '/kləʊs/', example: 'She is a close friend.', ru: 'Она близкий друг.' },
    tip: 'Глагол заканчивается звонким /z/, прилагательное — глухим /s/.'
  },
  {
    word: 'use',
    a: { pos: 'глагол «использовать»', ipa: '/juːz/', example: 'We use cotton bags.', ru: 'Мы используем хлопковые сумки.' },
    b: { pos: 'существительное «использование»', ipa: '/juːs/', example: 'The use of plastic is falling.', ru: 'Использование пластика сокращается.' },
    tip: 'Глагол: /z/. Существительное: /s/.'
  },
  {
    word: 'present',
    a: { pos: 'существительное «подарок»', ipa: '/ˈpreznt/', example: 'She gave me a birthday present.', ru: 'Она подарила мне подарок на день рождения.' },
    b: { pos: 'глагол «представлять»', ipa: '/prɪˈzent/', example: 'He will present the results.', ru: 'Он представит результаты.' },
    tip: 'Подарок — ударение на первый слог. Представлять — на второй.'
  },
  {
    word: 'record',
    a: { pos: 'существительное «рекорд, запись»', ipa: '/ˈrekɔːd/', example: 'She broke the world record.', ru: 'Она побила мировой рекорд.' },
    b: { pos: 'глагол «записывать»', ipa: '/rɪˈkɔːd/', example: 'They recorded the interview.', ru: 'Они записали интервью.' },
    tip: 'Существительное — запись/рекорд на первом слоге; глагол — на втором.'
  },
  {
    word: 'minute',
    a: { pos: 'существительное «минута»', ipa: '/ˈmɪnɪt/', example: 'Wait a minute, please.', ru: 'Подождите минуту, пожалуйста.' },
    b: { pos: 'прилагательное «мельчайший»', ipa: '/maɪˈnjuːt/', example: 'The differences are minute.', ru: 'Различия мельчайшие.' },
    tip: 'Минута — /ˈmɪnɪt/. Прилагательное — /maɪˈnjuːt/ с ударением на второй слог.'
  },
  {
    word: 'object',
    a: { pos: 'существительное «предмет»', ipa: '/ˈɒbdʒɪkt/', example: 'A strange object lay on the table.', ru: 'На столе лежал странный предмет.' },
    b: { pos: 'глагол «возражать»', ipa: '/əbˈdʒekt/', example: 'I object to this decision.', ru: 'Я возражаю против этого решения.' },
    tip: 'Предмет — первый слог. Возражать — второй.'
  },
  {
    word: 'project',
    a: { pos: 'существительное «проект»', ipa: '/ˈprɒdʒekt/', example: 'Our school project is about water.', ru: 'Наш школьный проект о воде.' },
    b: { pos: 'глагол «прогнозировать»', ipa: '/prəˈdʒekt/', example: 'Experts project a rise in demand.', ru: 'Эксперты прогнозируют рост спроса.' },
    tip: 'Школьный проект — ударение на первый слог. Глагол — на второй.'
  },
  {
    word: 'increase',
    a: { pos: 'существительное «рост»', ipa: '/ˈɪŋkriːs/', example: 'There was an increase in visitors.', ru: 'Число посетителей выросло.' },
    b: { pos: 'глагол «расти, увеличивать»', ipa: '/ɪnˈkriːs/', example: 'Prices continue to increase.', ru: 'Цены продолжают расти.' },
    tip: 'Существительное — INcrease, глагол — inCREASE.'
  }
];

export const NUMERAL_SECTIONS = [
  {
    id: 'years',
    title: 'Годы',
    intro: 'Годы после 1100 обычно читаются парами, а не как одно огромное число. В экзаменационном тексте это почти всегда проверяется.',
    items: [
      { value: '1066', say: 'ten sixty-six', note: 'Пара 10 + 66.' },
      { value: '1805', say: 'eighteen oh five', note: 'zero в середине читается «oh».' },
      { value: '1900', say: 'nineteen hundred', note: 'Ровный век: hundred, не «one thousand nine hundred».' },
      { value: '1905', say: 'nineteen oh five', note: 'Частая ошибка — «nineteen five».' },
      { value: '2000', say: 'two thousand', note: 'Без «and» в конце.' },
      { value: '2005', say: 'two thousand and five', note: 'Или twenty oh five — реже и неформально.' },
      { value: '2010', say: 'twenty ten', note: 'Также two thousand and ten — допустимо.' },
      { value: '2026', say: 'twenty twenty-six', note: 'Основной вариант для ЕГЭ.' },
      { value: 'the 1980s', say: 'the nineteen eighties', note: 'Десятилетие: артикль + -ies.' }
    ]
  },
  {
    id: 'dates',
    title: 'Даты',
    intro: 'В британском варианте дата звучит «the fifth of May»; в американском — «May fifth». Для ЕГЭ выбирайте один вариант и держитесь его.',
    items: [
      { value: '1 May', say: 'the first of May', note: 'Британская модель: the + порядковое + of + месяц.' },
      { value: '5 March 2026', say: 'the fifth of March, twenty twenty-six', note: 'Порядковое числительное обязательно.' },
      { value: 'on 3 June', say: 'on the third of June', note: 'Порядковое, не «three June».' },
      { value: 'in the 19th century', say: 'in the nineteenth century', note: '19th = nineteenth.' },
      { value: 'May 5', say: 'May the fifth', note: 'Американская модель; не смешивайте с BrE в одном тексте.' }
    ]
  },
  {
    id: 'time',
    title: 'Время',
    intro: 'Если в тексте стоит время, читайте его естественно. В формальном чтении лучше избегать 24-часового формата.',
    items: [
      { value: '9:00', say: "nine o'clock", note: 'Ровный час.' },
      { value: '9:05', say: 'five past nine', note: 'Британский вариант; также nine oh five в расписании.' },
      { value: '9:15', say: 'a quarter past nine', note: 'Или nine fifteen.' },
      { value: '9:30', say: 'half past nine', note: 'Не «half to ten».' },
      { value: '9:40', say: 'twenty to ten', note: 'До следующего часа — to.' },
      { value: '9:45', say: 'a quarter to ten', note: 'Или nine forty-five.' },
      { value: '18:00', say: 'six in the evening', note: 'Не «восемнадцать ноль-ноль».' }
    ]
  },
  {
    id: 'money',
    title: 'Деньги',
    intro: 'Валюту читаем после числа. Дробную часть можно назвать полностью или коротко — главное, без русской кальки.',
    items: [
      { value: '£1', say: 'one pound', note: 'Монета — pound.' },
      { value: '£5', say: 'five pounds', note: 'Множественное число.' },
      { value: '£3.50', say: 'three pounds fifty', note: 'Или three pounds and fifty pence.' },
      { value: '50p', say: 'fifty pence', note: 'В неформальной речи — fifty pee.' },
      { value: '$4.99', say: 'four dollars ninety-nine', note: 'Центы можно не называть.' },
      { value: '€20', say: 'twenty euros', note: 'Euro во множественном числе — euros.' }
    ]
  },
  {
    id: 'fractions',
    title: 'Дроби',
    intro: 'Числитель — количественное, знаменатель — порядковое. Если числитель больше единицы, знаменатель получает -s.',
    items: [
      { value: '1/2', say: 'a half', note: 'Half без артикля в составе дроби.' },
      { value: '1/3', say: 'a third', note: 'Знаменатель — порядковое.' },
      { value: '2/3', say: 'two thirds', note: 'Numerator > 1 → thirds.' },
      { value: '1/4', say: 'a quarter', note: 'Также one fourth, но quarter естественнее.' },
      { value: '3/4', say: 'three quarters', note: 'Множественное число.' },
      { value: '1 1/2', say: 'one and a half', note: 'Целая часть + and + дробь.' },
      { value: '2 3/4', say: 'two and three quarters', note: 'Не «two three fourths».' }
    ]
  },
  {
    id: 'decimals',
    title: 'Десятичные',
    intro: 'В британском варианте ноль перед точкой — nought. Цифры после точки читаются по одной.',
    items: [
      { value: '0.5', say: 'nought point five', note: 'BrE; также zero point five / point five.' },
      { value: '2.75', say: 'two point seven five', note: 'Не «two point seventy-five».' },
      { value: '0.05', say: 'nought point zero five', note: 'Ноль после точки тоже называем.' },
      { value: '3.14', say: 'three point one four', note: 'Цифры после точки — по одной.' },
      { value: '99.9%', say: 'ninety-nine point nine per cent', note: 'Per cent — два слова в BrE.' }
    ]
  },
  {
    id: 'large',
    title: 'Большие числа',
    intro: 'Не добавляйте -s к hundred, thousand, million, если перед ними стоит число. В британском варианте в середине часто звучит and.',
    items: [
      { value: '100', say: 'a hundred', note: 'Или one hundred.' },
      { value: '1,000', say: 'a thousand', note: 'Не «one thousands».' },
      { value: '2,500', say: 'two thousand five hundred', note: 'Формально; в речи возможно two and a half thousand.' },
      { value: '1,000,000', say: 'a million', note: 'Million без -s после числа.' },
      { value: '3.2 million', say: 'three point two million', note: 'Million остаётся в единственном числе.' },
      { value: '2 billion', say: 'two billion', note: 'Billion — тысяча миллионов.' }
    ]
  },
  {
    id: 'ordinals',
    title: 'Порядковые',
    intro: 'Порядковые числительные нужны для дат, веков и мест в списке. Следите за финальным /θ/.',
    items: [
      { value: '1st', say: 'first', note: '/fɜːst/' },
      { value: '2nd', say: 'second', note: '/ˈsekənd/' },
      { value: '3rd', say: 'third', note: '/θɜːd/' },
      { value: '4th', say: 'fourth', note: '/fɔːθ/' },
      { value: '5th', say: 'fifth', note: '/fɪfθ/' },
      { value: '8th', say: 'eighth', note: '/eɪtθ/' },
      { value: '9th', say: 'ninth', note: '/naɪnθ/, без e.' },
      { value: '12th', say: 'twelfth', note: '/twelfθ/' },
      { value: '20th', say: 'twentieth', note: '/ˈtwentiəθ/' },
      { value: '21st', say: 'twenty-first', note: '/ˌtwenti ˈfɜːst/' }
    ]
  },
  {
    id: 'phones',
    title: 'Телефоны и проценты',
    intro: 'Телефонные номера читаются по цифрам, с паузами по группам. Проценты — number + per cent.',
    items: [
      { value: '0', say: 'oh', note: 'В номере телефона BrE — oh; в математике — zero/nought.' },
      { value: '07700 900123', say: 'oh seven seven, double oh, nine oh oh, one two three', note: 'Группируйте цифры, не пытайтесь прочитать как число.' },
      { value: '0207 946 0018', say: 'oh two oh seven, nine four six, oh oh one eight', note: 'Паузы между группами — естественные.' },
      { value: '70%', say: 'seventy per cent', note: 'Per cent — два слова в BrE.' },
      { value: '2–0', say: 'two nil', note: 'Спортивный счёт: nil, не zero.' },
      { value: '0–0', say: 'nil-nil', note: 'Футбольный счёт.' }
    ]
  },
  {
    id: 'measure',
    title: 'Температура и меры',
    intro: 'После числа используем множественное число единицы, кроме 1. Минус — minus.',
    items: [
      { value: '20°C', say: 'twenty degrees Celsius', note: 'Degrees во множественном числе.' },
      { value: '-5°C', say: 'minus five degrees Celsius', note: 'Minus перед числом.' },
      { value: '1°C', say: 'one degree Celsius', note: 'Один градус — единственное число.' },
      { value: '5 km', say: 'five kilometres', note: 'Британское написание metre / kilometre.' },
      { value: '10 m', say: 'ten metres', note: 'Не «ten meter».' },
      { value: '6 ft', say: 'six feet', note: 'Foot → feet.' }
    ]
  }
];

export const NUMBER_STRESS = [
  { pair: '13 — 30', a: 'thirteen', aIpa: '/ˌθɜːˈtiːn/', b: 'thirty', bIpa: '/ˈθɜːti/' },
  { pair: '14 — 40', a: 'fourteen', aIpa: '/ˌfɔːˈtiːn/', b: 'forty', bIpa: '/ˈfɔːti/' },
  { pair: '15 — 50', a: 'fifteen', aIpa: '/ˌfɪfˈtiːn/', b: 'fifty', bIpa: '/ˈfɪfti/' },
  { pair: '16 — 60', a: 'sixteen', aIpa: '/ˌsɪkˈstiːn/', b: 'sixty', bIpa: '/ˈsɪksti/' },
  { pair: '17 — 70', a: 'seventeen', aIpa: '/ˌsevnˈtiːn/', b: 'seventy', bIpa: '/ˈsevnti/' },
  { pair: '18 — 80', a: 'eighteen', aIpa: '/ˌeɪˈtiːn/', b: 'eighty', bIpa: '/ˈeɪti/' },
  { pair: '19 — 90', a: 'nineteen', aIpa: '/ˌnaɪnˈtiːn/', b: 'ninety', bIpa: '/ˈnaɪnti/' }
];

export const QUIZZES = {
  years: {
    tag: 'Числительные',
    question: 'Как прочитать год 1905?',
    options: [
      { label: 'nineteen oh five', correct: true, explain: 'Верно. Год 1905 читается парами: nineteen + oh five. Это самый естественный вариант в тексте.' },
      { label: 'one thousand nine hundred and five', correct: false, explain: 'Слишком буквально и неестественно для года. Так можно прочитать число, но не дату.' },
      { label: 'nineteen five', correct: false, explain: 'Здесь пропущен звук «oh»: правильно nineteen oh five.' },
      { label: 'nineteen hundred five', correct: false, explain: 'Для 1905 нужен «oh», а не hundred. «Девятнадцать сотен» — это 1900.' }
    ]
  },
  stress: {
    tag: 'Ударение',
    question: 'Где ударение в слове comfortable?',
    options: [
      { label: '/ˈkʌmftəbl/', correct: true, explain: 'Верно: ударение на первый слог, три слога. KUMF-tuh-bl.' },
      { label: '/kʌmˈfɔːtəbl/', correct: false, explain: 'Так слово звучало бы с ударением на -for-. В реальной речи этот слог почти исчезает.' },
      { label: '/kʌmfəˈtɑːbl/', correct: false, explain: 'Это калька с русского «комфортабельный». Ударение должно быть на первом слоге.' },
      { label: '/kəmˈfəʊtəbl/', correct: false, explain: 'Нет: в первом слоге /ʌ/, а не /ə/; ударение на KUM-.' }
    ]
  },
  ed: {
    tag: 'Окончания',
    question: 'Какой звук у окончания -ed в слове watched?',
    options: [
      { label: '/t/', correct: true, explain: 'Верно. После глухого /tʃ/ окончание -ed звучит /t/, без отдельного слога.' },
      { label: '/d/', correct: false, explain: 'Звонкий /d/ был бы после звонкого согласного. Здесь последний звук /tʃ/ глухой.' },
      { label: '/ɪd/', correct: false, explain: 'Отдельный слог /ɪd/ появляется только после /t/ или /d/.' },
      { label: 'не читается', correct: false, explain: 'Окончание читается, но без гласного. Watched = /wɒtʃt/.' }
    ]
  },
  pairs: {
    tag: 'Смысл',
    question: 'Вы услышали «The farmer keeps ___». Какое слово нужно, если речь об овцах?',
    options: [
      { label: 'sheep /ʃiːp/', correct: true, explain: 'Верно: долгий /iː/ и овца. Ship /ʃɪp/ — корабль; ошибка меняет смысл.' },
      { label: 'ship /ʃɪp/', correct: false, explain: 'Ship — корабль. Для овцы нужно sheep с долгим /iː/.' },
      { label: 'cheap /tʃiːp/', correct: false, explain: 'Cheap — «дешёвый», и начинается с /tʃ/.' },
      { label: 'sheep, но можно и ship', correct: false, explain: 'Нет: это разные слова, и экзаменатор услышит разницу.' }
    ]
  },
  pause: {
    tag: 'Единство речи',
    question: 'Где логичная пауза? «In 1869, the first postcard was sent in Austria.»',
    options: [
      { label: 'После 1869', correct: true, explain: 'Верно. Запятая после вводного обстоятельства времени задаёт естественную границу смысловой группы.' },
      { label: 'После the', correct: false, explain: 'Артикль и существительное нельзя разрывать паузой.' },
      { label: 'После first', correct: false, explain: 'First относится к postcard; пауза разорвала бы словосочетание.' },
      { label: 'Паузы не нужны вообще', correct: false, explain: 'Короткая пауза после даты помогает слушателю и соответствует пунктуации.' }
    ]
  },
  intonation: {
    tag: 'Тон',
    question: 'Какой тон у утверждения «The museum opens at nine.»?',
    options: [
      { label: 'Падающий ↘', correct: true, explain: 'Верно. Утверждение завершается падением тона — спокойно и уверенно.' },
      { label: 'Восходящий ↗', correct: false, explain: 'Восходящий тон сделал бы утверждение похожим на вопрос или намёк.' },
      { label: 'Резко восходящий на последнем слоге', correct: false, explain: 'Это типичная «вопросительная» интонация, которой не должно быть в утверждении.' },
      { label: 'Без изменения высоты', correct: false, explain: 'Полностью ровный тон звучит механически. Нужное падение — часть смысла.' }
    ]
  }
};

export const CHECKLIST = [
  'Нашёл(ла) все числа, даты и имена собственные',
  'Отметил(а) ударения в длинных интернациональных словах',
  'Разделил(а) текст на смысловые группы, а не на отдельные слова',
  'Проверил(а) окончания -ed и -s: /t/, /d/, /ɪd/ и /s/, /z/, /ɪz/',
  'Прочитал(а) текст про себя один раз целиком',
  'Дышу ровно, начинаю в спокойном темпе',
  'Не делаю паузы после артиклей, предлогов и между прилагательным и существительным',
  'Финальные утверждения завершаю падением тона'
];

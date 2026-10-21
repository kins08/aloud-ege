export const WORD_CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'consonants', label: 'Согласные' },
  { id: 'vowels', label: 'Гласные' },
  { id: 'stress', label: 'Ударение' },
  { id: 'silent', label: 'Немые буквы' },
  { id: 'endings', label: 'Окончания' },
  { id: 'loanwords', label: 'Заимствования' },
  { id: 'places', label: 'Имена и места' }
];

export const WORD_BANK = [
  { word: 'comfortable', ipa: '/ˈkʌmftəbl/', ru: 'удобный', wrong: 'ком-фор-тэ-бл', note: 'Три слога, ударение на первый; гласный после m почти исчезает: KUMF-tuh-bl.', cat: 'stress', top: 1 },
  { word: 'clothes', ipa: '/kləʊðz/', ru: 'одежда', wrong: 'клотс / клоузес', note: 'Один слог. Звонкий /ð/ сразу переходит в /z/; никакого отдельного «-ес».', cat: 'consonants', top: 2 },
  { word: 'months', ipa: '/mʌnθs/', ru: 'месяцы', wrong: 'мантс / мансэс', note: 'В конце слитный кластер /θs/. Язык между зубами, затем сразу /s/.', cat: 'consonants', top: 3 },
  { word: 'vegetables', ipa: '/ˈvedʒtəblz/', ru: 'овощи', wrong: 'ве-ге-та-блс', note: 'Ударение на первый слог, всего 3 слога: VEDGE-tuh-blz. Второй e не читается.', cat: 'stress', top: 4 },
  { word: 'chocolate', ipa: '/ˈtʃɒklət/', ru: 'шоколад', wrong: 'чо-ко-лейт', note: 'Два слога: CHOK-luht. Средний o редуцирован, финального /eɪ/ нет.', cat: 'loanwords', top: 5 },
  { word: 'favourite', ipa: '/ˈfeɪvərɪt/', ru: 'любимый', wrong: 'фа-во-рит', note: 'Три слога, ударение на первый; в середине слышится слабое /ə/: FAY-vuh-rit.', cat: 'stress', top: 6 },
  { word: 'recipe', ipa: '/ˈresəpi/', ru: 'рецепт (блюда)', wrong: 'ре-сип / ре-сайп', note: 'Три слога: RES-uh-pee. Конечная e читается /iː/.', cat: 'loanwords', top: 7 },
  { word: 'receipt', ipa: '/rɪˈsiːt/', ru: 'чек, квитанция', wrong: 'ре-сипт', note: 'Немая p; ударение на второй слог, долгий /iː/.', cat: 'silent', top: 8 },
  { word: 'queue', ipa: '/kjuː/', ru: 'очередь', wrong: 'кве-ве', note: 'Один слог /kjuː/. Четыре буквы после q не произносятся.', cat: 'loanwords', top: 9 },
  { word: 'island', ipa: '/ˈaɪlənd/', ru: 'остров', wrong: 'из-ланд', note: 'Немая s; первый слог — /aɪ/: EYE-luhnd.', cat: 'silent', top: 10 },
  { word: 'environment', ipa: '/ɪnˈvaɪrənmənt/', ru: 'окружающая среда', wrong: 'эн-вай-рон-мент', note: 'Ударение на второй слог; /aɪ/ в -vi-, финал — /mənt/, не «мент» с русским е.', cat: 'stress', top: 11 },
  { word: 'three', ipa: '/θriː/', ru: 'три', wrong: 'три / сри', note: 'Кластер /θr/: язык между зубами, затем сразу r. С tree /triː/ не путать.', cat: 'consonants', top: 12, critical: true },

  { word: 'answer', ipa: '/ˈɑːnsə/', ru: 'ответ', wrong: 'ан-свер', note: 'Немая w; широкий /ɑː/: AHN-suh.', cat: 'silent' },
  { word: 'Wednesday', ipa: '/ˈwenzdeɪ/', ru: 'среда', wrong: 'вед-нес-дей', note: 'Немые d и e: WENZ-day. Первый слог не «вед».', cat: 'silent' },
  { word: 'nature', ipa: '/ˈneɪtʃə/', ru: 'природа', wrong: 'на-ту-ре', note: 'Два слога: NAY-chuh. -ture в этом слове звучит /tʃə/.', cat: 'vowels' },
  { word: 'future', ipa: '/ˈfjuːtʃə/', ru: 'будущее', wrong: 'фу-ту-ре', note: 'FYOO-chuh; начинается с /fj/, -ture — /tʃə/.', cat: 'vowels' },
  { word: 'beautiful', ipa: '/ˈbjuːtɪfl/', ru: 'красивый', wrong: 'бьюти-фул', note: 'Три слога, ударение на первый: BYOO-ti-fl. Финальный слог без гласного.', cat: 'stress' },
  { word: 'tourism', ipa: '/ˈtʊərɪzəm/', ru: 'туризм', wrong: 'ту-ризм', note: 'Три слога, ударение на первый: TOO-uh-riz-um. Не «туризм» с русским ударением.', cat: 'stress' },
  { word: 'souvenir', ipa: '/ˌsuːvəˈnɪə/', ru: 'сувенир', wrong: 'су-ве-нир', note: 'Ударение на последний слог: soo-vuh-NEER. Средний слог редуцирован.', cat: 'loanwords' },
  { word: 'restaurant', ipa: '/ˈrestrɒnt/', ru: 'ресторан', wrong: 'рес-то-рант', note: 'Британский вариант: два слога, RES-tront. Второй слог почти проглочен.', cat: 'loanwords' },
  { word: 'interesting', ipa: '/ˈɪntrəstɪŋ/', ru: 'интересный', wrong: 'ин-те-рес-тинг', note: 'Три слога: IN-truh-sting. Средний e не произносится.', cat: 'stress' },
  { word: 'usually', ipa: '/ˈjuːʒuəli/', ru: 'обычно', wrong: 'юзуалли', note: 'Звук /ʒ/ в середине, как в русском «ж» без смычки: YOO-zhoo-uh-lee.', cat: 'consonants' },
  { word: 'pollution', ipa: '/pəˈluːʃn/', ru: 'загрязнение', wrong: 'пол-лу-ти-он', note: 'Ударение на -lu-; -tion — /ʃn/. Не «полюшн» с /juː/.', cat: 'stress' },
  { word: 'technology', ipa: '/tekˈnɒlədʒi/', ru: 'технологии', wrong: 'тех-но-ло-ги', note: 'Ударение на -nol-; ch звучит /k/, финал -gy — /dʒi/.', cat: 'stress' },
  { word: 'scientific', ipa: '/ˌsaɪənˈtɪfɪk/', ru: 'научный', wrong: 'сайен-тифик', note: 'Ударение на -tif-; -ic всегда тянет ударение к себе.', cat: 'stress' },
  { word: 'education', ipa: '/ˌedʒuˈkeɪʃn/', ru: 'образование', wrong: 'эду-кейшн', note: 'Ударение на -ca-; /dʒ/ в начале: ed-joo-KAY-shn.', cat: 'stress' },
  { word: 'opportunity', ipa: '/ˌɒpəˈtjuːnəti/', ru: 'возможность', wrong: 'оппор-тюнити', note: 'Пять слогов, ударение на -tu-: op-uh-TYOO-nuh-tee.', cat: 'stress' },
  { word: 'society', ipa: '/səˈsaɪəti/', ru: 'общество', wrong: 'со-си-ти', note: 'Ударение на -ci-: suh-SY-uh-tee. Первый слог редуцирован.', cat: 'stress' },
  { word: 'museum', ipa: '/mjuˈziːəm/', ru: 'музей', wrong: 'му-зей', note: 'Начинается с /mj/; ударение на -se-: myoo-ZEE-um.', cat: 'stress' },
  { word: 'theatre', ipa: '/ˈθɪətə/', ru: 'театр', wrong: 'те-атр', note: 'Британское написание и произношение: THEE-uh-tuh. Начинается с /θ/.', cat: 'consonants' },
  { word: 'through', ipa: '/θruː/', ru: 'через', wrong: 'тхроуг', note: 'Один слог /θruː/; -ough здесь читается как /uː/.', cat: 'consonants' },
  { word: 'though', ipa: '/ðəʊ/', ru: 'хотя', wrong: 'тхоуг', note: 'Один слог /ðəʊ/; звонкий /ð/ и дифтонг /əʊ/.', cat: 'consonants' },
  { word: 'thought', ipa: '/θɔːt/', ru: 'мысль; думал', wrong: 'тхот', note: 'Один слог /θɔːt/; -ought читается /ɔːt/.', cat: 'consonants' },
  { word: 'thorough', ipa: '/ˈθʌrə/', ru: 'тщательный', wrong: 'тхо-роугх', note: 'Два слога: THUH-ruh. -ough в конце редуцируется, звука /g/ нет.', cat: 'consonants' },
  { word: 'weather', ipa: '/ˈweðə/', ru: 'погода', wrong: 'ветер', note: 'Начинается с /w/, а th — звонкий /ð/. Не путать с whether /ˈweðə/ — они звучат одинаково.', cat: 'consonants' },
  { word: 'world', ipa: '/wɜːld/', ru: 'мир', wrong: 'ворлд', note: 'Начинается с округлённого /w/, а не с /v/; гласный — /ɜː/.', cat: 'vowels' },
  { word: 'work', ipa: '/wɜːk/', ru: 'работать', wrong: 'ворк', note: 'Начинается с /w/, не с /v/. Гласный /ɜː/.', cat: 'vowels', critical: true },
  { word: 'walk', ipa: '/wɔːk/', ru: 'идти пешком', wrong: 'волк', note: 'Немая l; долгий /ɔː/: WAWK. Не путайте с work — это меняет смысл.', cat: 'silent', critical: true },
  { word: 'live', ipa: '/lɪv/', ru: 'жить', wrong: 'лив (как leave)', note: 'Глагол: короткий /ɪ/ и звонкий /v/. Leave /liːv/ — «уезжать, оставлять».', cat: 'vowels', critical: true },
  { word: 'leave', ipa: '/liːv/', ru: 'уезжать; оставлять', wrong: 'лив (как live)', note: 'Долгий /iː/. Проверьте длительность: leave ≠ live.', cat: 'vowels', critical: true },
  { word: 'full', ipa: '/fʊl/', ru: 'полный', wrong: 'фул (как fool)', note: 'Короткий /ʊ/: FUHL. Fool /fuːl/ — «дурак», долгий /uː/.', cat: 'vowels', critical: true },
  { word: 'fool', ipa: '/fuːl/', ru: 'дурак', wrong: 'фул (как full)', note: 'Долгий /uː/: FOO-l. С full /fʊl/ не путать.', cat: 'vowels', critical: true },
  { word: 'ship', ipa: '/ʃɪp/', ru: 'корабль', wrong: 'шип (как sheep)', note: 'Короткий /ɪ/. Sheep /ʃiːp/ — «овца».', cat: 'vowels', critical: true },
  { word: 'sheep', ipa: '/ʃiːp/', ru: 'овца', wrong: 'шип (как ship)', note: 'Долгий /iː/. Ship /ʃɪp/ — «корабль».', cat: 'vowels', critical: true },
  { word: 'bad', ipa: '/bæd/', ru: 'плохой', wrong: 'бэд (как bed)', note: 'Широкий /æ/: рот открыт, язык внизу. Bed /bed/ — «кровать».', cat: 'vowels', critical: true },
  { word: 'bed', ipa: '/bed/', ru: 'кровать', wrong: 'бэд (как bad)', note: 'Короткий /e/. Bad /bæd/ — «плохой».', cat: 'vowels', critical: true },
  { word: 'man', ipa: '/mæn/', ru: 'мужчина', wrong: 'мэн (как men)', note: 'Единственное число: /æ/. Men /men/ — множественное.', cat: 'vowels', critical: true },
  { word: 'men', ipa: '/men/', ru: 'мужчины', wrong: 'мэн (как man)', note: 'Множественное число: /e/. Man /mæn/ — один мужчина.', cat: 'vowels', critical: true },
  { word: 'think', ipa: '/θɪŋk/', ru: 'думать', wrong: 'синк', note: 'Начинается с /θ/, а не /s/; заканчивается /ŋk/.', cat: 'consonants', critical: true },
  { word: 'sink', ipa: '/sɪŋk/', ru: 'раковина; тонуть', wrong: 'синк (как think)', note: 'Начинается с /s/. Think /θɪŋk/ — «думать».', cat: 'consonants', critical: true },
  { word: 'tree', ipa: '/triː/', ru: 'дерево', wrong: 'сри / три', note: 'Кластер /tr/, без /θ/. Three /θriː/ — «три».', cat: 'consonants', critical: true },
  { word: 'west', ipa: '/west/', ru: 'запад', wrong: 'вест', note: 'Губной /w/: губы округлены, зубы не касаются губы. Vest /vest/ — «жилет».', cat: 'consonants', critical: true },
  { word: 'vest', ipa: '/vest/', ru: 'жилет', wrong: 'вест (как west)', note: 'Начинается с /v/: верхние зубы касаются нижней губы.', cat: 'consonants', critical: true },
  { word: 'heart', ipa: '/hɑːt/', ru: 'сердце', wrong: 'хёрт / хат', note: 'Долгий /ɑː/, без /r/ после гласного в британском варианте: HAAT.', cat: 'vowels', critical: true },
  { word: 'hut', ipa: '/hʌt/', ru: 'хижина', wrong: 'хат (как heart)', note: 'Короткий /ʌ/: HUT. Heart /hɑːt/ — «сердце».', cat: 'vowels', critical: true },
  { word: 'colleague', ipa: '/ˈkɒliːɡ/', ru: 'коллега', wrong: 'колле-аг', note: 'Два слога: KOL-eeg. Финальная ue не даёт отдельного слога.', cat: 'loanwords' },
  { word: 'career', ipa: '/kəˈrɪə/', ru: 'карьера', wrong: 'карьер', note: 'Ударение на второй слог, три слога: kuh-REER.', cat: 'stress' },
  { word: 'engineer', ipa: '/ˌendʒɪˈnɪə/', ru: 'инженер', wrong: 'энжинер', note: 'Ударение на последний слог: en-ji-NEER.', cat: 'stress' },
  { word: 'exhibition', ipa: '/ˌeksɪˈbɪʃn/', ru: 'выставка', wrong: 'экзибишн', note: 'Четыре слога, ударение на -bi-: ek-si-BI-shn.', cat: 'stress' },
  { word: 'photograph', ipa: '/ˈfəʊtəɡrɑːf/', ru: 'фотография (снимок)', wrong: 'фотограф', note: 'Ударение на первый слог: FOH-tuh-graaf.', cat: 'stress' },
  { word: 'photography', ipa: '/fəˈtɒɡrəfi/', ru: 'фотография (искусство)', wrong: 'фотографи', note: 'Ударение на второй слог: fuh-TOG-ruh-fee.', cat: 'stress' },
  { word: 'photographer', ipa: '/fəˈtɒɡrəfə/', ru: 'фотограф', wrong: 'фотографэр', note: 'Ударение на -tog-: fuh-TOG-ruh-fuh.', cat: 'stress' },
  { word: 'economy', ipa: '/ɪˈkɒnəmi/', ru: 'экономика', wrong: 'экономы', note: 'Ударение на -con-: ih-KON-uh-mee.', cat: 'stress' },
  { word: 'economic', ipa: '/ˌiːkəˈnɒmɪk/', ru: 'экономический', wrong: 'экономик', note: 'Ударение на -nom-: ee-kuh-NOM-ik. Не путать с economy.', cat: 'stress' },
  { word: 'library', ipa: '/ˈlaɪbrəri/', ru: 'библиотека', wrong: 'лайбери', note: 'Три слога в британском варианте: LY-bruh-ree. Не «лайбрери» с четырьмя.', cat: 'stress' },
  { word: 'February', ipa: '/ˈfebruəri/', ru: 'февраль', wrong: 'феб-ру-ари', note: 'Первый r часто редуцируется: FEB-roo-uh-ree. Не «февраль».', cat: 'stress' },
  { word: 'autumn', ipa: '/ˈɔːtəm/', ru: 'осень', wrong: 'аутумн', note: 'Немая n; два слога, ударение на первый: AW-tuhm.', cat: 'silent' },
  { word: 'climb', ipa: '/klaɪm/', ru: 'взбираться', wrong: 'климб', note: 'Немая b; дифтонг /aɪ/: KLYM.', cat: 'silent' },
  { word: 'doubt', ipa: '/daʊt/', ru: 'сомнение', wrong: 'доубт', note: 'Немая b; /daʊt/, как в out.', cat: 'silent' },
  { word: 'listen', ipa: '/ˈlɪsn/', ru: 'слушать', wrong: 'лис-тен', note: 'Немая t; второй слог — просто /sn/: LISS-uhn.', cat: 'silent' },
  { word: 'castle', ipa: '/ˈkɑːsl/', ru: 'замок', wrong: 'кас-тл', note: 'Немая t; /ɑː/: KAH-sl.', cat: 'silent' },
  { word: 'Christmas', ipa: '/ˈkrɪsməs/', ru: 'Рождество', wrong: 'кристмас', note: 'Немая t; два слога: KRIS-muhs.', cat: 'silent' },
  { word: 'hour', ipa: '/ˈaʊə/', ru: 'час', wrong: 'хауэр', note: 'Немая h; начинается с гласного /aʊə/.', cat: 'silent' },
  { word: 'honest', ipa: '/ˈɒnɪst/', ru: 'честный', wrong: 'хонест', note: 'Немая h; ON-ist.', cat: 'silent' },
  { word: 'half', ipa: '/hɑːf/', ru: 'половина', wrong: 'халф', note: 'Немая l; долгий /ɑː/: HAAF.', cat: 'silent' },
  { word: 'calm', ipa: '/kɑːm/', ru: 'спокойный', wrong: 'калм', note: 'Немая l; долгий /ɑː/: KAAM.', cat: 'silent' },
  { word: 'psychology', ipa: '/saɪˈkɒlədʒi/', ru: 'психология', wrong: 'психология', note: 'Немая p; начинается с /s/: sy-KOL-uh-jee.', cat: 'silent' },
  { word: 'Edinburgh', ipa: '/ˈedɪnbərə/', ru: 'Эдинбург', wrong: 'эдинбург', note: 'Британское произношение: ED-in-buh-ruh. Финальный -gh не читается.', cat: 'places' },
  { word: 'Thames', ipa: '/temz/', ru: 'Темза', wrong: 'тэймс', note: 'Один слог /temz/; th звучит как /t/, а s — звонкий /z/.', cat: 'places' },
  { word: 'Greenwich', ipa: '/ˈɡrenɪtʃ/', ru: 'Гринвич', wrong: 'гринвич', note: 'Пишется Green-, но произносится /gren-/: GREN-itch.', cat: 'places' },
  { word: 'Leicester', ipa: '/ˈlestə/', ru: 'Лестер', wrong: 'лейсестер', note: 'Два слога: LES-tuh. -cester читается /stə/.', cat: 'places' },
  { word: 'Cambridge', ipa: '/ˈkeɪmbrɪdʒ/', ru: 'Кембридж', wrong: 'кембридж', note: 'КЕЙМ-бридж; финальный -bridge — /brɪdʒ/.', cat: 'places' },
  { word: 'Oxford', ipa: '/ˈɒksfəd/', ru: 'Оксфорд', wrong: 'оксфорд', note: 'Первый слог — /ɒks/, финал — /fəd/.', cat: 'places' },
  { word: 'Birmingham', ipa: '/ˈbɜːmɪŋəm/', ru: 'Бирмингем', wrong: 'бирмингхам', note: 'Три слога: BUR-ming-um. Немая h в конце.', cat: 'places' },
  { word: 'Glasgow', ipa: '/ˈɡlɑːzɡəʊ/', ru: 'Глазго', wrong: 'глазгов', note: 'Первый гласный — /ɑː/, финал — /ɡəʊ/: GLAHZ-goh.', cat: 'places' },
  { word: 'Europe', ipa: '/ˈjʊərəp/', ru: 'Европа', wrong: 'европа', note: 'Два слога, начинается с /j/: YOO-ruhp. Не «Европа» по-русски.', cat: 'places' },
  { word: 'southern', ipa: '/ˈsʌðən/', ru: 'южный', wrong: 'саузерн', note: 'Звонкий /ð/; первый гласный — /ʌ/, а не /aʊ/: SUTH-uhn.', cat: 'consonants' },
  { word: 'northern', ipa: '/ˈnɔːðən/', ru: 'северный', wrong: 'нортхерн', note: 'Звонкий /ð/; два слога: NOR-thuhn.', cat: 'consonants' },
  { word: 'species', ipa: '/ˈspiːʃiːz/', ru: 'вид, виды', wrong: 'спесиес', note: 'Два слога: SPEE-sheez. Форма не меняется во множественном числе.', cat: 'consonants' },
  { word: 'worked', ipa: '/wɜːkt/', ru: 'работал', wrong: 'воркед', note: '-ed после глухого /k/ — /t/, без отдельного слога.', cat: 'endings' },
  { word: 'played', ipa: '/pleɪd/', ru: 'играл', wrong: 'плейед', note: '-ed после гласного — /d/, без отдельного слога.', cat: 'endings' },
  { word: 'needed', ipa: '/ˈniːdɪd/', ru: 'нуждался', wrong: 'нидед', note: '-ed после /d/ — отдельный слог /ɪd/.', cat: 'endings' },
  { word: 'visited', ipa: '/ˈvɪzɪtɪd/', ru: 'посетил', wrong: 'визитед', note: '-ed после /t/ — отдельный слог /ɪd/: VIZ-i-tid.', cat: 'endings' },
  { word: 'watched', ipa: '/wɒtʃt/', ru: 'смотрел', wrong: 'вотчед', note: '-ed после /tʃ/ — /t/: WOCHT. Один слог.', cat: 'endings' }
];

export const TOP_ERRORS = WORD_BANK.filter(w => w.top).sort((a, b) => a.top - b.top);

export const MINIMAL_PAIRS = [
  {
    a: { word: 'ship', ipa: '/ʃɪp/', ru: 'корабль' },
    b: { word: 'sheep', ipa: '/ʃiːp/', ru: 'овца' },
    why: 'Короткий /ɪ/ против долгого /iː/. В беглой речи разница всё равно должна слышаться.'
  },
  {
    a: { word: 'live', ipa: '/lɪv/', ru: 'жить' },
    b: { word: 'leave', ipa: '/liːv/', ru: 'уезжать' },
    why: 'Длительность гласного меняет глагол. Это ошибка, искажающая смысл.'
  },
  {
    a: { word: 'work', ipa: '/wɜːk/', ru: 'работать' },
    b: { word: 'walk', ipa: '/wɔːk/', ru: 'идти' },
    why: 'Разные гласные и наличие/отсутствие /l/ на письме. Смысл меняется полностью.'
  },
  {
    a: { word: 'full', ipa: '/fʊl/', ru: 'полный' },
    b: { word: 'fool', ipa: '/fuːl/', ru: 'дурак' },
    why: 'Короткий /ʊ/ против долгого /uː/ — классическая пара, которая часто звучит одинаково.'
  },
  {
    a: { word: 'bad', ipa: '/bæd/', ru: 'плохой' },
    b: { word: 'bed', ipa: '/bed/', ru: 'кровать' },
    why: 'Для /æ/ рот шире, язык ниже. Русское «э» тянет к /e/.'
  },
  {
    a: { word: 'man', ipa: '/mæn/', ru: 'мужчина' },
    b: { word: 'men', ipa: '/men/', ru: 'мужчины' },
    why: 'Единственное и множественное число различаются только гласным.'
  },
  {
    a: { word: 'think', ipa: '/θɪŋk/', ru: 'думать' },
    b: { word: 'sink', ipa: '/sɪŋk/', ru: 'раковина' },
    why: 'Язык между зубами для /θ/; замена на /s/ — типичная ошибка русскоязычных.'
  },
  {
    a: { word: 'three', ipa: '/θriː/', ru: 'три' },
    b: { word: 'tree', ipa: '/triː/', ru: 'дерево' },
    why: 'Кластер /θr/ требует языка между зубами; /tr/ — альвеолярный.'
  },
  {
    a: { word: 'west', ipa: '/west/', ru: 'запад' },
    b: { word: 'vest', ipa: '/vest/', ru: 'жилет' },
    why: '/w/ — губы округлены, /v/ — зубы на нижней губе. Не подменяйте один другим.'
  },
  {
    a: { word: 'heart', ipa: '/hɑːt/', ru: 'сердце' },
    b: { word: 'hut', ipa: '/hʌt/', ru: 'хижина' },
    why: 'Долгий /ɑː/ против короткого /ʌ/. В беглом чтении легко «съехать» в русское «а».'
  }
];

export const ACCENT_HABITS = [
  {
    num: '01',
    title: 'Замена /θ/ и /ð/ на /с/, /з/, /т/ или /ф/',
    body: 'Кончик языка должен быть между зубами. Для /θ/ воздух идёт без голоса, для /ð/ — со голосом. Потренируйтесь на парах think — sink, three — tree, this — zis.',
    tag: 'Согласные'
  },
  {
    num: '02',
    title: 'Путаница /w/ и /v/',
    body: 'Для /w/ губы округлены, зубы не касаются нижней губы. Для /v/ верхние зубы мягко касаются губы. West и vest — разные слова.',
    tag: 'Согласные'
  },
  {
    num: '03',
    title: 'Твёрдая g в -ing',
    body: 'В окончании -ing нет отдельного /ɡ/: morning — /ˈmɔːnɪŋ/, reading — /ˈriːdɪŋ/. Задняя часть языка поднимается к нёбу.',
    tag: 'Согласные'
  },
  {
    num: '04',
    title: 'Русское «э» вместо /æ/',
    body: 'Для /æ/ откройте рот шире, язык лежит ниже. Bad — /bæd/, не «бэд». Полезно сравнивать bad — bed, man — men.',
    tag: 'Гласные'
  },
  {
    num: '05',
    title: 'Лишняя «ё» в /ɜː/',
    body: 'Work, world, service, girl — это /ɜː/, без начального /j/ и без русской «ё». Губы нейтральны, язык в середине.',
    tag: 'Гласные'
  },
  {
    num: '06',
    title: 'Вставка гласного в кластеры',
    body: 'Street, spring, texts, months — звуки идут подряд, без «сы-т-реет». Замедляйте слово, но не добавляйте гласный между согласными.',
    tag: 'Кластеры'
  },
  {
    num: '07',
    title: 'Оглушение финальных согласных',
    body: 'Dog — не «док», eyes — не «айс». В английском финальный звонкий может быть частично оглушён, но противопоставление dog /ɡ/ — dock /k/ сохраняется.',
    tag: 'Согласные'
  },
  {
    num: '08',
    title: 'Послоговое чтение вместо ритма',
    body: 'Английский стремится к ударным «островкам» и слабым слогам между ними. Не делайте все слоги одинаково чёткими: comFORtable, toGETHER, imPORtant.',
    tag: 'Ритм'
  },
  {
    num: '09',
    title: 'Слишком чёткое /r/ и /l/ на концах',
    body: 'В британском варианте конечное -er обычно звучит /ə/, а тёмное l не превращается в русское «л». Не утрируйте, но и не проглатывайте согласные.',
    tag: 'Согласные'
  },
  {
    num: '10',
    title: 'Русское ударение в интернациональных словах',
    body: 'Economy, technology, photograph, exhibition — ударение не там, где в русском. Учите слово сразу с ударным слогом и коротким примером.',
    tag: 'Ударение'
  }
];

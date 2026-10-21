export const TEXTS = [
  {
    id: 'crows',
    title: 'The Quiet Intelligence of Crows',
    titleRu: 'Тихий интеллект ворон',
    topic: 'Наука',
    level: 'B1+',
    model: true,
    body: `Crows are among the cleverest birds. For a long time, people believed that their behaviour was a result of instinct. However, experiments have shown that crows can solve problems that would challenge a young child. In one study, scientists placed a piece of food at the bottom of a narrow tube filled with water. The crow could not reach it with its beak. After a few moments, the bird began dropping small stones into the tube. The water rose, and the food floated within reach.

Crows also remember human faces. Researchers in Seattle wore masks while catching and marking birds. Later, when the same masks appeared in the street, the crows recognised them and warned each other. The memory lasted for years.

Such discoveries have changed our view of intelligence. It is not limited to mammals or to animals that live in large social groups. Even a common crow, often ignored by city dwellers, can plan, learn and adapt.`,
    traps: [
      { word: 'behaviour', ipa: '/bɪˈheɪvjə/', note: 'Британское написание и произношение: три слога, ударение на второй. Не «бехавиор».' },
      { word: 'instinct', ipa: '/ˈɪnstɪŋkt/', note: 'Ударение на первый слог; конечный кластер /-ŋkt/ не «разбавляйте» гласным.' },
      { word: 'challenge', ipa: '/ˈtʃælɪndʒ/', note: 'Первый слог — /tʃæl/, а не «чал-лендж» с двумя чётками слогами.' },
      { word: 'narrow', ipa: '/ˈnærəʊ/', note: 'Первый гласный — /æ/, второй слог почти редуцирован: NAR-uh.' },
      { word: 'beak', ipa: '/biːk/', note: 'Долгий /iː/. Не путайте с back /bæk/.' },
      { word: 'Seattle', ipa: '/siˈætl/', note: 'Ударение на второй слог, финальный /t/ лёгкий: si-AT-l.' },
      { word: 'recognised', ipa: '/ˈrekəɡnaɪzd/', note: 'Ударение на первый слог, окончание звучит как /-d/, не отдельное «-эд».' },
      { word: 'mammals', ipa: '/ˈmæmlz/', note: 'Два слога: MAM-malz. Не «маммалс» с тремя слогами.' },
      { word: 'social', ipa: '/ˈsəʊʃl/', note: 'Первый гласный — /əʊ/, финал — /ʃl/, без лишнего гласного.' },
      { word: 'adapt', ipa: '/əˈdæpt/', note: 'Ударение на второй слог; финальный /pt/ без вставки гласного.' }
    ],
    modelNotes: {
      verdict: '1 балл',
      why: [
        'Паузы стоят только между смысловыми группами; внутри них речь слитная.',
        'Термины behaviour, instinct, intelligence и слова с окончанием -ed произнесены без потери звуков.',
        'Утверждения завершаются спокойным падающим тоном — нет «вопросительной» интонации.',
        'Темп ровный: около 100–108 слов в минуту, к финалу не ускоряется.'
      ],
      watch: [
        'Не «разбирайте» слово behaviour по слогам — в потоке оно звучит как /bɪˈheɪvjə/.',
        'В recognised окончание -ed не превращается в отдельный слог.',
        'Не делайте паузу после артикля a или предлога of.'
      ],
      markup: '*Crows* are among the cleverest birds in the world. / For a long time, / people believed that their *behaviour* was simply a result of *instinct*. / However, / experiments have shown that crows can *solve* problems / that would *challenge* a young child. / In one famous study, / scientists placed a piece of food at the bottom of a narrow tube filled with water.'
    }
  },
  {
    id: 'venice',
    title: 'A City Built on Water',
    titleRu: 'Город, построенный на воде',
    topic: 'Города',
    level: 'B1',
    model: false,
    body: `Venice is one of the most unusual cities in Europe. It spreads across more than one hundred small islands in a lagoon on the north-east coast of Italy. Instead of streets, there are about one hundred and fifty canals, and the city is connected by some four hundred bridges. For centuries, people in Venice have travelled by boat rather than by car.

The city began in the fifth century, when families escaped from attacks on the mainland. They built their homes on wooden piles driven into the mud. Over time, the piles became hard, and many buildings still stand today. The famous Piazza San Marco is often flooded in autumn, when high tides push seawater into the streets.

Modern Venice faces a difficult choice. It must protect its unique heritage and reduce the pressure of millions of visitors every year. Walking through its quiet side streets early in the morning, you can still sense its old, mysterious beauty.`,
    traps: [
      { word: 'Venice', ipa: '/ˈvenɪs/', note: 'Ударение на первый слог, финальный звук — /s/, а не «Венеция».' },
      { word: 'unusual', ipa: '/ʌnˈjuːʒuəl/', note: 'Звук /ʒ/ в середине; ударение на второй слог.' },
      { word: 'Europe', ipa: '/ˈjʊərəp/', note: 'Первый звук /j/; два слога, а не «Европа» с четырьмя.' },
      { word: 'lagoon', ipa: '/ləˈɡuːn/', note: 'Ударение на второй слог, долгий /uː/.' },
      { word: 'canals', ipa: '/kəˈnælz/', note: 'Ударение на второй слог; /æ/ и звонкий /z/ в конце.' },
      { word: 'fifth', ipa: '/fɪfθ/', note: 'Кластер /fθ/ слитный; не «фифс» и не «фифт».' },
      { word: 'piles', ipa: '/paɪlz/', note: 'Дифтонг /aɪ/ и звонкий финальный /z/.' },
      { word: 'Piazza San Marco', ipa: '/piˈætsə sæn ˈmɑːkəʊ/', note: 'Итальянское название: Piat-za, ударение в Marco на первый слог.' },
      { word: 'autumn', ipa: '/ˈɔːtəm/', note: 'Немая n; первый звук — долгий /ɔː/.' },
      { word: 'flooded', ipa: '/ˈflʌdɪd/', note: 'Первый гласный — /ʌ/, окончание -ed — отдельный слог /ɪd/ после /d/.' },
      { word: 'heritage', ipa: '/ˈherɪtɪdʒ/', note: 'Ударение на первый слог; звук /dʒ/ в конце.' },
      { word: 'mysterious', ipa: '/mɪˈstɪəriəs/', note: 'Ударение на слог -steer-, не «мистериоус».' }
    ]
  },
  {
    id: 'night-train',
    title: 'The Return of the Night Train',
    titleRu: 'Возвращение ночного поезда',
    topic: 'Путешествия',
    level: 'B1+',
    model: false,
    body: `For decades, night trains seemed to belong to the past. Cheap flights had turned Europe into a continent of short journeys, and many railway companies stopped running sleeper services. In 2021, however, something unexpected happened: several European countries announced plans to bring night trains back.

Travelling by sleeper is very different from travelling by plane. A passenger may board a train in Vienna in the evening, have a light dinner, fall asleep while the fields and mountains pass in the dark, and arrive in Paris after fourteen hours. The whole journey becomes part of the holiday rather than a tiring interruption.

Night trains also have an environmental advantage. A train journey between two cities can produce up to seventy per cent less carbon dioxide than the same trip by air. This is why several new routes have opened in recent years. Prices are often higher than plane tickets, though, and building a successful network will take both money and patience.`,
    traps: [
      { word: 'decades', ipa: '/ˈdekeɪdz/', note: 'Ударение на первый слог. Звонкий /z/ в конце.' },
      { word: 'Europe', ipa: '/ˈjʊərəp/', note: 'Два слога; начинается с /j/.' },
      { word: 'sleeper', ipa: '/ˈsliːpə/', note: 'Долгий /iː/, финальное -er — /ə/.' },
      { word: '2021', ipa: '/ˌtwenti ˈtwenti-wʌn/', note: 'Год чаще всего: twenty twenty-one. Не «две тысячи двадцать один» по-английски.' },
      { word: 'unexpected', ipa: '/ˌʌnɪkˈspektɪd/', note: 'Ударение на -spect-; окончание -ed — /ɪd/.' },
      { word: 'Vienna', ipa: '/viˈenə/', note: 'Ударение на второй слог: vi-EN-na.' },
      { word: 'fourteen', ipa: '/ˌfɔːˈtiːn/', note: 'Ударение на второй слог. Не путайте с forty /ˈfɔːti/.' },
      { word: 'environmental', ipa: '/ɪnˌvaɪrənˈmentl/', note: 'Ударение на -men-; пять слогов, без «энвайроментал» с лишним слогом.' },
      { word: 'seventy', ipa: '/ˈsevnti/', note: 'Три слога, ударение на первый. Не «севенти» с чётким /e/ в середине.' },
      { word: 'carbon dioxide', ipa: '/ˌkɑːbən daɪˈɒksaɪd/', note: 'В dioxide ударение на -ox-. Не «диоксид» с русским ударением.' },
      { word: 'routes', ipa: '/ruːts/', note: 'Британский вариант — /uː/; финальный /ts/ слитный.' },
      { word: 'patience', ipa: '/ˈpeɪʃns/', note: 'Ударение на первый слог; -tience звучит как /ʃns/.' }
    ]
  },
  {
    id: 'names',
    title: 'Why We Forget Names',
    titleRu: 'Почему мы забываем имена',
    topic: 'Психология',
    level: 'B1',
    model: false,
    body: `People can remember a face long after they have forgotten the name that goes with it. This is because our brains are better at processing images than sounds. A familiar face is stored as a complex picture with many details, while a name is short information without a strong visual connection.

Scientists believe that adults may know twenty thousand faces, though we cannot remember all of them. In a typical experiment, people are shown dozens of photographs and asked whose face they recognise. Within twenty-four hours, they remember far fewer names than faces, and the gap continues to grow.

The problem is not a sign of a bad memory. It is simply how the brain organises information. One useful strategy is to repeat a person's name immediately and use it in conversation. You can also create a mental image linking the name to the face. For example, a woman called Rose might bring to mind a bright red flower.`,
    traps: [
      { word: 'forgotten', ipa: '/fəˈɡɒtn/', note: 'Ударение на второй слог; -tten не превращается в /-ten/.' },
      { word: 'processing', ipa: '/ˈprəʊsesɪŋ/', note: 'Британский вариант: ударение на первый слог, /əʊ/.' },
      { word: 'familiar', ipa: '/fəˈmɪliə/', note: 'Ударение на -mil-; четыре слога, финал — /ə/.' },
      { word: 'visual', ipa: '/ˈvɪʒuəl/', note: 'Звук /ʒ/; два слога: VI-zhual.' },
      { word: 'scientists', ipa: '/ˈsaɪəntɪsts/', note: 'Кластер /-ntɪsts/ в конце; не «саентистс» с лишним гласным.' },
      { word: 'dozens', ipa: '/ˈdʌznz/', note: 'Первый гласный — /ʌ/, финал /-nz/.' },
      { word: 'recognise', ipa: '/ˈrekəɡnaɪz/', note: 'Британское написание; произношение REK-ug-nize.' },
      { word: 'twenty-four', ipa: '/ˌtwenti ˈfɔː/', note: 'Ударение на вторую часть; не «твенти фоур» с одинаковым весом.' },
      { word: 'organises', ipa: '/ˈɔːɡənaɪzɪz/', note: 'Три слога + /ɪz/ в конце; -s после /z/ даёт отдельный слог.' },
      { word: 'immediately', ipa: '/ɪˈmiːdiətli/', note: 'Ударение на -me-; пять слогов, не «иммедиатли» с пропуском.' },
      { word: 'image', ipa: '/ˈɪmɪdʒ/', note: 'Два слога: IM-ij. Не «имаге».' }
    ]
  },
  {
    id: 'statues',
    title: 'The Colour of Ancient Statues',
    titleRu: 'Цвет античных статуй',
    topic: 'Культура',
    level: 'B1+',
    model: false,
    body: `Most museums display ancient Greek and Roman statues as white marble figures. This has shaped our idea of the classical world for centuries. In reality, however, these statues were once painted in bright colours. Their clothes, skin, hair and eyes were covered with red, blue, yellow and green pigments. The paint has disappeared because it was made from materials that fade quickly in sunlight.

Scientists can now study tiny traces of pigment left in the stone. Using special cameras and careful chemical tests, they can reconstruct the original colours. For an exhibition in the nineteenth century, scholars were surprised to find that a famous statue of a warrior contained remains of red paint.

The discovery changes more than our picture of ancient art. It reminds us that history is not a fixed story. Each generation asks new questions and finds new evidence, and even objects that have been studied for hundreds of years can still reveal unexpected secrets.`,
    traps: [
      { word: 'ancient', ipa: '/ˈeɪnʃənt/', note: 'Первый слог — /eɪn/, второй почти редуцирован: AN-shent.' },
      { word: 'statues', ipa: '/ˈstætʃuːz/', note: 'Три слога: STAT-yooz. Не «статуэс».' },
      { word: 'marble', ipa: '/ˈmɑːbl/', note: 'Ударение на первый слог; финальный слог — /bl/ без гласного.' },
      { word: 'classical', ipa: '/ˈklæsɪkl/', note: 'Три слога, ударение на первый; /æ/.' },
      { word: 'pigments', ipa: '/ˈpɪɡmənts/', note: 'Кластер /-ɡmənts/; первый гласный — /ɪ/.' },
      { word: 'disappeared', ipa: '/ˌdɪsəˈpɪəd/', note: 'Ударение на -peared; окончание -ed звучит как /d/.' },
      { word: 'traces', ipa: '/ˈtreɪsɪz/', note: 'Первый слог — /treɪ/; после /s/ окончание -s звучит /ɪz/.' },
      { word: 'reconstruct', ipa: '/ˌriːkənˈstrʌkt/', note: 'Ударение на -struct; приставка re- безударная.' },
      { word: 'exhibition', ipa: '/ˌeksɪˈbɪʃn/', note: 'Ударение на -bi-; четыре слога, не «экзибишн».' },
      { word: 'warrior', ipa: '/ˈwɒriə/', note: 'Первый слог /wɒr/, финал — /iə/.' },
      { word: 'evidence', ipa: '/ˈevɪdəns/', note: 'Ударение на первый слог; финальный /s/.' },
      { word: 'unexpected', ipa: '/ˌʌnɪkˈspektɪd/', note: 'Ударение на -spekt-; -ed — /ɪd/.' }
    ]
  },
  {
    id: 'bees',
    title: 'Bees and the City',
    titleRu: 'Пчёлы и город',
    topic: 'Природа',
    level: 'B1',
    model: false,
    body: `When we think of bees, we usually imagine green fields and wild flowers. Yet some wild bees are now more common in cities than in the countryside. The reason is that modern farming has reduced the variety of flowers, while many cities have created parks, gardens and green roofs.

Research in several European cities has found that around three hundred species of wild bees can live in urban areas. These insects need two things: flowers for food and places for their young to develop. City gardens often provide both, especially when people choose local plants and avoid using too many chemicals.

The change is not a complete solution. Cities are warmer than the countryside, and small populations of bees can disappear when their habitat is destroyed. However, urban gardens prove that nature is more adaptable than we sometimes expect. Even a few square metres outside a house can become a useful island for insects, birds and plants.`,
    traps: [
      { word: 'countryside', ipa: '/ˈkʌntrisaɪd/', note: 'Три слога, ударение на первый; /ʌ/ и /aɪ/.' },
      { word: 'variety', ipa: '/vəˈraɪəti/', note: 'Ударение на -ri-, четыре слога; не «варити».' },
      { word: 'European', ipa: '/ˌjʊərəˈpiːən/', note: 'Ударение на -pe-; пять слогов, начинается с /j/.' },
      { word: 'species', ipa: '/ˈspiːʃiːz/', note: 'Два слога; форма одинаковая для единственного и множественного числа.' },
      { word: 'urban', ipa: '/ˈɜːbən/', note: 'Первый гласный — /ɜː/, не «урбан» с русским /u/.' },
      { word: 'insects', ipa: '/ˈɪnsektz/', note: 'Ударение на первый слог; финальный /ts/ слитный.' },
      { word: 'chemicals', ipa: '/ˈkemɪklz/', note: 'Три слога: KEM-i-kulz.' },
      { word: 'habitat', ipa: '/ˈhæbɪtæt/', note: 'Ударение на первый слог; два /æ/.' },
      { word: 'destroyed', ipa: '/dɪˈstrɔɪd/', note: 'Ударение на второй слог; -ed — /d/.' },
      { word: 'adaptable', ipa: '/əˈdæptəbl/', note: 'Ударение на -dap-; финал /-əbl/ без лишнего гласного.' },
      { word: 'metres', ipa: '/ˈmiːtəz/', note: 'Британская мера; /iː/, финальный /z/.' }
    ]
  },
  {
    id: 'bread',
    title: 'The Art of Bread',
    titleRu: 'Искусство хлеба',
    topic: 'Еда',
    level: 'B1+',
    model: true,
    body: `Bread is one of the oldest prepared foods in history. Archaeologists have found flat bread baked more than fourteen thousand years ago in the Middle East, before the invention of farming. From there, the idea travelled across Europe and Asia, changing according to local grains and climates.

For centuries, bread was not just food. In many cultures it was linked to hospitality, religion and neighbourhood life. The smell of fresh bread showed that a family was ready to welcome guests. Even today, a bakery can be the heart of a small community.

Modern industrial baking has made bread cheaper and more uniform, but it has also reduced variety. In the last thirty years, small bakeries have begun to rediscover old recipes. They use slow fermentation, simple ingredients and local flour. The result is a loaf that may cost more, but it has a deeper flavour and a longer story. A slice of bread can carry thousands of years of knowledge.`,
    traps: [
      { word: 'Archaeologists', ipa: '/ˌɑːkiˈɒlədʒɪsts/', note: 'Ударение на -ol-; сочетание ch читается как /k/.' },
      { word: 'baked', ipa: '/beɪkt/', note: 'Окончание -ed после глухого /k/ звучит как /t/.' },
      { word: 'fourteen', ipa: '/ˌfɔːˈtiːn/', note: 'Ударение на второй слог; не путайте с forty /ˈfɔːti/.' },
      { word: 'Europe', ipa: '/ˈjʊərəp/', note: 'Два слога, начинается с /j/.' },
      { word: 'climates', ipa: '/ˈklaɪməts/', note: 'Первый слог — /klaɪ/; финальный /ts/.' },
      { word: 'hospitality', ipa: '/ˌhɒspɪˈtæləti/', note: 'Ударение на -tal-; пять слогов.' },
      { word: 'religion', ipa: '/rɪˈlɪdʒən/', note: 'Ударение на -li-; звук /dʒ/.' },
      { word: 'neighbourhood', ipa: '/ˈneɪbəhʊd/', note: 'Британское написание -gh-; NEY-buh-hood.' },
      { word: 'community', ipa: '/kəˈmjuːnəti/', note: 'Ударение на -mu-; четыре слога.' },
      { word: 'industrial', ipa: '/ɪnˈdʌstriəl/', note: 'Ударение на -dus-; финал — /iəl/.' },
      { word: 'fermentation', ipa: '/ˌfɜːmenˈteɪʃn/', note: 'Ударение на -ta-; -tion — /ʃn/.' },
      { word: 'ingredients', ipa: '/ɪnˈɡriːdiənts/', note: 'Ударение на -gre-; долгий /iː/, финальный /ts/.' },
      { word: 'flavour', ipa: '/ˈfleɪvə/', note: 'Британское написание; /eɪ/, финал — /ə/.' },
      { word: 'knowledge', ipa: '/ˈnɒlɪdʒ/', note: 'Немая k; ударение на первый слог, /ɒ/.' }
    ],
    modelNotes: {
      verdict: '1 балл',
      why: [
        'Числительное fourteen thousand произнесено с ударением на -teen и без лишней паузы.',
        'Окончания -ed и -s не потеряны: baked /t/, linked /t/, reduced /d/.',
        'Сложные слова archaeologists, hospitality и fermentation сохраняют верное ударение.',
        'Паузы совпадают со смыслом: после вводных фраз и между частями сложных предложений.'
      ],
      watch: [
        'Не спешите на слове fermentation — ударение на третьем слоге.',
        'В knowledge k не читается; в neighbourhood -gh- тоже немое.',
        'В четыре тысячи лет число читается fourteen thousand, а не forty thousand.'
      ],
      markup: 'Bread is one of the oldest prepared foods in human history. / Archaeologists have found flat bread / baked more than *fourteen thousand* years ago / in the Middle East, / long before the invention of farming. / From there, / the idea travelled across *Europe* and Asia, / changing according to local *grains* and *climates*.'
    }
  },
  {
    id: 'archive',
    title: 'A Library Without Paper',
    titleRu: 'Библиотека без бумаги',
    topic: 'Технологии',
    level: 'B1+',
    model: false,
    body: `In 1999, a group of friends in California began a project that many people thought was unrealistic. They wanted to collect copies of the web's pages so that future generations could study them. The result was a digital archive that now holds hundreds of millions of texts, photographs, films and recordings.

A national library sends its books to one central building, but the internet has no single centre. Websites appear, change and disappear every second. Some are removed by their owners; others are lost when companies close. Without an archive, these small pieces of culture would vanish. The project therefore uses automatic programmes to save pages at regular intervals.

Digital libraries have obvious advantages. A student in a remote village can read the same source as a professor in a major city. Yet storing information is only half the task. We also need to organise it, question it and learn how to use it wisely.`,
    traps: [
      { word: '1999', ipa: '/ˌnaɪntiːn naɪnti ˈnaɪn/', note: 'Год: nineteen ninety-nine. Не «одна тысяча девятьсот девяносто девять».' },
      { word: 'California', ipa: '/ˌkælɪˈfɔːniə/', note: 'Ударение на -for-; пять слогов.' },
      { word: 'unrealistic', ipa: '/ˌʌnrɪəˈlɪstɪk/', note: 'Ударение на -lis-; финальный -ic всегда под ударением.' },
      { word: 'generations', ipa: '/ˌdʒenəˈreɪʃnz/', note: 'Ударение на -ra-; -tion — /ʃn/.' },
      { word: 'archive', ipa: '/ˈɑːkaɪv/', note: 'Британское произношение: AR-kive, /aɪ/ во втором слоге.' },
      { word: 'national', ipa: '/ˈnæʃnəl/', note: 'Три слога, ударение на первый; -tion — /ʃn/.' },
      { word: 'owners', ipa: '/ˈəʊnəz/', note: 'Первый слог — /əʊ/; окончание -s — /z/.' },
      { word: 'vanish', ipa: '/ˈvænɪʃ/', note: 'Ударение на первый слог; финальный /ʃ/.' },
      { word: 'automatic', ipa: '/ˌɔːtəˈmætɪk/', note: 'Ударение на -mat-; четыре слога.' },
      { word: 'intervals', ipa: '/ˈɪntəvlz/', note: 'Три слога; финальный /z/.' },
      { word: 'obvious', ipa: '/ˈɒbviəs/', note: 'Три слога, ударение на первый; /ɒ/.' },
      { word: 'professor', ipa: '/prəˈfesə/', note: 'Ударение на -fes-; финал — /ə/.' }
    ]
  },
  {
    id: 'postcard',
    title: 'The Long Journey of a Postcard',
    titleRu: 'Долгий путь открытки',
    topic: 'История',
    level: 'B1',
    model: true,
    body: `The first postcard was sent in Austria in 1869. It was a rectangle of light brown paper with a message of no more than twenty words. The idea was an immediate success: other countries copied it, and within a few years millions of cards were travelling across Europe.

Early postcards usually showed a town or a famous building. Photographers climbed hills, waited for good weather and arranged the streets so that the scene looked perfect. The images were often coloured by hand, which made them expensive but beautiful. On the back, people wrote short messages: wishes from the sea, congratulations, or plans for a meeting.

Today messages move instantly, and some believe the postcard has lost its purpose. Yet it has a quality that a text message cannot offer. Someone has chosen a picture, found a stamp and written your address by hand. The card has crossed a real distance and carries a small trace of another person's life.`,
    traps: [
      { word: 'Austria', ipa: '/ˈɒstriə/', note: 'Ударение на первый слог; не путайте с Australia /ɒˈstreɪliə/.' },
      { word: '1869', ipa: '/ˌeɪtiːn ˈsɪksti naɪn/', note: 'Год: eighteen sixty-nine.' },
      { word: 'rectangle', ipa: '/ˈrektæŋɡl/', note: 'Ударение на первый слог; финальный /-tæŋɡl/.' },
      { word: 'immediate', ipa: '/ɪˈmiːdiət/', note: 'Ударение на -me-; четыре слога.' },
      { word: 'Europe', ipa: '/ˈjʊərəp/', note: 'Два слога; начинается с /j/.' },
      { word: 'Photographers', ipa: '/fəˈtɒɡrəfəz/', note: 'Ударение на -tog-; в конце /fəz/, не «фотографэрс».' },
      { word: 'climbed', ipa: '/klaɪmd/', note: 'Немая b; окончание -ed звучит /d/.' },
      { word: 'arranged', ipa: '/əˈreɪndʒd/', note: 'Ударение на второй слог; финальный кластер /-ndʒd/.' },
      { word: 'coloured', ipa: '/ˈkʌləd/', note: 'Британское написание; окончание -ed — /d/.' },
      { word: 'congratulations', ipa: '/kənˌɡrætʃuˈleɪʃnz/', note: 'Ударение на -la-; -tions — /ʃnz/.' },
      { word: 'purpose', ipa: '/ˈpɜːpəs/', note: 'Первый гласный — /ɜː/; второй редуцирован.' },
      { word: 'address', ipa: '/əˈdres/', note: 'Британское ударение на второй слог.' },
      { word: 'distance', ipa: '/ˈdɪstəns/', note: 'Два слога, ударение на первый; финальный /s/.' }
    ],
    modelNotes: {
      verdict: '1 балл',
      why: [
        'Год 1869 прочитан как eighteen sixty-nine — бегло и без паузы внутри числа.',
        'Окончания worked? нет: climbed /d/, arranged /d/, crossed /t/, coloured /d/ — без лишнего слога.',
        'Паузы после двоеточия и перед перечислением короткие, но оправданные.',
        'Тон ровный, финальные утверждения завершаются падением; нет спешки на длинных словах.'
      ],
      watch: [
        'Austria — это Австрия, не Австралия. Проверьте первую гласную: /ˈɒstriə/.',
        'В photographers ударение на второй слог, а не на первый.',
        'Фраза with a message of no more than twenty words читается слитно: не разрывайте of и no.'
      ],
      markup: 'The first *postcard* was sent in *Austria* in *1869*. / It was a simple rectangle of light brown paper / with a message of no more than *twenty words*. / The idea was an *immediate* success: / other countries copied it, / and within a few years millions of cards were travelling across *Europe*.'
    }
  },
  {
    id: 'silence',
    title: 'Why Silence Is Good for the Brain',
    titleRu: 'Почему тишина полезна для мозга',
    topic: 'Здоровье',
    level: 'B1+',
    model: false,
    body: `Many people listen to music, podcasts or radio from morning until night. Silence can feel uncomfortable, almost like an empty room. Yet recent research suggests that a few quiet minutes during the day may be good for both memory and attention.

In one experiment, volunteers spent two hours in a silent room after hearing a series of sounds. Their brains continued to process the experience, and their memory of the sounds improved. In another study, children who worked in a noisy classroom found it harder to concentrate than children in a quiet one.

The brain is always active, even when there is nothing to listen to. During silence, it connects ideas and stores information. Constant noise, by contrast, keeps the mind in a state of alertness. This does not mean we should avoid all sound. It means a walk without headphones, a pause between tasks or a few minutes on a bench can be more useful than another video.`,
    traps: [
      { word: 'podcasts', ipa: '/ˈpɒdkɑːsts/', note: 'Первый слог — /pɒd/; финальный /-kɑːsts/ насыщенный, без вставки гласных.' },
      { word: 'uncomfortable', ipa: '/ʌnˈkʌmftəbl/', note: 'Четыре слога: un-COMF-ta-ble. Не «анкомфортабл».' },
      { word: 'recent', ipa: '/ˈriːsnt/', note: 'Два слога: REE-snt; не «ресент» с /z/.' },
      { word: 'research', ipa: '/rɪˈsɜːtʃ/', note: 'Британское ударение на второй слог.' },
      { word: 'volunteers', ipa: '/ˌvɒlənˈtɪəz/', note: 'Ударение на -teers; финальный /z/.' },
      { word: 'series', ipa: '/ˈsɪəriːz/', note: 'Три слога: SEER-eez; не «серия».' },
      { word: 'process', ipa: '/ˈprəʊses/', note: 'Здесь глагол; британское ударение на первый слог.' },
      { word: 'improved', ipa: '/ɪmˈpruːvd/', note: 'Ударение на второй слог; окончание -ed — /d/.' },
      { word: 'noisy', ipa: '/ˈnɔɪzi/', note: 'Дифтонг /ɔɪ/; финальный /z/.' },
      { word: 'concentrate', ipa: '/ˈkɒnsntreɪt/', note: 'Ударение на первый слог; три слога, без «консентрейт».' },
      { word: 'alertness', ipa: '/əˈlɜːtnəs/', note: 'Ударение на -lert-; финальный /nəs/.' },
      { word: 'useful', ipa: '/ˈjuːsfl/', note: 'Два слога; начинается с /j/.' }
    ]
  }
];

export const TOPICS = ['Все', ...Array.from(new Set(TEXTS.map(t => t.topic)))];

export function getText(id) {
  return TEXTS.find(t => t.id === id) || null;
}

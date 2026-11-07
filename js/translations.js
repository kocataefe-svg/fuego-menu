'use strict';
// Russian + Spanish texts, merged into the menu data at load (see applyTranslations in menu.js).
// items: id: [ru name, es name, ru description, es description]  ('' = no description)

const TRANSLATIONS = {
  tagline: {
    ru: 'Дух Османской империи в современном прочтении',
    es: 'El alma otomana, en clave moderna'
  },
  categories: {
    cat_1:  ['Завтрак', 'Desayuno'],
    cat_2:  ['Холодные закуски', 'Entrantes fríos'],
    cat_3:  ['Горячие закуски', 'Entrantes calientes'],
    cat_4:  ['Салаты', 'Ensaladas'],
    cat_5:  ['Пиде', 'Pide'],
    cat_6:  ['Турецкие кебабы', 'Kebabs turcos'],
    cat_7:  ['Османские блюда', 'Especialidades otomanas'],
    cat_8:  ['Международная кухня', 'Cocina internacional'],
    cat_9:  ['Пицца', 'Pizza'],
    cat_10: ['Рыба и морепродукты', 'Pescados y mariscos'],
    cat_11: ['Вегетарианское', 'Vegetariano'],
    cat_12: ['Паста', 'Pasta'],
    cat_13: ['Десерты', 'Postres']
  },
  items: {
    i101: ['Турецкий завтрак-ассорти (на 2 персоны)', 'Desayuno turco variado (2 personas)',
      'Чёрные и зелёные оливки, огурец, помидор, 2 вида варенья, сливочное масло, мёд, брынза, сыр кашар, жареный бёрек, омлет, салями, яичница, шоколадный крем, ореховый крем, картофель фри, турецкий чай',
      'Aceitunas negras y verdes, pepino, tomate, 2 tipos de mermelada, mantequilla, miel, queso feta, queso kashar, börek frito, tortilla, salami, huevo frito, crema de chocolate, crema de nueces, patatas fritas, té turco'],
    i102: ['Тарелка для завтрака', 'Plato de desayuno',
      'Чёрные/зелёные оливки, огурец, помидор, мёд, брынза, сыр кашар, шоколадный крем, ореховый крем, варёное яйцо, турецкий чай',
      'Aceitunas negras/verdes, pepino, tomate, miel, queso feta, queso kashar, crema de chocolate, crema de nueces, huevo cocido, té turco'],
    i103: ['Омлет — классический', 'Tortilla — sencilla', '', ''],
    i104: ['Омлет — с сыром', 'Tortilla — con queso', '', ''],
    i105: ['Омлет — с грибами и сыром', 'Tortilla — con champiñones y queso', '', ''],
    i106: ['Омлет — ассорти', 'Tortilla — mixta', '', ''],
    i107: ['Менемен — классический', 'Menemen — sencillo', '', ''],
    i108: ['Менемен — с сыром', 'Menemen — con queso', '', ''],
    i109: ['Менемен — с суджуком', 'Menemen — con sucuk (embutido turco)', '', ''],

    i201: ['Хумус', 'Hummus',
      'Пюре из нута с лимоном, тахини, чесноком и оливковым маслом',
      'Puré de garbanzos con limón, tahini, ajo y aceite de oliva'],
    i202: ['Портулак с йогуртом', 'Verdolaga con yogur',
      'Густой йогурт с портулаком и чесноком',
      'Yogur colado con verdolaga y ajo'],
    i203: ['Острая эзме', 'Ezme picante',
      'Острая турецкая сальса из помидоров, перца, чеснока, петрушки и гранатового соуса',
      'Salsa picante turca de tomate, pimiento, ajo, perejil y melaza de granada'],
    i204: ['Баклажаны шакшука', 'Berenjena şakşuka',
      'Жареные баклажаны в томатном соусе с оливковым маслом и чесноком',
      'Berenjena frita en salsa de tomate con aceite de oliva y ajo'],
    i205: ['Бабагануш', 'Babaganoush',
      'Пюре из печёных баклажанов с лимоном, оливковым маслом и чесноком',
      'Puré de berenjena asada con limón, aceite de oliva y ajo'],
    i206: ['Долма из виноградных листьев', 'Hojas de parra rellenas',
      'Виноградные листья с рисом, луком, мятой, кедровыми орешками, изюмом и корицей',
      'Hojas de parra rellenas de arroz, cebolla, menta, piñones, pasas y canela'],
    i207: ['Баклажаны с тахини', 'Berenjena con tahini',
      'Пюре из печёных баклажанов с кунжутным маслом и чесночным йогуртом',
      'Puré de berenjena asada con aceite de sésamo y salsa de yogur con ajo'],
    i208: ['Морковный таратор', 'Tarator de zanahoria',
      'Морковь и кабачок в чесночном майонезном соусе',
      'Zanahoria y calabacín en salsa de mayonesa con ajo'],
    i209: ['Имам баялды', 'Imam bayıldı',
      'Жареные и запечённые баклажаны, фаршированные свежими овощами',
      'Berenjenas fritas y horneadas rellenas de verduras frescas'],
    i210: ['Хайдари', 'Haydari (yogur con hierbas)', '', ''],
    i211: ['Ассорти закусок (на 2 персоны)', 'Surtido de entrantes (2 personas)', '', ''],

    i301: ['Суп', 'Sopa',
      'Куриный / томатный / чечевичный',
      'Pollo / tomate / lentejas'],
    i302: ['Картофель фри', 'Patatas fritas', '', ''],
    i303: ['Сигара бёрек', 'Börek de queso enrollado',
      'Жареные рулетики из теста с сыром, подаются с йогуртовым соусом',
      'Rollitos fritos de masa con queso, con salsa de yogur'],
    i304: ['Фалафель (250 г)', 'Falafel (250 g)', '', ''],
    i305: ['Жареные кальмары (350 г)', 'Calamares fritos (350 g)', '', ''],
    i306: ['Халлуми на гриле (200 г)', 'Halloumi a la parrilla (200 g)', '', ''],
    i307: ['Ичли кёфте (250 г)', 'Içli köfte (250 g)',
      'Жареные шарики из булгура с мясной начинкой',
      'Croquetas fritas de bulgur rellenas de carne'],

    i401: ['Пастуший салат', 'Ensalada pastora',
      'Традиционный турецкий салат: мелко нарезанные помидоры, огурцы, зелёный перец, красный лук и гранатовый соус',
      'Ensalada turca tradicional: tomate, pepino, pimiento verde y cebolla roja picados finos, con melaza de granada'],
    i402: ['Сезонный салат', 'Ensalada de temporada',
      'Айсберг, маринованная красная капуста, тёртая морковь, помидоры, огурцы, кукуруза, масло, лимон, руккола',
      'Lechuga iceberg, lombarda encurtida, zanahoria rallada, tomate, pepino, maíz, aceite, limón, rúcula'],
    i403: ['Салат с халлуми', 'Ensalada de halloumi',
      'Средиземноморская зелень, черри, оливки и сыр халлуми на гриле',
      'Hojas mediterráneas, tomate cherry, aceitunas y queso halloumi a la parrilla'],
    i404: ['Салат с тунцом', 'Ensalada de atún',
      'Айсберг, тунец, кукуруза, каперсы, оливки, огурцы, красный лук, соленья, морковь',
      'Lechuga iceberg, atún, maíz, alcaparras, aceitunas, pepino, cebolla roja, encurtidos, zanahoria'],
    i405: ['Салат «Цезарь»', 'Ensalada César',
      'Романо, тёртый пармезан и классическая заправка «Цезарь» с курицей гриль и черри',
      'Lechuga romana, parmesano rallado y aliño César clásico, con pollo a la parrilla y tomate cherry'],
    i406: ['Греческий салат', 'Ensalada griega',
      'Помидоры, огурцы, лук, молодая брынза и оливки',
      'Tomate, pepino, cebolla, queso feta tierno y aceitunas'],
    i407: ['Салат с креветками', 'Ensalada de gambas',
      'Айсберг, кукуруза, каперсы, черри, огурцы, красный лук, соленья, морковь и креветки',
      'Lechuga iceberg, maíz, alcaparras, tomate cherry, pepino, cebolla roja, encurtidos, zanahoria y gambas'],
    i408: ['Салат со стейком', 'Ensalada con filete',
      'Айсберг, кукуруза, каперсы, черри, огурцы, красный лук, соленья, морковь и стейк на гриле',
      'Lechuga iceberg, maíz, alcaparras, tomate cherry, pepino, cebolla roja, encurtidos, zanahoria y filete a la parrilla'],

    i501: ['Пиде с сыром', 'Pide de queso', '', ''],
    i502: ['Пиде с фаршем', 'Pide de carne picada', '', ''],
    i503: ['Пиде с кусочками мяса', 'Pide de carne en dados', '', ''],
    i504: ['Вегетарианское пиде', 'Pide vegetariano', '', ''],
    i505: ['Пиде с бастурмой', 'Pide de pastırma (cecina turca)', '', ''],
    i506: ['Пиде с курицей', 'Pide de pollo', '', ''],
    i507: ['Пиде ассорти', 'Pide mixto', '', ''],
    i508: ['Пышная лепёшка (пуф)', 'Pan inflado (puf)', '', ''],

    i601: ['Куриный шиш-кебаб (200 г)', 'Brocheta de pollo (200 g)',
      'Курица на шпажке с булгуром, помидором и зелёным перцем на гриле, лаваш',
      'Pollo en brocheta con pilaf de bulgur, tomate y pimiento verde a la parrilla, pan lavash'],
    i602: ['Кёфте на гриле (200 г)', 'Albóndigas a la parrilla (200 g)',
      'Говяжьи котлетки с турецкими специями, булгур, помидор, лук и зелёный перец на гриле, лаваш',
      'Albóndigas de ternera con especias turcas, pilaf de bulgur, tomate, cebolla y pimiento verde a la parrilla, pan lavash'],
    i603: ['Адана-кебаб (180 г)', 'Kebab Adana (180 g)',
      'Рубленая вручную говядина в традиционных специях, булгур, помидор, зелёный перец и лук на гриле, лаваш',
      'Ternera picada a cuchillo con especias tradicionales, pilaf de bulgur, tomate, pimiento verde y cebolla a la parrilla, pan lavash'],
    i604: ['Куриные отбивные на гриле (250 г)', 'Chuletas de pollo a la parrilla (250 g)',
      'Куриные отбивные с помидором, зелёным перцем и луком на гриле, салат',
      'Chuletas de pollo con tomate, pimiento verde y cebolla a la parrilla, ensalada'],
    i605: ['Куриные крылышки на гриле (250 г)', 'Alitas de pollo a la parrilla (250 g)',
      'Куриные крылышки с булгуром, помидором, луком и зелёным перцем на гриле, салат, лаваш',
      'Alitas de pollo con pilaf de bulgur, tomate, cebolla y pimiento verde a la parrilla, ensalada, pan lavash'],
    i606: ['Искендер-кебаб (180 г)', 'Kebab İskender (180 g)',
      'Кусочки пиде, обжаренные в сливочном масле, с дёнером, помидорами, перцем, традиционным соусом и топлёным маслом',
      'Pan pide dorado en mantequilla con döner, tomate, pimiento, salsa tradicional İskender y mantequilla'],
    i607: ['Шиш-кебаб из баранины (200 г)', 'Brocheta de cordero (200 g)',
      'Филе ягнёнка на шпажке с булгуром, помидором, зелёным перцем, овощами в масле и лавашем',
      'Filete de cordero en brocheta con pilaf de bulgur, tomate, pimiento verde, verduras salteadas y pan lavash'],
    i608: ['Шашлык из говядины (200 г)', 'Brocheta de ternera (200 g)',
      'Говяжье филе на шпажке с булгуром, помидором, зелёным перцем, овощами в масле и лавашем',
      'Filete de ternera en brocheta con pilaf de bulgur, tomate, pimiento verde, verduras salteadas y pan lavash'],
    i609: ['Гамбургер (125 г)', 'Hamburguesa (125 g)', '', ''],
    i610: ['Чизбургер (125 г)', 'Hamburguesa con queso (125 g)', '', ''],
    i611: ['Бараньи отбивные (300 г)', 'Chuletas de cordero (300 g)',
      'Баранина, маринованная в специях, с булгуром, помидором, зелёным перцем, луком, салатом и лавашем',
      'Cordero marinado en especias con pilaf de bulgur, tomate, pimiento verde, cebolla, ensalada y pan lavash'],
    i612: ['Бейти в лаваше (200 г)', 'Beyti sarma (200 g)',
      'Рубленая вручную говядина в традиционных специях, завёрнутая в лаваш, с йогуртовым соусом',
      'Ternera picada a cuchillo con especias tradicionales, enrollada en pan lavash, con salsa de yogur'],
    i613: ['Дюрюм с куриным дёнером (140 г)', 'Dürüm de döner de pollo (140 g)', '', ''],
    i614: ['Дюрюм с говяжьим дёнером (140 г)', 'Dürüm de döner de ternera (140 g)', '', ''],
    i615: ['Адана-дюрюм (180 г)', 'Dürüm de kebab Adana (180 g)', '', ''],
    i616: ['Кебаб-ассорти — на 1 персону (500 г)', 'Kebab mixto — 1 persona (500 g)',
      'Адана-кебаб, куриный шиш, шиш из баранины, куриные крылышки и кёфте в специях, булгур, помидор, зелёный перец, овощи в масле, лаваш',
      'Kebab Adana, brocheta de pollo, brocheta de cordero, alitas y albóndigas con especias, pilaf de bulgur, tomate, pimiento verde, verduras salteadas, pan lavash'],
    i617: ['Кебаб-ассорти — на 2 персоны (1000 г)', 'Kebab mixto — 2 personas (1000 g)', '', ''],

    i701: ['Хюнкяр беенди (200 г)', 'Hünkar beğendi (200 g)',
      'Пюре из печёных баклажанов с тушёной бараниной в особом соусе',
      'Puré de berenjena asada con cordero guisado en salsa especial'],
    i702: ['Бараньи отбивные в горшочке (300 г)', 'Cazuela de chuletas de cordero (300 g)', '', ''],
    i703: ['Чёкертме-кебаб (200 г)', 'Kebab çökertme (200 g)',
      'Говядина на гриле с жареным картофелем, овощами и томатным соусом',
      'Ternera a la parrilla con patatas fritas, verduras y salsa de tomate'],
    i704: ['Кебаб в кувшине — баранина (400 г)', 'Kebab en vasija — cordero (400 g)', '', ''],
    i705: ['Кебаб в кувшине — курица (200 г)', 'Kebab en vasija — pollo (200 g)', '', ''],
    i706: ['Кебаб в кувшине — говядина (400 г)', 'Kebab en vasija — ternera (400 g)', '', ''],
    i707: ['Кебаб в кувшине — вегетарианский (600 г)', 'Kebab en vasija — vegetariano (600 g)', '', ''],
    i708: ['Чобан кавурма — баранина (200 г)', 'Salteado del pastor — cordero (200 g)',
      'Тонко нарезанное маринованное мясо, обжаренное с мелким луком, помидорами, перцем, грибами, чесноком и тимьяном',
      'Carne marinada en tiras finas, salteada con cebollitas, tomate, pimiento, champiñones, ajo y tomillo'],
    i709: ['Чобан кавурма — курица (200 г)', 'Salteado del pastor — pollo (200 g)', '', ''],
    i710: ['Али-Назик кебаб (180 г)', 'Kebab Ali Nazik (180 g)',
      'Рубленая вручную говядина, маринованная в оливковом масле, йогурте и специях, на шпажке, на пюре из баклажанов, запечённых на углях, с топлёным маслом',
      'Ternera picada a cuchillo marinada en aceite de oliva, yogur y especias, a la brasa, sobre berenjena asada al carbón con salsa de mantequilla'],
    i711: ['Мусака', 'Musaka',
      'Жареный баклажан с мелко рубленой говядиной, луком, перцем и помидорами, подаётся с рисом',
      'Berenjena frita con ternera picada fina, cebolla, pimiento y tomate, servida con arroz'],
    i712: ['Баранья голяшка (350–400 г)', 'Jarrete de cordero (350–400 g)',
      'Запечённая баранья голяшка на пюре из баклажанов',
      'Jarrete de cordero al horno sobre puré de berenjena'],

    i801: ['Филе-миньон (240 г)', 'Filet mignon (240 g)',
      'Подаётся с овощами гриль и жареным картофелем',
      'Con verduras a la parrilla y patatas fritas'],
    i802: ['* С соусом из чёрного перца', '* Con salsa de pimienta negra', '', ''],
    i803: ['* С грибным соусом', '* Con salsa de champiñones', '', ''],
    i804: ['* С мексиканским соусом', '* Con salsa mexicana', '', ''],
    i805: ['Фахитас — говядина (200 г)', 'Fajitas — ternera (200 g)', '', ''],
    i806: ['Фахитас — курица (200 г)', 'Fajitas — pollo (200 g)', '', ''],

    i901: ['Пицца «Маргарита»', 'Pizza margarita', '', ''],
    i902: ['Пицца «Фуэго микс»', 'Pizza Fuego mixta', '', ''],
    i903: ['Вегетарианская пицца', 'Pizza vegetariana', '', ''],
    i904: ['Пицца с дёнером', 'Pizza de döner', '', ''],
    i905: ['Пицца с курицей', 'Pizza de pollo', '', ''],
    i906: ['Острая мексиканская пицца', 'Pizza mexicana picante', '', ''],

    i1001: ['Дорадо на гриле (400–450 г)', 'Dorada a la parrilla (400–450 g)',
      'С рукколой, красным луком, помидором и лимоном',
      'Con rúcula, cebolla roja, tomate y limón'],
    i1002: ['Сибас на гриле (400–450 г)', 'Lubina a la parrilla (400–450 g)',
      'С рукколой, красным луком, помидором и лимоном',
      'Con rúcula, cebolla roja, tomate y limón'],
    i1003: ['Креветки в горшочке со сливочным маслом (120 г)', 'Cazuela de gambas a la mantequilla (120 g)', '', ''],
    i1004: ['Сибас на пару (350 г)', 'Lubina al vapor (350 g)', '', ''],
    i1005: ['Лосось на гриле (350 г)', 'Salmón a la parrilla (350 g)',
      'С рукколой, красным луком, помидором и лимоном',
      'Con rúcula, cebolla roja, tomate y limón'],
    i1006: ['Жареные кальмары (350 г)', 'Calamares fritos (350 g)', '', ''],
    i1007: ['Королевские креветки', 'Langostinos jumbo',
      'Цена по дню',
      'Precio del día'],

    i1101: ['Фаршированный баклажан с овощами', 'Berenjena rellena de verduras',
      'Запечённые в духовке грибы, кабачки, морковь, баклажаны, помидоры и перец',
      'Cazuela al horno de champiñones, calabacín, zanahoria, berenjena, tomate y pimiento'],
    i1102: ['Овощи в горшочке', 'Cazuela de verduras',
      'Запечённые в духовке грибы, кабачки, морковь, баклажаны, помидоры и перец',
      'Cazuela al horno de champiñones, calabacín, zanahoria, berenjena, tomate y pimiento'],
    i1103: ['Грибы в горшочке', 'Cazuela de champiñones',
      'Запечённые грибы с овощами',
      'Champiñones asados con verduras'],

    i1201: ['Со шпинатом (пенне/лингвини)', 'Con espinacas (penne/linguine)', '', ''],
    i1202: ['С креветками (пенне/лингвини)', 'Con gambas (penne/linguine)', '', ''],
    i1203: ['Алла наполетана (пенне/лингвини)', 'Alla napoletana (penne/linguine)',
      'Томатный соус, свежий базилик и пармезан',
      'Salsa de tomate, albahaca fresca y parmesano'],
    i1204: ['Болоньезе (пенне/лингвини)', 'Alla boloñesa (penne/linguine)',
      'Мясной соус, свежий базилик и пармезан',
      'Salsa de carne, albahaca fresca y parmesano'],
    i1205: ['Альфредо (пенне/лингвини)', 'Alfredo (penne/linguine)',
      'Курица соломкой, морковь, кабачок, лук, паприка и сливочный соус',
      'Pollo en juliana, zanahoria, calabacín, cebolla, pimentón y salsa de nata'],
    i1206: ['С тунцом (пенне/лингвини)', 'Con atún (penne/linguine)', '', ''],
    i1207: ['Аррабьята (пенне/лингвини)', 'Alla arrabbiata (penne/linguine)',
      'Острый томатный соус, оливки, свежий базилик и пармезан',
      'Salsa de tomate picante, aceitunas en rodajas, albahaca fresca y parmesano'],
    i1208: ['Манты', 'Mantı (raviolis turcos)',
      'Турецкие мини-пельмени с мясом под йогуртом и острым сливочным маслом',
      'Pequeños raviolis turcos de carne con yogur y mantequilla especiada'],

    i1301: ['Фрукты с йогуртом (маседуан)', 'Macedonia de frutas con yogur', '', ''],
    i1302: ['Фруктовое ассорти', 'Cubo de frutas', '', ''],
    i1303: ['Мороженое', 'Helado', '', ''],
    i1304: ['Пахлава', 'Baklava', '', ''],
    i1305: ['Кюнефе', 'Künefe', '', ''],
    i1306: ['Катмер', 'Katmer', '', '']
  }
};

// Drinks menu
Object.assign(TRANSLATIONS.categories, {
  "cat_14": [
    "Холодные напитки",
    "Bebidas frías"
  ],
  "cat_15": [
    "Безалкогольные коктейли",
    "Cócteles sin alcohol"
  ],
  "cat_16": [
    "Свежевыжатые соки",
    "Zumos naturales"
  ],
  "cat_17": [
    "Горячие напитки",
    "Bebidas calientes"
  ],
  "cat_18": [
    "Горячие напитки с алкоголем",
    "Bebidas calientes con alcohol"
  ],
  "cat_19": [
    "Пиво",
    "Cervezas"
  ],
  "cat_20": [
    "Закуски к напиткам",
    "Para picar"
  ],
  "cat_21": [
    "Ракы",
    "Rakı"
  ],
  "cat_22": [
    "Фирменные коктейли",
    "Cócteles de la casa"
  ],
  "cat_23": [
    "Классические коктейли",
    "Cócteles internacionales"
  ],
  "cat_24": [
    "Виски",
    "Whisky"
  ],
  "cat_25": [
    "Джин",
    "Ginebra"
  ],
  "cat_26": [
    "Водка",
    "Vodka"
  ],
  "cat_27": [
    "Вино",
    "Vino"
  ],
  "cat_28": [
    "Шоты",
    "Chupitos"
  ]
});
Object.assign(TRANSLATIONS.items, {
  "i1401": [
    "Coca-Cola / Zero / Light",
    "Coca-Cola / Zero / Light",
    "",
    ""
  ],
  "i1402": [
    "Fanta",
    "Fanta",
    "",
    ""
  ],
  "i1403": [
    "Sprite",
    "Sprite",
    "",
    ""
  ],
  "i1404": [
    "Холодный чай (лимон / персик)",
    "Té helado (limón / melocotón)",
    "",
    ""
  ],
  "i1405": [
    "Айран",
    "Ayran (bebida de yogur)",
    "",
    ""
  ],
  "i1406": [
    "Газированная вода (маленькая)",
    "Agua con gas (pequeña)",
    "",
    ""
  ],
  "i1407": [
    "Газированная вода (1 л)",
    "Agua con gas (1 L)",
    "",
    ""
  ],
  "i1408": [
    "Тоник",
    "Tónica",
    "",
    ""
  ],
  "i1409": [
    "Холодный кофе",
    "Café helado",
    "",
    ""
  ],
  "i1410": [
    "Молочный коктейль",
    "Batido",
    "",
    ""
  ],
  "i1411": [
    "Домашний лимонад",
    "Limonada casera",
    "",
    ""
  ],
  "i1412": [
    "Red Bull",
    "Red Bull",
    "",
    ""
  ],
  "i1413": [
    "Вода (маленькая)",
    "Agua (pequeña)",
    "",
    ""
  ],
  "i1414": [
    "Вода (большая)",
    "Agua (grande)",
    "",
    ""
  ],
  "i1501": [
    "Безалкогольное пиво",
    "Cerveza sin alcohol",
    "",
    ""
  ],
  "i1502": [
    "Мохито",
    "Mojito",
    "",
    ""
  ],
  "i1503": [
    "Sex on the Beach",
    "Sex on the Beach",
    "",
    ""
  ],
  "i1504": [
    "Strawberry Dreams",
    "Strawberry Dreams",
    "",
    ""
  ],
  "i1505": [
    "Blueberry Club",
    "Blueberry Club",
    "",
    ""
  ],
  "i1506": [
    "Twister",
    "Twister",
    "",
    ""
  ],
  "i1601": [
    "Апельсин",
    "Naranja",
    "",
    ""
  ],
  "i1602": [
    "Яблоко",
    "Manzana",
    "",
    ""
  ],
  "i1603": [
    "Гранат",
    "Granada",
    "",
    ""
  ],
  "i1604": [
    "Микс",
    "Zumo mixto",
    "",
    ""
  ],
  "i1605": [
    "Персик",
    "Melocotón",
    "",
    ""
  ],
  "i1606": [
    "Арбуз",
    "Sandía",
    "",
    ""
  ],
  "i1607": [
    "Дыня",
    "Melón",
    "",
    ""
  ],
  "i1701": [
    "Эспрессо",
    "Espresso",
    "",
    ""
  ],
  "i1702": [
    "Макиато",
    "Macchiato",
    "",
    ""
  ],
  "i1703": [
    "Капучино",
    "Capuchino",
    "",
    ""
  ],
  "i1704": [
    "Американо",
    "Americano",
    "",
    ""
  ],
  "i1705": [
    "Латте",
    "Café con leche",
    "",
    ""
  ],
  "i1706": [
    "Нескафе",
    "Nescafé",
    "",
    ""
  ],
  "i1707": [
    "Нескафе с молоком",
    "Nescafé con leche",
    "",
    ""
  ],
  "i1708": [
    "Турецкий кофе",
    "Café turco",
    "",
    ""
  ],
  "i1709": [
    "Турецкий чай",
    "Té turco",
    "",
    ""
  ],
  "i1710": [
    "Яблочный чай",
    "Té de manzana",
    "",
    ""
  ],
  "i1711": [
    "Зимний чай (френч-пресс)",
    "Té de invierno (prensa francesa)",
    "",
    ""
  ],
  "i1712": [
    "Зелёный чай",
    "Té verde",
    "",
    ""
  ],
  "i1713": [
    "Салеп",
    "Salep",
    "",
    ""
  ],
  "i1714": [
    "Горячий шоколад",
    "Chocolate caliente",
    "",
    ""
  ],
  "i1801": [
    "Ирландский кофе",
    "Café irlandés",
    "",
    ""
  ],
  "i1802": [
    "Кофе с Baileys",
    "Café con Baileys",
    "",
    ""
  ],
  "i1803": [
    "Глинтвейн",
    "Vino caliente",
    "",
    ""
  ],
  "i1901": [
    "Efes разливное 33 cl",
    "Efes de barril 33 cl",
    "",
    ""
  ],
  "i1902": [
    "Efes разливное 50 cl",
    "Efes de barril 50 cl",
    "",
    ""
  ],
  "i1903": [
    "Efes Malt",
    "Efes Malt",
    "",
    ""
  ],
  "i1904": [
    "Bomonti нефильтрованное",
    "Bomonti sin filtrar",
    "",
    ""
  ],
  "i1905": [
    "Bud",
    "Bud",
    "",
    ""
  ],
  "i1906": [
    "Heineken",
    "Heineken",
    "",
    ""
  ],
  "i1907": [
    "Corona",
    "Corona",
    "",
    ""
  ],
  "i1908": [
    "Miller",
    "Miller",
    "",
    ""
  ],
  "i1909": [
    "Beck's",
    "Beck's",
    "",
    ""
  ],
  "i2001": [
    "Орешки",
    "Frutos secos",
    "",
    ""
  ],
  "i2101": [
    "Yeni Rakı (бокал)",
    "Yeni Rakı (copa)",
    "",
    ""
  ],
  "i2201": [
    "Tokyo",
    "Tokyo",
    "",
    ""
  ],
  "i2202": [
    "Inferno",
    "Inferno",
    "",
    ""
  ],
  "i2203": [
    "Basilica Night",
    "Basilica Night",
    "",
    ""
  ],
  "i2204": [
    "Red Point",
    "Red Point",
    "",
    ""
  ],
  "i2205": [
    "Miami Angel",
    "Miami Angel",
    "",
    ""
  ],
  "i2206": [
    "Blue Istanbul",
    "Blue Istanbul",
    "",
    ""
  ],
  "i2301": [
    "Whiskey Sour",
    "Whiskey Sour",
    "",
    ""
  ],
  "i2302": [
    "Aperol Spritz",
    "Aperol Spritz",
    "",
    ""
  ],
  "i2303": [
    "Мохито",
    "Mojito",
    "",
    ""
  ],
  "i2304": [
    "Космополитен",
    "Cosmopolitan",
    "",
    ""
  ],
  "i2305": [
    "Martini Apple",
    "Martini Apple",
    "",
    ""
  ],
  "i2306": [
    "Негрони",
    "Negroni",
    "",
    ""
  ],
  "i2307": [
    "Sex on the Beach",
    "Sex on the Beach",
    "",
    ""
  ],
  "i2308": [
    "Пина колада",
    "Piña colada",
    "",
    ""
  ],
  "i2309": [
    "Маргарита",
    "Margarita",
    "",
    ""
  ],
  "i2310": [
    "Эспрессо мартини",
    "Espresso martini",
    "",
    ""
  ],
  "i2311": [
    "Лонг-Айленд",
    "Long Island",
    "",
    ""
  ],
  "i2312": [
    "Белый русский",
    "Ruso blanco",
    "",
    ""
  ],
  "i2313": [
    "Чёрный русский",
    "Ruso negro",
    "",
    ""
  ],
  "i2314": [
    "Куба либре",
    "Cuba libre",
    "",
    ""
  ],
  "i2315": [
    "Джин-тоник",
    "Gin tonic",
    "",
    ""
  ],
  "i2401": [
    "J&B",
    "J&B",
    "",
    ""
  ],
  "i2402": [
    "Johnnie Walker Red Label",
    "Johnnie Walker Red Label",
    "",
    ""
  ],
  "i2403": [
    "Johnnie Walker Black Label",
    "Johnnie Walker Black Label",
    "",
    ""
  ],
  "i2404": [
    "Dimple Golden Selection",
    "Dimple Golden Selection",
    "",
    ""
  ],
  "i2405": [
    "Бурбон",
    "Bourbon",
    "",
    ""
  ],
  "i2406": [
    "Jack Daniel's",
    "Jack Daniel's",
    "",
    ""
  ],
  "i2407": [
    "Jameson",
    "Jameson",
    "",
    ""
  ],
  "i2408": [
    "Chivas Regal",
    "Chivas Regal",
    "",
    ""
  ],
  "i2409": [
    "Ballantine's",
    "Ballantine's",
    "",
    ""
  ],
  "i2410": [
    "Jim Beam",
    "Jim Beam",
    "",
    ""
  ],
  "i2501": [
    "Beefeater",
    "Beefeater",
    "",
    ""
  ],
  "i2502": [
    "Gordon's",
    "Gordon's",
    "",
    ""
  ],
  "i2503": [
    "Bombay Sapphire",
    "Bombay Sapphire",
    "",
    ""
  ],
  "i2504": [
    "Hendrick's",
    "Hendrick's",
    "",
    ""
  ],
  "i2601": [
    "Istanblue",
    "Istanblue",
    "",
    ""
  ],
  "i2602": [
    "Smirnoff",
    "Smirnoff",
    "",
    ""
  ],
  "i2603": [
    "Absolut",
    "Absolut",
    "",
    ""
  ],
  "i2701": [
    "Красное вино (бокал)",
    "Vino tinto de la casa",
    "",
    ""
  ],
  "i2702": [
    "Белое вино (бокал)",
    "Vino blanco de la casa",
    "",
    ""
  ],
  "i2703": [
    "Розовое вино (бокал)",
    "Vino rosado de la casa",
    "",
    ""
  ],
  "i2704": [
    "Глинтвейн",
    "Vino caliente",
    "",
    ""
  ],
  "i2801": [
    "Шот текилы",
    "Chupito de tequila",
    "",
    ""
  ],
  "i2802": [
    "Zombie",
    "Zombie",
    "",
    ""
  ],
  "i2803": [
    "Smurf",
    "Smurf",
    "",
    ""
  ],
  "i2804": [
    "Панелька",
    "Panelka",
    "",
    ""
  ],
  "i2805": [
    "Sweet Dreams",
    "Sweet Dreams",
    "",
    ""
  ]
});

'use strict';

const STORAGE_KEY = 'fuego_menu_v1';
const ADMIN_PASS_KEY = 'fuego_admin_pass';
const DEFAULT_PASS = 'fuego2026';

const DEFAULT_DATA = {
  version: 2, // bump on every manual edit so stale admin drafts are discarded
  restaurant: {
    name: 'FUEGO',
    subtitle: 'SULTANAHMET',
    tagline: {
      tr: "Osmanlı'nın Ruhu, Modern Yorumu",
      en: 'The Soul of the Ottoman, Modern Interpretation'
    },
    phone: '+90 212 123 45 67',
    address: 'Sultanahmet Meydanı, Fatih, İstanbul',
    logo: '',
    currency: '₺'
  },
  categories: [
    { id: 'cat_1',  name: { tr: 'Kahvaltı',              en: 'Breakfast'            }, order: 0,  visible: true },
    { id: 'cat_2',  name: { tr: 'Soğuk Mezeler',          en: 'Cold Appetizers'      }, order: 1,  visible: true },
    { id: 'cat_3',  name: { tr: 'Sıcak Aperatifler',      en: 'Hot Appetizers'       }, order: 2,  visible: true },
    { id: 'cat_4',  name: { tr: 'Salatalar',              en: 'Salads'               }, order: 3,  visible: true },
    { id: 'cat_5',  name: { tr: 'Pide',                   en: 'Pita'                 }, order: 4,  visible: true },
    { id: 'cat_6',  name: { tr: 'Türk Kebapları',         en: 'Turkish Kebabs'       }, order: 5,  visible: true },
    { id: 'cat_7',  name: { tr: 'Osmanlı Spesiyalleri',   en: 'Ottoman Specialties'  }, order: 6,  visible: true },
    { id: 'cat_8',  name: { tr: 'Uluslararası Mutfak',    en: 'International Cuisine'}, order: 7,  visible: true },
    { id: 'cat_9',  name: { tr: 'Pizza',                  en: 'Pizza'                }, order: 8,  visible: true },
    { id: 'cat_10', name: { tr: 'Balık & Deniz Ürünleri', en: 'Fish & Seafood'       }, order: 9,  visible: true },
    { id: 'cat_11', name: { tr: 'Vejetaryan',             en: 'Vegetarian'           }, order: 10, visible: true },
    { id: 'cat_12', name: { tr: 'Makarna',                en: 'Pasta'                }, order: 11, visible: true },
    { id: 'cat_13', name: { tr: 'Tatlılar',               en: 'Desserts'             }, order: 12, visible: true },
    // ── İçecekler ──
    { id: 'cat_14', name: { tr: 'Soğuk İçecekler', en: 'Cold Beverages' }, order: 13, visible: true },
    { id: 'cat_15', name: { tr: 'Alkolsüz Kokteyller', en: 'Non-Alcoholic Cocktails' }, order: 14, visible: true },
    { id: 'cat_16', name: { tr: 'Taze Sıkma Meyve Suları', en: 'Fresh Juices' }, order: 15, visible: true },
    { id: 'cat_17', name: { tr: 'Sıcak İçecekler', en: 'Hot Beverages' }, order: 16, visible: true },
    { id: 'cat_18', name: { tr: 'Alkollü Sıcak İçecekler', en: 'Hot Drinks with Alcohol' }, order: 17, visible: true },
    { id: 'cat_19', name: { tr: 'Biralar', en: 'Beers' }, order: 18, visible: true },
    { id: 'cat_20', name: { tr: 'Çerez', en: 'Snacks' }, order: 19, visible: true },
    { id: 'cat_21', name: { tr: 'Rakı', en: 'Rakı' }, order: 20, visible: true },
    { id: 'cat_22', name: { tr: 'Fuego Özel Kokteyller', en: 'House Special Cocktails' }, order: 21, visible: true },
    { id: 'cat_23', name: { tr: 'Uluslararası Kokteyller', en: 'International Cocktails' }, order: 22, visible: true },
    { id: 'cat_24', name: { tr: 'Viski', en: 'Whiskey' }, order: 23, visible: true },
    { id: 'cat_25', name: { tr: 'Cin', en: 'Gin' }, order: 24, visible: true },
    { id: 'cat_26', name: { tr: 'Votka', en: 'Vodka' }, order: 25, visible: true },
    { id: 'cat_27', name: { tr: 'Şarap', en: 'Wine' }, order: 26, visible: true },
    { id: 'cat_28', name: { tr: 'Shot', en: 'Shots' }, order: 27, visible: true }
  ],
  items: [
    // ── Kahvaltı ──────────────────────────────────────────────────
    { id: 'i101', categoryId: 'cat_1', name: { tr: 'Serpme Kahvaltı (2 kişi)', en: 'Turkish Mix Breakfast (2 person)' }, description: { tr: 'Siyah zeytin, yeşil zeytin, salatalık, domates, 2 çeşit reçel, tereyağı, bal, beyaz peynir, kaşar, derin yağda börek, omlet, salam, pişi, sigara börek, kızarmış yumurta, Türk çayı', en: 'Black olive, green olive, cucumber, tomato, 2 kinds of jam, butter, honey, feta, kashar, deep fried börek, omelette, salami, pan fried egg, chocolate cream, nuts cream, french fries, free tea' }, price: 1590, image: 'images/01 Breakfast - Kahvalti/Turkish Mix Breakfast - Serpme Kahvalti.jpg', tags: [], badges: ['popular'], visible: true, order: 0 },
    { id: 'i102', categoryId: 'cat_1', name: { tr: 'Kahvaltı Tabağı', en: 'Breakfast Plate' }, description: { tr: 'Siyah/yeşil zeytin, salatalık, domates, bal, beyaz peynir, kaşar, çikolatalı krem, ceviz kreması, haşlanmış yumurta, Türk çayı', en: 'Black/green olive, cucumber, tomato, honey, feta, kashar, chocolate cream, nuts cream, boiled egg, Turkish tea' }, price: 870, image: 'images/01 Breakfast - Kahvalti/Breakfast Plate - Kahvalti Tabagi.jpg', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i103', categoryId: 'cat_1', name: { tr: 'Omlet — Sade',          en: 'Omelette — Plain'          }, description: { tr: '', en: '' }, price: 370, image: 'images/01 Breakfast - Kahvalti/Omelette - Omlet.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 2 },
    { id: 'i104', categoryId: 'cat_1', name: { tr: 'Omlet — Kaşarlı',       en: 'Omelette — Cheese'         }, description: { tr: '', en: '' }, price: 390, image: 'images/01 Breakfast - Kahvalti/Omelette - Omlet.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 3 },
    { id: 'i105', categoryId: 'cat_1', name: { tr: 'Omlet — Mantarlı Kaşar',en: 'Omelette — Mushroom Cheese'}, description: { tr: '', en: '' }, price: 390, image: 'images/01 Breakfast - Kahvalti/Omelette - Omlet.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 4 },
    { id: 'i106', categoryId: 'cat_1', name: { tr: 'Omlet — Karışık',       en: 'Omelette — Mixed'          }, description: { tr: '', en: '' }, price: 430, image: 'images/01 Breakfast - Kahvalti/Omelette - Omlet.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 5 },
    { id: 'i107', categoryId: 'cat_1', name: { tr: 'Menemen — Sade',        en: 'Turkish Omelette — Plain'  }, description: { tr: '', en: '' }, price: 370, image: 'images/01 Breakfast - Kahvalti/Menemen.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 6 },
    { id: 'i108', categoryId: 'cat_1', name: { tr: 'Menemen — Kaşarlı',     en: 'Turkish Omelette — Cheese' }, description: { tr: '', en: '' }, price: 390, image: 'images/01 Breakfast - Kahvalti/Menemen.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 7 },
    { id: 'i109', categoryId: 'cat_1', name: { tr: 'Menemen — Sucuklu',     en: 'Turkish Omelette — Sausage'}, description: { tr: '', en: '' }, price: 440, image: 'images/01 Breakfast - Kahvalti/Menemen.jpg', tags: [], badges: [], visible: true, order: 8 },

    // ── Soğuk Mezeler ─────────────────────────────────────────────
    { id: 'i201', categoryId: 'cat_2', name: { tr: 'Humus',                   en: 'Hummus'                      }, description: { tr: 'Nohut ezmesi, limon, tahin, sarımsak ve zeytinyağı', en: 'Pureed chickpeas with lemon, tahini, garlic and olive oil' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Hummus.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 0 },
    { id: 'i202', categoryId: 'cat_2', name: { tr: 'Yoğurtlu Semizotu',       en: 'Purslane Yogurt Garlic Sauce'}, description: { tr: 'Yoğurt ile semizotu, sarımsak ve herbs', en: 'Strained yogurt with purslane herbs and garlic' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Purslane Yogurt - Yogurtlu Semizotu.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 1 },
    { id: 'i203', categoryId: 'cat_2', name: { tr: 'Acılı Ezme',              en: 'Turkish Salsa Salad'          }, description: { tr: 'Domates, biber, soğan, maydanoz, nar ekşisi', en: 'A Southeast Turkish take on salsa with tomato, peppers, garlic, parsley and pomegranate molasses' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Turkish Salsa - Acili Ezme.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 2 },
    { id: 'i204', categoryId: 'cat_2', name: { tr: 'Patlıcan Şakşuka',        en: 'Aubergine Tomato Garlic Sauce'}, description: { tr: 'Kızartılmış patlıcan, domates sosu, sarımsak ve zeytinyağı', en: 'Fried aubergine in tomato sauce, olive oil and garlic sauce' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Aubergine Tomato - Patlican Saksuka.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 3 },
    { id: 'i205', categoryId: 'cat_2', name: { tr: 'Babaganuş',               en: 'Babagannus'                  }, description: { tr: 'Közlenmiş patlıcan ezmesi, limon, zeytinyağı ve sarımsak', en: 'Pureed grilled aubergine with lemon, olive oil and garlic' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Babagannus.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 4 },
    { id: 'i206', categoryId: 'cat_2', name: { tr: 'Zeytinyağlı Yaprak Sarma',en: 'Stuffed Grape Leaves'        }, description: { tr: 'Pirinç, soğan, nane, çam fıstığı, kuş üzümü ve tarçınla doldurulmuş üzüm yaprakları', en: 'Stuffed grape leaves with rice, onion, mint, pine nuts, currants and cinnamon' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Stuffed Grape Leaves - Yaprak Sarma.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 5 },
    { id: 'i207', categoryId: 'cat_2', name: { tr: 'Tahinli Patlıcan',        en: 'Aubergine Salad Sesame Sauce'}, description: { tr: 'Közlenmiş patlıcan, susam yağı ve sarımsaklı yoğurt sosu', en: 'Pureed grilled aubergine with sesame oil and garlic yogurt sauce' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Babagannus.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 6 },
    { id: 'i208', categoryId: 'cat_2', name: { tr: 'Havuç Tarator',           en: 'Carrot Tarator'              }, description: { tr: 'Havuç ve kabak sarımsaklı mayo sosu', en: 'Carrot and zucchini garlic mayo sauce' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Carrot Tarator - Havuc Tarator.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 7 },
    { id: 'i209', categoryId: 'cat_2', name: { tr: 'İmam Bayıldı',            en: "Imam's Favorite"             }, description: { tr: 'Çeşitli taze sebzelerle doldurulmuş kızartılmış ve fırınlanmış patlıcan', en: 'Fried and baked eggplants filled with a variety of fresh vegetables' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Imams Favorite - Imam Bayildi.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 8 },
    { id: 'i210', categoryId: 'cat_2', name: { tr: 'Haydari',                 en: 'Caciki'                      }, description: { tr: '', en: '' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Caciki - Haydari.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 9 },
    { id: 'i211', categoryId: 'cat_2', name: { tr: 'Karışık Meze Tabağı (2 kişi)', en: 'Mixed Appetizer Plate (2 pax)'}, description: { tr: '', en: '' }, price: 0, image: 'images/02 Cold Appetizers - Mezeler/Mixed Appetizer Plate - Karisik Meze.jpg', tags: ['vegetarian'], badges: ['popular'], visible: true, order: 10 },

    // ── Sıcak Aperatifler ─────────────────────────────────────────
    { id: 'i301', categoryId: 'cat_3', name: { tr: 'Çorba',           en: 'Soup'               }, description: { tr: 'Tavuk / Domates / Mercimek', en: 'Chicken / Tomato / Lentil' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i302', categoryId: 'cat_3', name: { tr: 'Patates Cips',    en: 'French Fries'       }, description: { tr: '', en: '' }, price: 0, image: '', tags: ['vegetarian'], badges: [], visible: true, order: 1 },
    { id: 'i303', categoryId: 'cat_3', name: { tr: 'Sigara Böreği',   en: 'Cheese Roll Pastry' }, description: { tr: 'Yoğurt sosu ile rulo kızartılmış börek', en: 'Rolled fried börek with yoghurt sauce on the side' }, price: 0, image: 'images/03 Hot Appetizers - Sicak Aperatifler/Cheese Roll Pastry - Sigara Borek.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 2 },
    { id: 'i304', categoryId: 'cat_3', name: { tr: 'Falafel (250gr)', en: 'Falafel (250gr)'    }, description: { tr: '', en: '' }, price: 0, image: 'images/03 Hot Appetizers - Sicak Aperatifler/Falafel.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 3 },
    { id: 'i305', categoryId: 'cat_3', name: { tr: 'Kalamar Tava (350gr)', en: 'Fried Calamari (350gr)'}, description: { tr: '', en: '' }, price: 0, image: 'images/03 Hot Appetizers - Sicak Aperatifler/Fried Calamari - Kalamar Tava.jpg', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i306', categoryId: 'cat_3', name: { tr: 'Izgara Hellim Peyniri (200gr)', en: 'Grilled Helloumi (200gr)'}, description: { tr: '', en: '' }, price: 0, image: 'images/03 Hot Appetizers - Sicak Aperatifler/Grilled Halloumi - Izgara Hellim.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 5 },
    { id: 'i307', categoryId: 'cat_3', name: { tr: 'İçli Köfte (250gr)', en: 'Meatballs Stuffed Cracked Wheat (250gr)'}, description: { tr: 'Kırık buğday kaplı kızartılmış köfte', en: 'Stuffed fried meatballs covered cracked wheat' }, price: 0, image: 'images/03 Hot Appetizers - Sicak Aperatifler/Icli Kofte.jpg', tags: [], badges: [], visible: true, order: 6 },

    // ── Salatalar ─────────────────────────────────────────────────
    { id: 'i401', categoryId: 'cat_4', name: { tr: 'Çoban Salatası',    en: "Shepherd Salad"   }, description: { tr: 'Domates, salatalık, yeşil biber, geleneksel Türk salatası', en: 'Tomatoes, cucumbers, green peppers, the traditional Turkish salad of finely chopped red onions, pomegranate molasses' }, price: 0, image: 'images/04 Salads - Salatalar/Shepherd Salad - Coban Salata.jpg', tags: ['vegan'], badges: [], visible: true, order: 0 },
    { id: 'i402', categoryId: 'cat_4', name: { tr: 'Mevsim Salatası',   en: 'Seasonal Salad'   }, description: { tr: 'Marul, turşu kırmızı lahana, havuç, salatalık, mısır, zeytinyağı, limon, roka', en: 'Iceberg lettuce, pickled red cabbage, grated carrot, tomatoes, cucumbers, corn, oil, lemon, arugula leaves' }, price: 0, image: 'images/04 Salads - Salatalar/Seasonal Salad - Mevsim Salata.jpg', tags: ['vegan'], badges: [], visible: true, order: 1 },
    { id: 'i403', categoryId: 'cat_4', name: { tr: 'Hellim Salatası',   en: 'Halloumi Salad'   }, description: { tr: 'Akdeniz yeşillikleri, kiraz domates, zeytin ve ızgara hellim peyniri', en: 'Mediterranean greens, cherry tomatoes, olive and grilled hellim (haloumi) cheese' }, price: 0, image: 'images/04 Salads - Salatalar/Halloumi Salad - Hellim Salatasi.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 2 },
    { id: 'i404', categoryId: 'cat_4', name: { tr: 'Ton Balık Salatası',en: 'Tuna Salad'        }, description: { tr: 'Marul, ton balığı, kapari, zeytin, salatalık, kırmızı soğan, turşu, havuç', en: 'Iceberg lettuce, tuna, corn, capers, olive, cucumbers red onion, pickles, carrot' }, price: 0, image: 'images/04 Salads - Salatalar/Tuna Salad - Ton Balik Salatasi.jpg', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i405', categoryId: 'cat_4', name: { tr: 'Sezar Salatası',    en: 'Caesar Salad'      }, description: { tr: 'Romaine marul, parmesan, geleneksel Sezar sos, ızgara tavuk ve kiraz domates', en: 'Romaine lettuce, grated parmesan cheese and traditional Caesar dressing, topped with grilled chicken and cherry tomatoes' }, price: 0, image: 'images/04 Salads - Salatalar/Caesar Salad.jpg', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i406', categoryId: 'cat_4', name: { tr: 'Yunan Salatası',    en: 'Greek Salad'       }, description: { tr: 'Domates, salatalık, soğan, zeytin salatası, genç beyaz peynir ve zeytin ile', en: 'Tomato, cucumber, onion, salad, topped with young feta cheese and olives' }, price: 0, image: 'images/04 Salads - Salatalar/Greek Salad - Yunan Salatasi.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 5 },
    { id: 'i407', categoryId: 'cat_4', name: { tr: 'Karides Salata',    en: 'Shrimp Salad'      }, description: { tr: 'Marul, mısır, kapari, kiraz domates, salatalık kırmızı soğan, turşu, havuç, karidesle servis', en: 'Iceberg lettuce, corn, capers cherry tomatoes, cucumbers red onion, pickles, carrot, topped by shrimp' }, price: 0, image: 'images/04 Salads - Salatalar/Shrimp Salad - Karides Salata.jpg', tags: [], badges: [], visible: true, order: 6 },
    { id: 'i408', categoryId: 'cat_4', name: { tr: 'Biftek Salatası',   en: 'Steak Salad'       }, description: { tr: 'Marul, mısır, kapari, kiraz domates, salatalık kırmızı soğan, turşu, havuç, ızgara biftek ile', en: 'Iceberg lettuce, corn, capers cherry tomatoes, cucumbers red onion, pickles, carrot, topped by grilled steak' }, price: 0, image: 'images/04 Salads - Salatalar/Steak Salad - Biftek Salata.jpg', tags: [], badges: [], visible: true, order: 7 },

    // ── Pide ──────────────────────────────────────────────────────
    { id: 'i501', categoryId: 'cat_5', name: { tr: 'Kaşarlı Pide',      en: 'Pita Cheese'      }, description: { tr: '', en: '' }, price: 0, image: 'images/05 Pita - Pide/Pita Cheese - Kasarli Pide.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 0 },
    { id: 'i502', categoryId: 'cat_5', name: { tr: 'Kıymalı Pide',      en: 'Pita Minced Meat' }, description: { tr: '', en: '' }, price: 0, image: 'images/05 Pita - Pide/Pita Minced Meat - Kiymali Pide.jpg', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i503', categoryId: 'cat_5', name: { tr: 'Kuşbaşılı Pide',    en: 'Pita Cubed Meat'  }, description: { tr: '', en: '' }, price: 0, image: 'images/05 Pita - Pide/Pita Cubed Meat - Kusbasili Pide.jpg', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i504', categoryId: 'cat_5', name: { tr: 'Vejeteryan Pide',   en: 'Pita Vegi'        }, description: { tr: '', en: '' }, price: 0, image: 'images/05 Pita - Pide/Pita Vegi - Vejetaryen Pide.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 3 },
    { id: 'i505', categoryId: 'cat_5', name: { tr: 'Pastırmalı Pide',   en: 'Pita Pastrami'    }, description: { tr: '', en: '' }, price: 0, image: 'images/05 Pita - Pide/Pita Pastrami - Pastirmali Pide.jpg', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i506', categoryId: 'cat_5', name: { tr: 'Tavuklu Pide',      en: 'Pita Chicken'     }, description: { tr: '', en: '' }, price: 0, image: 'images/05 Pita - Pide/Pita Chicken - Tavuklu Pide.jpg', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i507', categoryId: 'cat_5', name: { tr: 'Karışık Pide',      en: 'Pita Mix'         }, description: { tr: '', en: '' }, price: 0, image: 'images/05 Pita - Pide/Pita Mix - Karisik Pide.jpg', tags: [], badges: ['popular'], visible: true, order: 6 },
    { id: 'i508', categoryId: 'cat_5', name: { tr: 'Puf Ekmeği',        en: 'Pita Puf'         }, description: { tr: '', en: '' }, price: 0, image: '', tags: ['vegetarian'], badges: [], visible: true, order: 7 },

    // ── Türk Kebapları ────────────────────────────────────────────
    { id: 'i601', categoryId: 'cat_6', name: { tr: 'Şiş Kebap (200gr)',          en: 'Chicken Shish Kebab (200gr)'    }, description: { tr: 'Izgara tavuk şiş, buğday pilavı, domates, yeşil biber, lavash', en: 'Skewered Chicken served With Wheat Pilaf, Grilled Tomato, Green Pepper, Lavash Bread' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Chicken Shish Kebab - Tavuk Sis.jpg', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i602', categoryId: 'cat_6', name: { tr: 'Izgara Köfte (200gr)',        en: 'Grilled Meatballs (200gr)'      }, description: { tr: 'Türk baharatlarıyla hazırlanmış ızgara et topları, buğday pilavı, domates, biber, lavash', en: 'A mixture of Grilled Beef Balls with Turkish Spices expertly Served Wheat Pilaf, Grilled Tomato, Onion, Green Pepper, Lavash Bread' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Grilled Meatballs - Izgara Kofte.jpg', tags: [], badges: ['popular'], visible: true, order: 1 },
    { id: 'i603', categoryId: 'cat_6', name: { tr: 'Adana Kebap (180gr)',         en: 'Adana Kebab (180gr)'            }, description: { tr: 'El yapımı acılı kebap, buğday pilavı, domates, biber, soğan, lavash', en: 'Hand-chopped Beef Marinated in Traditional Spice Mixture Served Wheat Pilaf, Grilled Tomato, Green Pepper, Onion, Lavash Bread' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Adana Kebab.jpg', tags: [], badges: ['popular'], visible: true, order: 2 },
    { id: 'i604', categoryId: 'cat_6', name: { tr: 'Tavuk Pirzola Izgara (250gr)',en: 'Grilled Chicken Chops (250gr)'  }, description: { tr: 'Izgara tavuk pirzola, domates, yeşil biber, soğan, salata, lavash', en: 'Chicken chops Served Grilled Tomato, Green Pepper, Onion, Salad' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Grilled Chicken Chops - Tavuk Pirzola.jpg', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i605', categoryId: 'cat_6', name: { tr: 'Tavuk Kanat Izgara (250gr)',  en: 'Grilled Chicken Wings (250gr)'  }, description: { tr: 'Izgara tavuk kanat, buğday pilavı, domates, biber, soğan, salata, lavash', en: 'Chicken wings Served With Wheat Pilaf, Grilled Tomato, Onion, Green Pepper, Onion, Salad, Lavash Bread' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Grilled Chicken Wings - Tavuk Kanat.jpg', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i606', categoryId: 'cat_6', name: { tr: 'İskender Kebap (180gr)',      en: 'İskender Kebab (180gr)'         }, description: { tr: 'Üzerine döner dilimleri, domates, biber konulan tereyağlı pide, geleneksel sosu ile', en: 'Chopped pide bread browned in butter, topped with doner, tomato slices, peppers, traditional İskender sauce and traditional sauce and butter sauce' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Iskender Kebab.jpg', tags: [], badges: ['popular'], visible: true, order: 5 },
    { id: 'i607', categoryId: 'cat_6', name: { tr: 'Kuzu Şiş (200gr)',           en: 'Lamb Shish Kebab (200gr)'       }, description: { tr: 'Izgara kuzu şiş, buğday pilavı, domates, yeşil biber, sebze, lavash', en: 'Skewered Lamb Fillet served With Wheat Pilaf, Grilled Tomato, Green Pepper, Buttered Vegetables, Lavash Bread' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Lamb Shish Kebab - Kuzu Sis.jpg', tags: [], badges: [], visible: true, order: 6 },
    { id: 'i608', categoryId: 'cat_6', name: { tr: 'Dana Şaşlık (200gr)',        en: 'Shaslik Kebab (200gr)'          }, description: { tr: 'Izgara dana şiş, buğday pilavı, domates, yeşil biber, lavash', en: 'Skewered Beef Fillet served, Wheat Pilaf, Grilled Tomato, Green Pepper, Buttered Vegetables, Lavash Bread' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 7 },
    { id: 'i609', categoryId: 'cat_6', name: { tr: 'Hamburger (125gr)',          en: 'Hamburger (125gr)'              }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 8 },
    { id: 'i610', categoryId: 'cat_6', name: { tr: 'Cheeseburger (125gr)',       en: 'Cheeseburger (125gr)'           }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 9 },
    { id: 'i611', categoryId: 'cat_6', name: { tr: 'Kuzu Pirzola (300gr)',       en: 'Lamb Chops (300gr)'             }, description: { tr: 'Marine kuzu pirzola, buğday pilavı, domates, yeşil biber, soğan, salata, lavash', en: 'Lamb Marinated Spice Mixture, Served With Wheat Pilaf, Grilled Tomato, Green Pepper, Onion, Salad, Lavash Bread' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Lamb Chops - Kuzu Pirzola.jpg', tags: [], badges: ['popular'], visible: true, order: 10 },
    { id: 'i612', categoryId: 'cat_6', name: { tr: 'Beyti Sarma (200gr)',        en: 'Beyti Sarma (200gr)'            }, description: { tr: 'Özel baharatlarla kıyılmış et, lavash ekmeğine sarılı', en: 'Hand-Chopped Beef Marinated in Traditional Spice Mixture, rolled with lavash bread served with yogurt sauces' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Beyti Sarma.jpg', tags: [], badges: [], visible: true, order: 11 },
    { id: 'i613', categoryId: 'cat_6', name: { tr: 'Dürüm — Tavuk Döner (140gr)',en: 'Doner Wrap — Chicken (140gr)'   }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 12 },
    { id: 'i614', categoryId: 'cat_6', name: { tr: 'Dürüm — Et Döner (140gr)',  en: 'Doner Wrap — Beef (140gr)'      }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 13 },
    { id: 'i615', categoryId: 'cat_6', name: { tr: 'Adana Dürüm (180gr)',       en: 'Kebap Wrap (180gr)'             }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 14 },
    { id: 'i616', categoryId: 'cat_6', name: { tr: 'Karışık Kebap — 1 kişi (500gr)',  en: 'Mixed Kebab — 1 person (500gr)' }, description: { tr: 'Adana kebap, tavuk şiş, kuzu şiş, tavuk kanat, ızgara köfte, buğday pilavı, domates, yeşil biber, lavash', en: 'Adana kebab, chicken shish, lamb shish, chicken wings, grilled meatballs Marinated In Spices Served Wheat Pilaf, Grilled Tomato, Green Pepper, Buttered Vegetables, Lavash Bread' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Mixed Kebab - Karisik Kebap.jpg', tags: [], badges: ['popular'], visible: true, order: 15 },
    { id: 'i617', categoryId: 'cat_6', name: { tr: 'Karışık Kebap — 2 kişi (1.000gr)', en: 'Mixed Kebab — 2 persons (1.000gr)'}, description: { tr: '', en: '' }, price: 0, image: 'images/07 Kebabs - Kebaplar/Mixed Kebab - Karisik Kebap.jpg', tags: [], badges: ['popular'], visible: true, order: 16 },

    // ── Osmanlı Spesiyalleri ──────────────────────────────────────
    { id: 'i701', categoryId: 'cat_7', name: { tr: 'Hünkar Beğendi (200gr)',              en: "Sultan's Favorite (200gr)"       }, description: { tr: 'Közlenmiş patlıcan püresi üzerine fırınlanmış kuzu, özel sos', en: 'Pureed aubergine topped with roasted lamb with in special sauce' }, price: 0, image: 'images/08 Ottoman Specialties/Sultans Favorite - Hunkar Begendi.jpg', tags: [], badges: ['popular'], visible: true, order: 0 },
    { id: 'i702', categoryId: 'cat_7', name: { tr: 'Pirzola Güveç (300gr)',               en: 'Lamb Chops Casserole (300gr)'    }, description: { tr: '', en: '' }, price: 0, image: 'images/08 Ottoman Specialties/Lamb Chops Casserole - Pirzola Guvec.jpg', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i703', categoryId: 'cat_7', name: { tr: 'Çökertme Kebabı (200gr)',             en: 'Çökertme Kebab (200gr)'          }, description: { tr: 'Kızartılmış patates ve sebze, yoğurt üzerine ızgara et', en: 'Fried potatoes and vegetable, Grilled Beef Kebab with tomato sauce' }, price: 0, image: 'images/08 Ottoman Specialties/Cokertme Kebab.jpg', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i704', categoryId: 'cat_7', name: { tr: 'Testi Kebabı — Kuzu (400gr)',         en: 'Pottery Kebab — Lamb (400gr)'    }, description: { tr: '', en: '' }, price: 0, image: 'images/08 Ottoman Specialties/Pottery Kebab - Testi Kebabi.jpg', tags: [], badges: ['popular'], visible: true, order: 3 },
    { id: 'i705', categoryId: 'cat_7', name: { tr: 'Testi Kebabı — Tavuk (200gr)',        en: 'Pottery Kebab — Chicken (200gr)' }, description: { tr: '', en: '' }, price: 0, image: 'images/08 Ottoman Specialties/Pottery Kebab - Testi Kebabi.jpg', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i706', categoryId: 'cat_7', name: { tr: 'Testi Kebabı — Dana (400gr)',         en: 'Pottery Kebab — Beef (400gr)'    }, description: { tr: '', en: '' }, price: 0, image: 'images/08 Ottoman Specialties/Pottery Kebab - Testi Kebabi.jpg', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i707', categoryId: 'cat_7', name: { tr: 'Testi Kebabı — Vejeteryan (600gr)',   en: 'Pottery Kebab — Vegetarian (600gr)'}, description: { tr: '', en: '' }, price: 0, image: 'images/08 Ottoman Specialties/Pottery Kebab - Testi Kebabi.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 6 },
    { id: 'i708', categoryId: 'cat_7', name: { tr: 'Çoban Kavurma — Kuzu (200gr)',        en: "Shepherd's Kebab — Lamb (200gr)" }, description: { tr: 'Marine kuzu/sığır/tavuk but eti, bebek soğan, domates, biber, mantar, sarımsak ve kekik', en: 'Marinated thinly-cut lamb/beef/chicken shank sautéed with baby onions, tomatoes, peppers, mushrooms garlic and thyme' }, price: 0, image: 'images/08 Ottoman Specialties/Lamb Shepherds Kebab - Kuzu Coban Kavurma.jpg', tags: [], badges: [], visible: true, order: 7 },
    { id: 'i709', categoryId: 'cat_7', name: { tr: 'Çoban Kavurma — Tavuk (200gr)',       en: "Shepherd's Kebab — Chicken (200gr)"}, description: { tr: '', en: '' }, price: 0, image: 'images/08 Ottoman Specialties/Chicken Shepherds Kebab - Tavuk Coban Kavurma.jpg', tags: [], badges: [], visible: true, order: 8 },
    { id: 'i710', categoryId: 'cat_7', name: { tr: 'Ali Nazik Kebap (180gr)',             en: 'Ali Nazik Kebab (180gr)'         }, description: { tr: 'Zeytinyağı, yoğurt ve baharatla marine, kömür közlenmiş patlıcan üzerinde', en: 'Hand-chopped beef marinated in olive oil, yogurt and spices grilled on a skewer, arranged on a bed of charcoal-roasted eggplant topped with a butter sauce' }, price: 0, image: 'images/08 Ottoman Specialties/Ali Nazik Kebab.jpg', tags: [], badges: [], visible: true, order: 9 },
    { id: 'i711', categoryId: 'cat_7', name: { tr: 'Musakka',                             en: 'Moussakka'                       }, description: { tr: 'Derin yağda kızartılmış patlıcan, ince kıyılmış et, soğan, biber, domates ile servis', en: 'A Split Fried Aubergine with Finely Chopped Beef sautéed with Onion, Peppers, Tomato. Served rice' }, price: 0, image: 'images/08 Ottoman Specialties/Moussaka - Musakka.jpg', tags: [], badges: [], visible: true, order: 10 },
    { id: 'i712', categoryId: 'cat_7', name: { tr: 'Kuzu İncik (350–400gr)',              en: 'Lamb Shank (350–400gr)'          }, description: { tr: 'Fırında pişmiş kuzu incik, patlıcan püresi', en: 'Pureed aubergine topped with overed lamb shank' }, price: 0, image: 'images/08 Ottoman Specialties/Lamb Shank - Kuzu Incik.jpg', tags: [], badges: ['popular'], visible: true, order: 11 },

    // ── Uluslararası Mutfak ───────────────────────────────────────
    { id: 'i801', categoryId: 'cat_8', name: { tr: 'Bonfile (240gr)',              en: 'Filet Mignon (240gr)'              }, description: { tr: 'Izgara sebze ve patates kızartması ile servis', en: 'Served with grilled vegetables and fried potatoes' }, price: 0, image: 'images/11 International Cuisine/Filet Mignon - Bonfile.jpg', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i802', categoryId: 'cat_8', name: { tr: 'Karabiberli Filet Mignon',     en: '* With Black Peppercorn Sauce'      }, description: { tr: '', en: '' }, price: 0, image: 'images/11 International Cuisine/Filet Mignon - Bonfile.jpg', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i803', categoryId: 'cat_8', name: { tr: 'Mantar Soslu Steak',           en: '* With Mushroom Sauce'              }, description: { tr: '', en: '' }, price: 0, image: 'images/11 International Cuisine/Filet Mignon Mushroom Sauce - Mantar Soslu.jpg', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i804', categoryId: 'cat_8', name: { tr: 'Meksika Soslu Steak',          en: '* With Mexican Sauce'               }, description: { tr: '', en: '' }, price: 0, image: 'images/11 International Cuisine/Filet Mignon - Bonfile.jpg', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i805', categoryId: 'cat_8', name: { tr: 'Fajita — Et (200gr)',          en: 'Fajita — Beef (200gr)'              }, description: { tr: '', en: '' }, price: 0, image: 'images/11 International Cuisine/Beef Fajita.jpg', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i806', categoryId: 'cat_8', name: { tr: 'Fajita — Tavuk (200gr)',       en: 'Fajita — Chicken (200gr)'           }, description: { tr: '', en: '' }, price: 0, image: 'images/11 International Cuisine/Chicken Fajita.jpg', tags: [], badges: [], visible: true, order: 5 },

    // ── Pizza ─────────────────────────────────────────────────────
    { id: 'i901', categoryId: 'cat_9', name: { tr: 'Kaşarlı Pizza',       en: 'Margarita Pizza'  }, description: { tr: '', en: '' }, price: 0, image: 'images/06 Pizza/Margarita Pizza.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 0 },
    { id: 'i902', categoryId: 'cat_9', name: { tr: 'Fuego Karışık',       en: 'Fuego Mix'        }, description: { tr: '', en: '' }, price: 0, image: 'images/06 Pizza/Fuego Mix Pizza.jpg', tags: [], badges: ['popular'], visible: true, order: 1 },
    { id: 'i903', categoryId: 'cat_9', name: { tr: 'Vejeteryan Pizza',    en: 'Vegi Pizza'       }, description: { tr: '', en: '' }, price: 0, image: 'images/06 Pizza/Vegi Pizza.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 2 },
    { id: 'i904', categoryId: 'cat_9', name: { tr: 'Dönerli Pizza',       en: 'Doner Pizza'      }, description: { tr: '', en: '' }, price: 0, image: 'images/06 Pizza/Doner Pizza - Donerli Pizza.jpg', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i905', categoryId: 'cat_9', name: { tr: 'Tavuklu Pizza',       en: 'Pizza Chicken'    }, description: { tr: '', en: '' }, price: 0, image: 'images/06 Pizza/Pizza Chicken - Tavuklu Pizza.jpg', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i906', categoryId: 'cat_9', name: { tr: 'Mexican Acılı Pizza', en: 'Mexican Hot'      }, description: { tr: '', en: '' }, price: 0, image: 'images/06 Pizza/Mexican Hot Pizza.jpg', tags: ['spicy'], badges: [], visible: true, order: 5 },

    // ── Balık & Deniz Ürünleri ────────────────────────────────────
    { id: 'i1001', categoryId: 'cat_10', name: { tr: 'Çupra Izgara (450–400gr)',              en: 'Grilled Sea Bream (450–400gr)'          }, description: { tr: 'Roka, kırmızı soğan, domates, limon ile', en: 'Served with arugula, red onion, tomato, lemon' }, price: 0, image: 'images/12 Fish and Seafood - Balik/Grilled Sea Bream - Cupra Izgara.jpg', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i1002', categoryId: 'cat_10', name: { tr: 'Izgara Levrek (450–400gr)',             en: 'Grilled Sea Bass (450–400gr)'           }, description: { tr: 'Roka, kırmızı soğan, domates, limon ile', en: 'Served with arugula, red onion, tomato, lemon' }, price: 0, image: 'images/12 Fish and Seafood - Balik/Grilled Sea Bass - Levrek Izgara.jpg', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i1003', categoryId: 'cat_10', name: { tr: 'Tereyağlı Karides Güveç (120gr)',      en: 'Buttered Shrimps Casserole (120gr)'     }, description: { tr: '', en: '' }, price: 0, image: 'images/12 Fish and Seafood - Balik/Shrimps Casserole - Karides Guvec.jpg', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i1004', categoryId: 'cat_10', name: { tr: 'Levrek Buğulama (350gr)',              en: 'Steamed Sea Bass (350gr)'               }, description: { tr: '', en: '' }, price: 0, image: 'images/12 Fish and Seafood - Balik/Steamed Sea Bass - Levrek Bugulama.jpg', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i1005', categoryId: 'cat_10', name: { tr: 'Somon Izgara (350gr)',                 en: 'Grilled Salmon (350gr)'                 }, description: { tr: 'Roka, kırmızı soğan, domates, limon ile', en: 'Served with arugula, red onion, tomato, lemon' }, price: 0, image: 'images/12 Fish and Seafood - Balik/Grilled Salmon - Somon Izgara.jpg', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i1006', categoryId: 'cat_10', name: { tr: 'Kalamar Tava (350gr)',                 en: 'Fried Calamari (350gr)'                 }, description: { tr: '', en: '' }, price: 0, image: 'images/12 Fish and Seafood - Balik/Fried Calamari - Kalamar Tava.jpg', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i1007', categoryId: 'cat_10', name: { tr: 'Jumbo Karides',                        en: 'Jumbo Shrimp'                           }, description: { tr: 'Günlük fiyat', en: 'Daily price' }, price: 0, image: 'images/12 Fish and Seafood - Balik/Jumbo Shrimp - Jumbo Karides.jpg', tags: [], badges: [], visible: true, order: 6 },

    // ── Vejetaryan ────────────────────────────────────────────────
    { id: 'i1101', categoryId: 'cat_11', name: { tr: 'Sebzeli Karnıyarık', en: 'Stuffed Aubergine'    }, description: { tr: 'Mantar, havuç, kabak, patlıcan, domates ve biberli fırın güveç', en: 'An oven-baked casserole of mushrooms, zucchini, carrots, eggplant, tomatoes and peppers' }, price: 0, image: 'images/10 Vegetarian - Vejetaryen/Stuffed Aubergine - Sebzeli Karniyarik.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 0 },
    { id: 'i1102', categoryId: 'cat_11', name: { tr: 'Sebzeli Güveç',      en: 'Vegetables Casserole' }, description: { tr: 'Mantar, havuç, kabak, patlıcan, domates ve biber fırın güveç', en: 'An oven-baked casserole of mushrooms, zucchini, carrots, eggplant, tomatoes and peppers' }, price: 0, image: 'images/10 Vegetarian - Vejetaryen/Vegetables Casserole - Sebzeli Guvec.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 1 },
    { id: 'i1103', categoryId: 'cat_11', name: { tr: 'Mantar Güveç',       en: 'Mushroom Casserole'   }, description: { tr: 'Kızartılmış mantar ve sebze', en: 'Roasted mushrooms and vegetable' }, price: 0, image: 'images/10 Vegetarian - Vejetaryen/Mushroom Casserole - Mantar Guvec.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 2 },

    // ── Makarna ───────────────────────────────────────────────────
    { id: 'i1201', categoryId: 'cat_12', name: { tr: 'İspanaklı (Penne/Linguini)',   en: 'Spinach (Penne/Linguini)'  }, description: { tr: '', en: '' }, price: 0, image: 'images/09 Pasta - Makarna/Pasta Spinach - Ispanakli.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 0 },
    { id: 'i1202', categoryId: 'cat_12', name: { tr: 'Karidesli (Penne/Linguini)',   en: 'Shrimps (Penne/Linguini)'  }, description: { tr: '', en: '' }, price: 0, image: 'images/09 Pasta - Makarna/Pasta Shrimps - Karidesli.jpg', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i1203', categoryId: 'cat_12', name: { tr: 'Alla Napolitana (Penne/Linguine)', en: 'Alla Napolitana (Penne/Linguine)'}, description: { tr: 'Domates sosu, taze fesleğen ve parmesan', en: 'Tomato sauce, fresh basil and parmesan cheese' }, price: 0, image: '', tags: ['vegetarian'], badges: [], visible: true, order: 2 },
    { id: 'i1204', categoryId: 'cat_12', name: { tr: 'Alla Bolognese (Penne/Linguine)', en: 'Alla Bolognese (Penne/Linguine)'}, description: { tr: 'Et sosu, taze fesleğen ve parmesan', en: 'Meat sauce, fresh basil and parmesan cheese' }, price: 0, image: 'images/09 Pasta - Makarna/Pasta Alla Bolognese.jpg', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i1205', categoryId: 'cat_12', name: { tr: 'Kremalı Tavuklu (Penne/Linguine)', en: 'Alfredo (Penne/Linguine)' }, description: { tr: 'Jülyen tavuk, havuç, kabak, soğan, paprika ve krema sosu', en: 'Julienned chicken, carrots, zucchini, onion, paprika and cream sauce' }, price: 0, image: 'images/09 Pasta - Makarna/Pasta Alfredo.jpg', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i1206', categoryId: 'cat_12', name: { tr: 'Ton Balıklı (Penne/Linguini)', en: 'Tuna Fish (Penne/Linguini)' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i1207', categoryId: 'cat_12', name: { tr: 'Alla Arrabiata (Penne/Linguine)', en: 'Alla Arrabiata (Penne/Linguine)'}, description: { tr: 'Acılı domates sosu, zeytin, taze fesleğen ve parmesan', en: 'Spicy tomato sauce, sliced olives, fresh basil and parmesan cheese' }, price: 0, image: 'images/09 Pasta - Makarna/Pasta Alla Arrabbiata.jpg', tags: ['vegetarian', 'spicy'], badges: [], visible: true, order: 6 },
    { id: 'i1208', categoryId: 'cat_12', name: { tr: 'Mantı',              en: 'Turkish Ravioli (Mantı)' }, description: { tr: 'El yapımı mantı, yoğurt ve acı tereyağı sosu', en: 'Turkish-style "ravioli" with chopped meat, topped with yogurt and peppery butter sauce' }, price: 0, image: 'images/09 Pasta - Makarna/Manti.jpg', tags: [], badges: ['popular'], visible: true, order: 7 },

    // ── Tatlılar ──────────────────────────────────────────────────
    { id: 'i1301', categoryId: 'cat_13', name: { tr: 'Yoğurtlu Meyve (Maseduan)', en: 'Maseduan'    }, description: { tr: '', en: '' }, price: 0, image: 'images/13 Desserts - Tatlilar/Maseduan - Yogurtlu Meyve.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 0 },
    { id: 'i1302', categoryId: 'cat_13', name: { tr: 'Meyve Kovası',              en: 'Fruit Box'   }, description: { tr: '', en: '' }, price: 0, image: 'images/13 Desserts - Tatlilar/Fruit Box - Meyve Kovasi.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 1 },
    { id: 'i1303', categoryId: 'cat_13', name: { tr: 'Dondurma',                  en: 'Ice Cream'   }, description: { tr: '', en: '' }, price: 0, image: 'images/13 Desserts - Tatlilar/Ice Cream - Dondurma.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 2 },
    { id: 'i1304', categoryId: 'cat_13', name: { tr: 'Baklava',                   en: 'Baklava'     }, description: { tr: '', en: '' }, price: 0, image: 'images/13 Desserts - Tatlilar/Baklava.jpg', tags: ['vegetarian'], badges: ['popular'], visible: true, order: 3 },
    { id: 'i1305', categoryId: 'cat_13', name: { tr: 'Künefe',                    en: 'Künefe'      }, description: { tr: '', en: '' }, price: 0, image: 'images/13 Desserts - Tatlilar/Kunefe.jpg', tags: ['vegetarian'], badges: ['popular'], visible: true, order: 4 },
    { id: 'i1306', categoryId: 'cat_13', name: { tr: 'Katmer',                    en: 'Katmer'      }, description: { tr: '', en: '' }, price: 0, image: 'images/13 Desserts - Tatlilar/Katmer.jpg', tags: ['vegetarian'], badges: [], visible: true, order: 5 },
    // ── İçecekler (fiyatlar sonra girilecek) ──
    { id: 'i1401', categoryId: 'cat_14', name: { tr: 'Coca-Cola / Zero / Light', en: 'Coca-Cola / Zero / Light' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i1402', categoryId: 'cat_14', name: { tr: 'Fanta', en: 'Fanta' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i1403', categoryId: 'cat_14', name: { tr: 'Sprite', en: 'Sprite' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i1404', categoryId: 'cat_14', name: { tr: 'Ice Tea (Limon / Şeftali)', en: 'Ice Tea (Lemon / Peach)' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i1405', categoryId: 'cat_14', name: { tr: 'Ayran', en: 'Ayran' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i1406', categoryId: 'cat_14', name: { tr: 'Maden Suyu (Küçük)', en: 'Sparkling Water (Small)' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i1407', categoryId: 'cat_14', name: { tr: 'Maden Suyu (1 L)', en: 'Sparkling Water (1 L)' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 6 },
    { id: 'i1408', categoryId: 'cat_14', name: { tr: 'Tonik', en: 'Tonic' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 7 },
    { id: 'i1409', categoryId: 'cat_14', name: { tr: 'Buzlu Kahve', en: 'Ice Coffee' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 8 },
    { id: 'i1410', categoryId: 'cat_14', name: { tr: 'Milkshake', en: 'Milkshake' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 9 },
    { id: 'i1411', categoryId: 'cat_14', name: { tr: 'Ev Yapımı Limonata', en: 'Homemade Lemonade' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 10 },
    { id: 'i1412', categoryId: 'cat_14', name: { tr: 'Red Bull', en: 'Red Bull' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 11 },
    { id: 'i1413', categoryId: 'cat_14', name: { tr: 'Su (Küçük)', en: 'Water (Small)' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 12 },
    { id: 'i1414', categoryId: 'cat_14', name: { tr: 'Su (Büyük)', en: 'Water (Large)' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 13 },
    { id: 'i1501', categoryId: 'cat_15', name: { tr: 'Alkolsüz Bira', en: 'Non-Alcoholic Beer' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i1502', categoryId: 'cat_15', name: { tr: 'Mojito', en: 'Mojito' }, description: { tr: 'Sprite, esmer şeker, misket limonu suyu, maden suyu, taze nane', en: 'Sprite, brown sugar, lime juice, sparkling water, fresh mint' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i1503', categoryId: 'cat_15', name: { tr: 'Sex on the Beach', en: 'Sex on the Beach' }, description: { tr: 'Portakal suyu, şeftali, grenadin', en: 'Orange juice, peach, grenadine' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i1504', categoryId: 'cat_15', name: { tr: 'Strawberry Dreams', en: 'Strawberry Dreams' }, description: { tr: 'Çilek, taze limonata', en: 'Strawberry, fresh lemonade' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i1505', categoryId: 'cat_15', name: { tr: 'Blueberry Club', en: 'Blueberry Club' }, description: { tr: 'Yaban mersini, Sprite, taze nane', en: 'Blueberry, Sprite, fresh mint' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i1506', categoryId: 'cat_15', name: { tr: 'Twister', en: 'Twister' }, description: { tr: 'Ananas, soda, grenadin', en: 'Pineapple, soda, grenadine' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i1601', categoryId: 'cat_16', name: { tr: 'Portakal', en: 'Orange' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i1602', categoryId: 'cat_16', name: { tr: 'Elma', en: 'Apple' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i1603', categoryId: 'cat_16', name: { tr: 'Nar', en: 'Pomegranate' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i1604', categoryId: 'cat_16', name: { tr: 'Karışık Meyve Suyu', en: 'Mixed Juice' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i1605', categoryId: 'cat_16', name: { tr: 'Şeftali', en: 'Peach' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i1606', categoryId: 'cat_16', name: { tr: 'Karpuz', en: 'Watermelon' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i1607', categoryId: 'cat_16', name: { tr: 'Kavun', en: 'Melon' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 6 },
    { id: 'i1701', categoryId: 'cat_17', name: { tr: 'Espresso', en: 'Espresso' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i1702', categoryId: 'cat_17', name: { tr: 'Macchiato', en: 'Macchiato' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i1703', categoryId: 'cat_17', name: { tr: 'Cappuccino', en: 'Cappuccino' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i1704', categoryId: 'cat_17', name: { tr: 'Americano', en: 'Americano' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i1705', categoryId: 'cat_17', name: { tr: 'Caffè Latte', en: 'Caffè Latte' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i1706', categoryId: 'cat_17', name: { tr: 'Nescafé', en: 'Nescafé' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i1707', categoryId: 'cat_17', name: { tr: 'Sütlü Nescafé', en: 'Nescafé with Milk' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 6 },
    { id: 'i1708', categoryId: 'cat_17', name: { tr: 'Türk Kahvesi', en: 'Turkish Coffee' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 7 },
    { id: 'i1709', categoryId: 'cat_17', name: { tr: 'Çay', en: 'Turkish Tea' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 8 },
    { id: 'i1710', categoryId: 'cat_17', name: { tr: 'Elma Çayı', en: 'Apple Tea' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 9 },
    { id: 'i1711', categoryId: 'cat_17', name: { tr: 'Kış Çayı (French Press)', en: 'Winter Tea (French Press)' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 10 },
    { id: 'i1712', categoryId: 'cat_17', name: { tr: 'Yeşil Çay', en: 'Green Tea' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 11 },
    { id: 'i1713', categoryId: 'cat_17', name: { tr: 'Salep', en: 'Sahlep' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 12 },
    { id: 'i1714', categoryId: 'cat_17', name: { tr: 'Sıcak Çikolata', en: 'Hot Chocolate' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 13 },
    { id: 'i1801', categoryId: 'cat_18', name: { tr: 'Irish Coffee', en: 'Irish Coffee' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i1802', categoryId: 'cat_18', name: { tr: 'Baileys\'li Kahve', en: 'Baileys Coffee' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i1803', categoryId: 'cat_18', name: { tr: 'Sıcak Şarap', en: 'Hot Wine' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i1901', categoryId: 'cat_19', name: { tr: 'Efes Fıçı 33 cl', en: 'Efes Draft 33 cl' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i1902', categoryId: 'cat_19', name: { tr: 'Efes Fıçı 50 cl', en: 'Efes Draft 50 cl' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i1903', categoryId: 'cat_19', name: { tr: 'Efes Malt', en: 'Efes Malt' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i1904', categoryId: 'cat_19', name: { tr: 'Bomonti Filtresiz', en: 'Bomonti Unfiltered' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i1905', categoryId: 'cat_19', name: { tr: 'Bud', en: 'Bud' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i1906', categoryId: 'cat_19', name: { tr: 'Heineken', en: 'Heineken' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i1907', categoryId: 'cat_19', name: { tr: 'Corona', en: 'Corona' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 6 },
    { id: 'i1908', categoryId: 'cat_19', name: { tr: 'Miller', en: 'Miller' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 7 },
    { id: 'i1909', categoryId: 'cat_19', name: { tr: 'Beck\'s', en: 'Beck\'s' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 8 },
    { id: 'i2001', categoryId: 'cat_20', name: { tr: 'Kuruyemiş', en: 'Nuts' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i2101', categoryId: 'cat_21', name: { tr: 'Yeni Rakı (Kadeh)', en: 'Yeni Rakı (Glass)' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i2201', categoryId: 'cat_22', name: { tr: 'Tokyo', en: 'Tokyo' }, description: { tr: 'Votka, rom, cin, tekila, triple sec, sweet & sour, Sprite, haribo', en: 'Vodka, rum, gin, tequila, triple sec, sweet & sour, Sprite, Haribo' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i2202', categoryId: 'cat_22', name: { tr: 'Inferno', en: 'Inferno' }, description: { tr: 'Cin, Aperol, triple sec, soda', en: 'Gin, Aperol, triple sec, soda' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i2203', categoryId: 'cat_22', name: { tr: 'Basilica Night', en: 'Basilica Night' }, description: { tr: 'Votka, tekila, çilek, misket limonu, blue curaçao, soda', en: 'Vodka, tequila, strawberry, lime, blue curaçao, soda' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i2204', categoryId: 'cat_22', name: { tr: 'Red Point', en: 'Red Point' }, description: { tr: 'Cin, narenciye, triple sec, nar suyu', en: 'Gin, citrus, triple sec, pomegranate juice' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i2205', categoryId: 'cat_22', name: { tr: 'Miami Angel', en: 'Miami Angel' }, description: { tr: 'Taze çilek, Malibu, votka, ananas suyu', en: 'Fresh strawberries, Malibu, vodka, pineapple juice' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i2206', categoryId: 'cat_22', name: { tr: 'Blue Istanbul', en: 'Blue Istanbul' }, description: { tr: 'Votka, cin, rom, narenciye, blue curaçao, maden suyu', en: 'Vodka, gin, rum, citrus, blue curaçao, sparkling water' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i2301', categoryId: 'cat_23', name: { tr: 'Whiskey Sour', en: 'Whiskey Sour' }, description: { tr: 'Johnnie Walker Black Label, sweet & sour', en: 'Johnnie Walker Black Label, sweet & sour mix' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i2302', categoryId: 'cat_23', name: { tr: 'Aperol Spritz', en: 'Aperol Spritz' }, description: { tr: 'Aperol, prosecco, soda', en: 'Aperol bitter, prosecco, soda' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i2303', categoryId: 'cat_23', name: { tr: 'Mojito', en: 'Mojito' }, description: { tr: 'Beyaz rom, esmer şeker, misket limonu suyu, maden suyu, taze nane', en: 'White rum, brown sugar, lime juice, sparkling water, fresh mint' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i2304', categoryId: 'cat_23', name: { tr: 'Cosmopolitan', en: 'Cosmopolitan' }, description: { tr: 'Votka, triple sec, kızılcık suyu, misket limonu suyu', en: 'Vodka, triple sec, cranberry juice, lime juice' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i2305', categoryId: 'cat_23', name: { tr: 'Martini Apple', en: 'Martini Apple' }, description: { tr: 'Votka, Martini Bianco, elma suyu', en: 'Vodka, Martini Bianco, apple juice' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i2306', categoryId: 'cat_23', name: { tr: 'Negroni', en: 'Negroni' }, description: { tr: 'Martini Rosso, cin, Campari', en: 'Martini Rosso, gin, Campari' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i2307', categoryId: 'cat_23', name: { tr: 'Sex on the Beach', en: 'Sex on the Beach' }, description: { tr: 'Votka, Archers, taze portakal suyu, nar', en: 'Vodka, Archers, fresh orange juice, pomegranate' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 6 },
    { id: 'i2308', categoryId: 'cat_23', name: { tr: 'Piña Colada', en: 'Piña Colada' }, description: { tr: 'Beyaz rom, ananas suyu, hindistan cevizi kreması, misket limonu', en: 'White rum, pineapple juice, coconut cream, lime' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 7 },
    { id: 'i2309', categoryId: 'cat_23', name: { tr: 'Margarita', en: 'Margarita' }, description: { tr: 'Tekila, triple sec, misket limonu suyu', en: 'Tequila, triple sec, lime juice' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 8 },
    { id: 'i2310', categoryId: 'cat_23', name: { tr: 'Espresso Martini', en: 'Espresso Martini' }, description: { tr: 'Votka, Kahlúa, espresso', en: 'Vodka, Kahlúa, espresso' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 9 },
    { id: 'i2311', categoryId: 'cat_23', name: { tr: 'Long Island', en: 'Long Island' }, description: { tr: 'Votka, cin, rom, tekila, triple sec, kola', en: 'Vodka, gin, rum, tequila, triple sec, cola' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 10 },
    { id: 'i2312', categoryId: 'cat_23', name: { tr: 'White Russian', en: 'White Russian' }, description: { tr: 'Votka, Kahlúa, krema', en: 'Vodka, Kahlúa, cream' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 11 },
    { id: 'i2313', categoryId: 'cat_23', name: { tr: 'Black Russian', en: 'Black Russian' }, description: { tr: 'Votka, Kahlúa', en: 'Vodka, Kahlúa' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 12 },
    { id: 'i2314', categoryId: 'cat_23', name: { tr: 'Cuba Libre', en: 'Cuba Libre' }, description: { tr: 'Rom, taze limon suyu, misket limonu, kola', en: 'Rum, fresh lemon juice, lime, cola' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 13 },
    { id: 'i2315', categoryId: 'cat_23', name: { tr: 'Cin Tonik', en: 'Gin Tonic' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 14 },
    { id: 'i2401', categoryId: 'cat_24', name: { tr: 'J&B', en: 'J&B' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i2402', categoryId: 'cat_24', name: { tr: 'Johnnie Walker Red Label', en: 'Johnnie Walker Red Label' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i2403', categoryId: 'cat_24', name: { tr: 'Johnnie Walker Black Label', en: 'Johnnie Walker Black Label' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i2404', categoryId: 'cat_24', name: { tr: 'Dimple Golden Selection', en: 'Dimple Golden Selection' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i2405', categoryId: 'cat_24', name: { tr: 'Bourbon', en: 'Bourbon' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 4 },
    { id: 'i2406', categoryId: 'cat_24', name: { tr: 'Jack Daniel\'s', en: 'Jack Daniel\'s' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 5 },
    { id: 'i2407', categoryId: 'cat_24', name: { tr: 'Jameson', en: 'Jameson' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 6 },
    { id: 'i2408', categoryId: 'cat_24', name: { tr: 'Chivas Regal', en: 'Chivas Regal' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 7 },
    { id: 'i2409', categoryId: 'cat_24', name: { tr: 'Ballantine\'s', en: 'Ballantine\'s' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 8 },
    { id: 'i2410', categoryId: 'cat_24', name: { tr: 'Jim Beam', en: 'Jim Beam' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 9 },
    { id: 'i2501', categoryId: 'cat_25', name: { tr: 'Beefeater', en: 'Beefeater' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i2502', categoryId: 'cat_25', name: { tr: 'Gordon\'s', en: 'Gordon\'s' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i2503', categoryId: 'cat_25', name: { tr: 'Bombay Sapphire', en: 'Bombay Sapphire' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i2504', categoryId: 'cat_25', name: { tr: 'Hendrick\'s', en: 'Hendrick\'s' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i2601', categoryId: 'cat_26', name: { tr: 'Istanblue', en: 'Istanblue' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i2602', categoryId: 'cat_26', name: { tr: 'Smirnoff', en: 'Smirnoff' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i2603', categoryId: 'cat_26', name: { tr: 'Absolut', en: 'Absolut' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i2701', categoryId: 'cat_27', name: { tr: 'Kırmızı Şarap (Kadeh)', en: 'House Red Wine' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i2702', categoryId: 'cat_27', name: { tr: 'Beyaz Şarap (Kadeh)', en: 'House White Wine' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i2703', categoryId: 'cat_27', name: { tr: 'Roze Şarap (Kadeh)', en: 'House Rosé Wine' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i2704', categoryId: 'cat_27', name: { tr: 'Sıcak Şarap', en: 'Hot Wine' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i2801', categoryId: 'cat_28', name: { tr: 'Tekila Shot', en: 'Tequila Shot' }, description: { tr: '', en: '' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 0 },
    { id: 'i2802', categoryId: 'cat_28', name: { tr: 'Zombie', en: 'Zombie' }, description: { tr: 'Archers, Jägermeister, Baileys, grenadin', en: 'Archers, Jägermeister, Baileys, grenadine' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 1 },
    { id: 'i2803', categoryId: 'cat_28', name: { tr: 'Smurf', en: 'Smurf' }, description: { tr: 'Malibu, blue curaçao, votka, tekila', en: 'Malibu, blue curaçao, vodka, tequila' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 2 },
    { id: 'i2804', categoryId: 'cat_28', name: { tr: 'Panelka', en: 'Panelka' }, description: { tr: 'Votka, ananas, tekila', en: 'Vodka, pineapple, tequila' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 3 },
    { id: 'i2805', categoryId: 'cat_28', name: { tr: 'Sweet Dreams', en: 'Sweet Dreams' }, description: { tr: 'Blue curaçao, Baileys, triple sec, rom', en: 'Blue curaçao, Baileys, triple sec, rum' }, price: 0, image: '', tags: [], badges: [], visible: true, order: 4 }
  ]
};

function getData() {
  try {
    // A local copy (admin draft) wins only if it is not older than the published file;
    // otherwise the published menu (this file) is the source of truth.
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      if ((d.version || 0) >= (DEFAULT_DATA.version || 0)) return d;
    }
  } catch {}
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    alert('Kayıt başarısız. Yerel depolama dolmuş olabilir (fotoğraflar çok büyük).');
    return false;
  }
}

function getAdminPass() {
  return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASS;
}

function setAdminPass(np) {
  localStorage.setItem(ADMIN_PASS_KEY, np);
}

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

async function compressImage(dataUrl, maxSide = 900, q = 0.82) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      let { width: w, height: h } = img;
      if (Math.max(w, h) > maxSide) {
        if (w > h) { h = Math.round((maxSide / w) * h); w = maxSide; }
        else { w = Math.round((maxSide / h) * w); h = maxSide; }
      }
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(c.toDataURL('image/jpeg', q));
    };
    img.src = dataUrl;
  });
}

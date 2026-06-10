export interface Branch {
  id: string;
  address: string;
  workingHours: string;
  features: string[];
  gallery: string[];
}

export interface Venue {
  id: string;
  name: string;
  type: 'restaurant' | 'cafe' | 'coffee' | 'bar';
  description: string;
  rating: number;
  image: string; // Главная картинка для каталога
  priceLevel: 1 | 2 | 3 | 4;
  instagramUrl: string;
  branches: Branch[]; // Массив филиалов
}

export const venues: Venue[] = [
  {
    id: 'contrast',
    name: 'Контраст',
    type: 'restaurant',
    description: 'Контраст атмосферы спокойствия с бешеными ритмами города чутко улавливается уже с порога. Интерьер ресторана Contrast (Контраст) окутывает уютом, где гостям удобно провести деловую встречу, заглянуть на семейный завтрак или запланировать свидание на вечер. Все это приправлено главными ценностями заведения: простой понятной едой, безупречным сервисом и честностью в отношениях с клиентами во всем.',
    rating: 4.6,
    image: '/photo/contrast1.png',
    priceLevel: 3,
    instagramUrl: 'https://www.instagram.com/contrast_minsk?igsh=emRyMW5lb3BtMWdl',
    branches: [
      {
        id: 'contrast-1',
        address: 'пр-т Победителей 102',
        workingHours: 'Воскресенье - Четверг: 08:00 - 21:00\nПятница - Суббота: 09:00 - 23:00',
        features: ['Wifi', 'Оплата картой', 'Завтраки', 'Вегетарианские блюда', 'Терасса'],
        gallery: ['/photo/contrast2.jpg', '/photo/contrast3.jpg']
      }
    ]
  },
  {
    id: 'le-pigeon',
    name: 'Le Pigeon',
    type: 'coffee',
    description: 'Светлая и уютная кофейня в центре города с современным лаконичным интерьером, мягкими креслами и панорамными окнами. Фирменное заведение славится самой большой линейкой сырников в городе, вкусными завтраками и отличным кофе (классика, воронка, авторские и сезонные напитки).',
    rating: 4.8,
    image: '/photo/pizhon1.jpg',
    priceLevel: 3,
    instagramUrl: 'https://www.instagram.com/pigeon.minsk?igsh=d24ydGhjOHpsM29h',
    branches: [
      {
        id: 'pigeon-1',
        address: 'пр-т Независимости, 37',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Завтраки весь день', 'Альтернативный кофе', 'Десерты', 'Обеденное меню', 'Доставка'],
        gallery: ['/photo/pizhon2.jpg', '/photo/pizhon3.webp']
      }
    ]
  },
  {
    id: 'ember',
    name: 'Ember',
    type: 'restaurant',
    description: 'Изысканный винный ресторан и бар на 7-м этаже отеля DoubleTree by Hilton в центре Минска. Заведение специализируется на стейках сухой выдержки, свежих морепродуктах и авторской кухне, предлагая одну из самых богатых винотек в городе.',
    rating: 4.9,
    image: '/photo/ember1.png',
    priceLevel: 4,
    instagramUrl: 'https://www.instagram.com/ember_minsk?igsh=amNscHY3MWU0ZmRn',
    branches: [
      {
        id: 'ember-1',
        address: 'пр-т Победителей, 9',
        workingHours: 'Ежедневно: 12:00 — 00:00',
        features: ['Панорамный вид', 'Винная карта', 'Премиум сервис', 'Терасса', 'Вегетарианские блюда'],
        gallery: ['/photo/ember2.jpg', '/photo/ember3.avif']
      }
    ]
  },
  {
    id: 'lidbeer',
    name: 'Lidbeer',
    type: 'bar',
    description: 'Сеть популярных заведений в Минске, где подают знаменитое пиво. Меню включает классические закуски (начос, сырные палочки, крылья баффало, мясные сеты), а интерьер выполнен в формате традиционного паба.',
    rating: 4.5,
    image: '/photo/lidbeer1.jpg',
    priceLevel: 2,
    instagramUrl: 'https://www.instagram.com/Lidbeerbar/',
    branches: [
      {
        id: 'lidbeer-1',
        address: 'ул. Интернациональная, 33',
        workingHours: 'Круглосуточно',
        features: ['Живая музыка', 'Танцпол', 'Детское меню', 'Оплата картой'],
        gallery: ['/photo/lidbeer2.jpeg', '/photo/lidbeer3.jpg']
      },
      {
        id: 'lidbeer-2',
        address: 'пр-т Независимости, 58',
        workingHours: 'Круглосуточно',
        features: ['Спорт-трансляции', 'Живая музыка', 'Летняя терраса'],
        gallery: ['/photo/lidbeer2.jpeg', '/photo/lidbeer3.jpg']
      },
      {
        id: 'lidbeer-3',
        address: 'ул. Якуба Коласа, 37',
        workingHours: 'Понедельник - Четверг, Воскресенье: 16:00 — 02:00\nПятница - Суббота: 16:00 — 05:00',
        features: ['Настольные игры', 'Живая музыка'],
        gallery: ['/photo/lidbeer2.jpeg', '/photo/lidbeer3.jpg']
      },
      {
        id: 'lidbeer-4',
        address: 'ул. Комсомольская, 18',
        workingHours: 'Воскресенье - Четверг: 12:00 — 02:00\n Пятница - Суббота: 12:00 — 04:00',
        features: ['Винная карта', 'Обеденное меню', 'Коктейли'],
        gallery: ['/photo/lidbeer2.jpeg', '/photo/lidbeer3.jpg']
      },
      {
        id: 'lidbeer-5',
        address: 'К. Маркса, 20',
        workingHours: 'Воскресенье - Четверг: 12:00 — 02:00\n Пятница - Суббота: 12:00 — 04:00',
        features: ['Кальян', 'Коктейли'],
        gallery: ['/photo/lidbeer2.jpeg', '/photo/lidbeer3.jpg']
      },
      {
        id: 'lidbeer-6',
        address: 'ул. Свердлова, 2',
        workingHours: 'Воскресенье  - Четверг: 12:00 — 02:00\n Пятница  - Суббота: 12:00 — 06:00',
        features: ['Кальян', 'Коктейли'],         
        gallery: ['/photo/lidbeer2.jpeg', '/photo/lidbeer3.jpg']
      }

    ]
  },
  {
    id: 'leone',
    name: 'Leone',
    type: 'bar',
    description: 'Стильный аперитиво-бар на главной барной улице города. Заведение пропитано философией гедонизма, предлагая гостям расслабленную атмосферу, авторские напитки и эстетику ночной гастрономии.',
    rating: 4.7,
    image: '/photo/leone1.jpg',
    priceLevel: 3,
    instagramUrl: 'https://www.instagram.com/leone_msq/?hl=pt',
    branches: [
      {
        id: 'leone-1',
        address: 'ул. Зыбицкая, 4',
        workingHours: 'Понедельник - Четверг: 18:00 — 02:00\nПятница - Воскресенье: 17:00 — 04:00',
        features: ['Коктейльная карта', 'DJ сеты', 'Летняя терраса'],
        gallery: ['/photo/leone2.jpg', '/photo/leone3.jpg']
      }
    ]
  },
  {
    id: 'the-odi',
    name: 'The Odi',
    type: 'cafe',
    description: 'Популярный ресторан и кондитерская в самом сердце Минска. Заведение славится собственной пекарней, натуральным крафтовым мороженым и классическими европейскими десертами в авторской интерпретации, а также предлагает полноценное меню европейской кухни.',
    rating: 4.7,
    image: '/photo/odi1.jpg',
    priceLevel: 3,
    instagramUrl: 'https://www.instagram.com/odi.minsk?igsh=MTZ1ODRlOHFrcXpneQ==',
    branches: [
      {
        id: 'odi-1',
        address: 'пр-т Независимости, 12',
        workingHours: 'Ежедневно: 09:00 — 22:00',
        features: ['Завтраки', 'Обеденное меню', 'Десерты'],
        gallery: ['/photo/odi2.jpg', '/photo/odi3.webp']
      },
      {
        id: 'odi-2',
        address: 'ул. Ратомская, 7',
        workingHours: 'Ежедневно: 09:00 — 22:00',
        features: ['Можно с животными', 'Обеденное меню', 'Завтраки'],
        gallery: ['/photo/odi2.jpg', '/photo/odi3.webp']
      }
    ]
  },
  {
    id: 'pellegrino',
    name: 'Pellegrino',
    type: 'restaurant',
    description: 'Пространство оформлено в стиле модных итальянских эспрессо-баров и ресторанов: обилие зелени, эстетичные детали, подходящие для фото, и просторная, уютная терраса. Это место позиционирует себя как ресторан для семейных обедов, встреч с друзьями и вечерних свиданий. Меню сфокусировано на классических итальянских рецептах: здесь подают традиционную пиццу, пасту, легкие закуски и блюда на гриле.',
    rating: 4.8,
    image: '/photo/pellegrino1.jpg',
    priceLevel: 3,
    instagramUrl: 'https://www.instagram.com/pellegrino.restaurant?igsh=MXFmNTY0cGVvMzVzeQ==',
    branches: [
      {
        id: 'pellegrino-1',
        address: 'ул. Интернациональная, 9',
        workingHours: 'Воскресенье - Четверг: 11:00 — 00:00\nПятница: 11:00 — 01:00',
        features: ['Итальянская кухня', 'Винная карта', 'Живая музыка'],
        gallery: ['/photo/pellegrino2.jpg', '/photo/pellegrino3.jpg']
      }
    ]
  },
  {
    id: 'lovemyrr',
    name: 'Лавмурр',
    type: 'coffee',
    description: 'Это сеть эстетичных кофеен и цветочных мастерских в Минске, дополненная одноименным брендом женской одежды. Проект основан семейной парой (Сашей и Лизой) и строится на любви к кофе, цветам и нежному, уютному стилю жизни.',
    rating: 4.7,
    image: '/photo/lovemyrr1.jpeg',
    priceLevel: 2,
    instagramUrl: 'https://www.instagram.com/lovemyrr?igsh=bmZvN3RqM3F3cjBr',
    branches: [
      {
        id: 'lovemyrr-1',
        address: 'ул. Ленина, 15',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Можно с животными', 'Цветочный шоп', 'Веган десерты'],
        gallery: ['/photo/lovemyrr2.jpeg', '/photo/lovemyrr3.jpeg']
      }
    ]
  },
  {
    id: 'malevich',
    name: 'Малевич',
    type: 'restaurant',
    description: 'Стильный ресторан авторской кухни. Заведение названо в честь знаменитого художника-авангардиста и предлагает гостям утонченную атмосферу, смелые фьюжн-решения от шеф-поваров и блюда из свежих морепродуктов.',
    rating: 4.6,
    image: '/photo/malevich1.jpg',
    priceLevel: 3,
    instagramUrl: 'https://www.instagram.com/malevich_minsk?igsh=ZTIzZHN1cGYxbzYw',
    branches: [
      {
        id: 'malevich-1',
        address: 'ул. Карла Маркса, 24',
        workingHours: 'Воскресенье - Четверг: 12:00 — 23:00\nПятница - Суббота: 12:00 — 00:00',
        features: ['Арт-пространство', 'Обеденное менню', 'Wifi', 'Бранчи'],
        gallery: ['/photo/malevich2.jpg', '/photo/malevich3.jpg']
      }
    ]
  },
  {
    id: 'mesto-pro-edu',
    name: 'Место про еду',
    type: 'restaurant',
    description: 'Заведение с блюдами высокой кухни для ценителей вкусной еды. Концепция кафе - "кухня родных продуктов". Здесь готовят необычные авторские блюда из локальных продуктов. В заведении представлен широкий перечень вина, авторских коктейлей и напитков собственного приготовления. В теплое время года открывается летняя терраса с видом на Свислочь. В кафе можно проводить праздники и крупные торжества до 120 персон.',
    rating: 4.7,
    image: '/photo/mestoproedy1.jpg',
    priceLevel: 3,
    instagramUrl: 'https://www.instagram.com/mesto_pro_edu?igsh=NWRsa2l6NWJlNmZ0',
    branches: [
      {
        id: 'mesto-1',
        address: 'ул. Октябрьская, 5А',
        workingHours: 'Понедельник - Пятница: 09:00 — 00:00\nСуббота - Воскресенье: 12:00 — 00:00',
        features: ['Европейская кухня', 'Банкеты', 'Летняя терраса'],
        gallery: ['/photo/mestoproedy2.jpg', '/photo/mestoproedy3.jpg']
      }
    ]
  },
  {
    id: 'roast',
    name: 'Roast',
    type: 'coffee',
    description: 'Семейный проект свежей обжарки, специализирующийся на спешелти-кофе. В меню представлены как классические напитки, так и альтернатива (воронка), а также авторские десерты. Атмосфера заведений отличается уютом и концепцией dog-friendly.',
    rating: 4.8,
    image: '/photo/roast1.jfif',
    priceLevel: 2,
    instagramUrl: 'https://www.instagram.com/roast.by?igsh=MTN4aWgwOHpyNmFhOQ==',
    branches: [
      {
        id: 'roast-1',
        address: 'ул. Белинского 23',
        workingHours: 'Понедельник - Пятница: 08:00 — 20:00\nСуббота - Воскресенье: 09:00 — 21:00',
        features: ['Собственная обжарка', 'Дог-френдли', 'Wifi'],
        gallery: ['/photo/roast2.jpg', '/photo/roast3.webp']
      },
      {
        id: 'roast-2',
        address: 'ул. Тимирязева 28',
        workingHours: 'Понедельник - Пятница: 08:00 — 20:00\nСуббота - Воскресенье: 09:00 — 21:00',
        features: ['Кофе с собой', 'Для работы'],
        gallery: ['/photo/roast2.jpg', '/photo/roast3.webp']
      },
      {
        id: 'roast-3',
        address: 'пер. Софьи Ковалевской, 46',
        workingHours: 'Понедельник - Суббота: 09:00 — 20:00\nВоскресенье: выходной',
        features: ['Wifi', 'Уютно'],
        gallery: ['/photo/roast2.jpg', '/photo/roast3.webp']
      },
      {
        id: 'roast-4',
        address: 'ул. Независимости 95',
        workingHours: 'Понедельник - Пятница: 08:00 — 23:00\nСуббота - Воскресенье: 09:00 — 23:00',
        features: ['Wifi', 'Уютно'],
        gallery: ['/photo/roast2.jpg', '/photo/roast3.webp']
      }
    ]
  },
  {
    id: 'vasilki',
    name: 'Васильки',
    type: 'restaurant',
    description: 'Рестораны народной кухни «Васiлькi» ежедневно встречают Гостей белорусским радушием и гостеприимством, ведь это не только место, где можно вкусно поесть, но и то самое место, где можно отдохнуть душой и провести время в компании близких.',
    rating: 4.8,
    image: '/photo/vasilki1.jpg',
    priceLevel: 2,
    instagramUrl: 'https://www.instagram.com/restoran.vasilki?igsh=bmIwM3Fta25mdnEz',
    branches: [
      {
        id: 'vasilki-1',
        address: 'ул. Якуба Коласа, 37',
        workingHours: 'Ежедневно: 09:00 — 23:00',
        features: ['Завтраки', 'Детское меню', 'Wifi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-2',
        address: 'ул. Бобруйская, 6',
        workingHours: 'Вс-Чт: 10:00-22:00, Пт-Сб: 10:00-23:00',
        features: ['Панорамный вид', 'Парковка ТРЦ'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-3',
        address: 'пр-т Победителей, 9',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['В ТЦ', 'Оплата картой'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-4',
        address: 'ул. Петра Мстиславца, 11',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Семейный ресторан', 'Детская комната'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-5',
        address: 'пр. Независимости, 89',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Удобное расположение', 'WiFi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-6',
        address: 'ул. Петра Глебки, 5',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Удобное расположение', 'WiFi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-7',
        address: 'пр. Независимости, 58',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Удобное расположение', 'WiFi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-8',
        address: 'пр. Независимости, 16',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Удобное расположение', 'WiFi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-9',
        address: 'ул. Налибокская, 1',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Удобное расположение', 'WiFi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-10',
        address: 'ТРЦ Экспобел',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Удобное расположение', 'WiFi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-11',
        address: 'пр. Рокоссовского, 2',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Удобное расположение', 'WiFi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-12',
        address: 'пр. Партизанский, 150А',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Удобное расположение', 'WiFi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      },
      {
        id: 'vasilki-13',
        address: 'ул. Тимирязева, 74А',
        workingHours: 'Ежедневно: 10:00 — 22:00',
        features: ['Удобное расположение', 'WiFi'],
        gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp']
      }
    ]
  },
  {
    id: 'zerno',
    name: 'Зерно',
    type: 'coffee',
    description: 'Все кофейни - это уютные и атмосферные места, в которых можно отлично провести время со всей семьей, даже со своими четвероногими друзьями, ведь наши кофейни dog-friendly. Интерьеры всех кофеен выполнены в разных дизайнерских стилистических решениях и с своей уникальной атмосферой. Объединяет их одна концепция и цель - сделать каждую чашку кофе, отдаваемую нашим гостям, идеальной.',
    rating: 4.9,
    image: '/photo/zerno1.jpg',
    priceLevel: 2,
    instagramUrl: 'https://www.instagram.com/cafezerno?igsh=bnRlMGx5cWt3ODhv',
    branches: [
      {
        id: 'zerno-1',
        address: 'пр-т Независимости, 46',
        workingHours: 'Ежедневно: 08:00 — 22:00',
        features: ['Спешелти кофе', 'Завтраки', 'Dog-friendly'],
        gallery: ['/photo/zerno2.jpg', '/photo/zerno2.jpeg']
      },
      {
        id: 'zerno-2',
        address: 'ул. Козлова, 6',
        workingHours: 'Ежедневно: 09:00 — 23:00',
        features: ['Тихая атмосфера', 'Вино', 'Своя выпечка'],
        gallery: ['/photo/zerno3.jpg', '/photo/zerno4.jpg']
      },
      {
        id: 'zerno-3',
        address: 'ул. Интернациональная, 27Б',
        workingHours: 'Ежедневно: 10:00 — 23:00',
        features: ['В центре', 'Летняя терраса'],
        gallery: ['/photo/zerno3.jpg', '/photo/zerno4.jpg']
      }
    ]
  },
  {
    id: 'varka',
    name: 'Varka',
    type: 'coffee',
    description: 'Популярная белорусская сеть кофеен в Минске и других городах страны, основанная предпринимателем и блогером Никитой Нестеровым. Заведения известны стильным дизайном, атмосферой уюта, демократичными ценами и форматом «кофе с собой». ',
    rating: 4.5,
    image: '/photo/varka1.jfif',
    priceLevel: 2,
    instagramUrl: 'https://www.instagram.com/varkacoffee.official?igsh=MXZ0ZzVrMHk4ZGlzbg==',
    branches: [
      {
        id: 'varka-1',
        address: 'пр-т Независимости, 91',
        workingHours: 'Ежедневно: 08:00 — 22:00',
        features: ['Кофе с собой', 'Матча', 'Выпечка'],
        gallery: ['/photo/varka2.png', '/photo/varka3.jpg']
      },
      {
        id: 'varka-2',
        address: 'ул. Романовская Слобода, 5',
        workingHours: 'Ежедневно: 07:30 — 22:00',
        features: ['Быстрое обслуживание', 'Для работы'],
        gallery: ['/photo/varka2.png', '/photo/varka3.jpg']
      },
      {
        id: 'varka-3',
        address: 'ул. Октябрьская, 16',
        workingHours: 'Ежедневно: 09:00 — 23:00',
        features: ['Стильный интерьер', 'Молодежно'],
        gallery: ['/photo/varka2.png', '/photo/varka3.jpg']
      },
      {
        id: 'varka-4',
        address: 'бул. Шевченко, 1',
        workingHours: 'Ежедневно: 08:00 — 21:00',
        features: ['Парковка', 'Wifi'],
        gallery: ['/photo/varka2.png', '/photo/varka3.jpg']
      },
      {
        id: 'varka-5',
        address: 'ул. Яна Чечота, 7',
        workingHours: 'Ежедневно: 08:00 — 21:00',
        features: ['Парковка', 'Wifi'],
        gallery: ['/photo/varka2.png', '/photo/varka3.jpg']
      },
      {
        id: 'varka-6',
        address: 'Логойский тракт, 15/2',
        workingHours: 'Ежедневно: 08:00 — 21:00',
        features: ['Парковка', 'Wifi'],
        gallery: ['/photo/varka2.png', '/photo/varka3.jpg']
      }
    ]
  },
  {
    id: 'zavod',
    name: 'Zavod',
    type: 'bar',
    description: 'Гастропаб в центре города, с отдельным караоке-залом, круглогодичной террасой и двумя VIP-комнатами. Аутентичная атмосфера, превосходная кухня, правильные напитки, специально сваренная линейка разливного фирменного пива, ежедневная живая музыка, бесплатные аркадные автоматы, настольные игры, киккер, сабсоккер и спортивные трансляции — у нас каждый сможет найти для себя свое удовольствие.',
    rating: 4.6,
    image: '/photo/zavod1.jpg',
    priceLevel: 3,
    instagramUrl: 'https://www.instagram.com/zavodpub/',
    branches: [
      {
        id: 'zavod-1',
        address: 'пр-т Машерова, 19',
        workingHours: 'Ежедневно: 17:00 — 06:00',
        features: ['Караоке', 'Настольные игры', 'Спорт-трансляции'],
        gallery: ['/photo/zavod2.jpg', '/photo/zavod3.jfif']
      }
    ]
  }
];
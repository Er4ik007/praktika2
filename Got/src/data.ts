export interface Venue {
    id: string;
    name: string;
    type: 'restaurant' | 'cafe' | 'coffee' | 'bar';
    description: string;
    address: string;
    allAddresses?: string[];
    rating: number;
    image: string;
    gallery: string[];
    priceLevel: 1 | 2 | 3 | 4;
    instagramUrl: string;
  }
  
  export const venues: Venue[] = [
    {
      id: 'contrast',
      name: 'Контраст',
      type: 'restaurant',
      description: 'Контраст атмосферы спокойствия с бешеными ритмами города чутко улавливается уже с порога. Интерьер ресторана Contrast (Контраст) окутывает уютом, где гостям удобно провести деловую встречу, заглянуть на семейный завтрак или запланировать свидание на вечер. Все это приправлено главными ценностями заведения: простой понятной едой, безупречным сервисом и честностью в отношениях с клиентами во всем.',
      address: 'пр-т Победителей 102',
      allAddresses: ['пр-т Победителей 102'],
      rating: 4.6,
      image: '/photo/contrast1.png',
      gallery: ['/photo/contrast2.jpg', '/photo/contrast3.jpg'],
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/contrast_minsk?igsh=emRyMW5lb3BtMWdl'
    },
    {
      id: 'le-pigeon',
      name: 'Le Pigeon',
      type: 'coffee',
      description: 'Светлая и уютная кофейня в центре города с современным лаконичным интерьером, мягкими креслами и панорамными окнами. Фирменное заведение славится самой большой линейкой сырников в городе, вкусными завтраками и отличным кофе (классика, воронка, авторские и сезонные напитки).',
      address: 'пр-т Независимости, 37',
      allAddresses: ['пр-т Независимости, 37'],
      rating: 4.8,
      image: '/photo/pizhon1.jpg',
      gallery: ['/photo/pizhon2.jpg', '/photo/pizhon3.webp'],
      priceLevel: 3,
      instagramUrl: 'https://www.instagram.com/pigeon.minsk?igsh=d24ydGhjOHpsM29h'
    },
    {
      id: 'ember',
      name: 'Ember',
      type: 'restaurant',
      description: 'Изысканный винный ресторан и бар на 7-м этаже отеля DoubleTree by Hilton в центре Минска. Заведение специализируется на стейках сухой выдержки, свежих морепродуктах и авторской кухне, предлагая одну из самых богатых винотек в городе.',
      address: 'пр-т Победителей, 9',
      allAddresses: ['пр-т Победителей, 9'],
      rating: 4.9,
      image: '/photo/ember1.png',
      gallery: ['/photo/ember2.jpg', '/photo/ember3.avif'],
      priceLevel: 4,
      instagramUrl: 'https://www.instagram.com/ember_minsk?igsh=amNscHY3MWU0ZmRn'
    },
    {
      id: 'lidbeer',
      name: 'Lidbeer',
      type: 'bar', // Изменили на bar
      description: 'это сеть популярных заведений в Минске, где подают знаменитое пиво. Меню включает классические закуски (начос, сырные палочки, крылья баффало, мясные сеты), а интерьер выполнен в формате традиционного паба.',
      address: 'ул. Зыбицкая, 9',
      allAddresses: ['пр-т Независимости, 58 ','ул. Якуба Коласа, 37','К. Маркса, 20','ул. Свердлова, 2','ул. Интернациональная, 33','ул. Комсомольская, 18 ',],
      rating: 4.5,
      image: '/photo/lidbeer1.jpg',
      gallery: ['/photo/lidbeer2.jpeg', '/photo/lidbeer3.jpg'],
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/Lidbeerbar/'
    },
    {
      id: 'leone',
      name: 'Leone',
      type: 'bar', // Изменили на bar
      description: 'Стильный аперитиво-бар на главной барной улице города. Заведение пропитано философией гедонизма, предлагая гостям расслабленную атмосферу, авторские напитки и эстетику ночной гастрономии.',
      address: 'ул. Зыбицкая, 4',
      allAddresses: ['ул. Зыбицкая, 4'],
      rating: 4.7,
      image: '/photo/leone1.jpg',
      gallery: ['/photo/leone2.jpg', '/photo/leone3.jpg'],
      priceLevel: 3,
      instagramUrl: 'https://www.instagram.com/leone_msq/?hl=pt'
    },
    {
      id: 'the-odi',
      name: 'The Odi',
      type: 'coffee',
      description: 'Популярный ресторан и кондитерская в самом сердце Минска. Заведение славится собственной пекарней, натуральным крафтовым мороженым и классическими европейскими десертами в авторской интерпретации, а также предлагает полноценное меню европейской кухни.',
      address: 'пр-т Независимости, 12',
      allAddresses: ['пр-т Независимости, 12','ул. Ратомская, 7'],
      rating: 4.7,
      image: '/photo/odi1.jpg',
      gallery: ['/photo/odi2.jpg', '/photo/odi3.webp'],
      priceLevel: 3,
      instagramUrl: 'https://www.instagram.com/odi.minsk?igsh=MTZ1ODRlOHFrcXpneQ=='
    },
    {
      id: 'pellegrino',
      name: 'Pellegrino',
      type: 'restaurant',
      description: 'Пространство оформлено в стиле модных итальянских эспрессо-баров и ресторанов: обилие зелени, эстетичные детали, подходящие для фото, и просторная, уютная терраса. Это место позиционирует себя как ресторан для семейных обедов, встреч с друзьями и вечерних свиданий. Меню сфокусировано на классических итальянских рецептах: здесь подают традиционную пиццу, пасту, легкие закуски и блюда на гриле.',
      address: 'ул. Интернациональная, 9',
      allAddresses: ['ул. Интернациональная, 9'],
      rating: 4.8,
      image: '/photo/pellegrino1.jpg',
      gallery: ['/photo/pellegrino2.jpg', '/photo/pellegrino3.jpg'],
      priceLevel: 3,
      instagramUrl: 'https://www.instagram.com/pellegrino.restaurant?igsh=MXFmNTY0cGVvMzVzeQ=='
    },
    {
      id: 'lovemyrr',
      name: 'Лавмурр',
      type: 'coffee',
      description: 'Это сеть эстетичных кофеен и цветочных мастерских в Минске, дополненная одноименным брендом женской одежды. Проект основан семейной парой (Сашей и Лизой) и строится на любви к кофе, цветам и нежному, уютному стилю жизни.',
      address: 'ул. Ленина, 15',
      allAddresses: ['ул. Ленина, 15'],
      rating: 4.7,
      image: '/photo/lovemyrr1.jpeg',
      gallery: ['/photo/lovemyrr2.jpeg', '/photo/lovemyrr3.jpeg'],
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/lovemyrr?igsh=bmZvN3RqM3F3cjBr'
    },
    {
      id: 'malevich',
      name: 'Малевич',
      type: 'restaurant',
      description: 'Стильный ресторан авторской кухни. Заведение названо в честь знаменитого художника-авангардиста и предлагает гостям утонченную атмосферу, смелые фьюжн-решения от шеф-поваров и блюда из свежих морепродуктов. ',
      address: 'ул. Карла Маркса, 24',
      allAddresses: ['ул. Карла Маркса, 24'],
      rating: 4.6,
      image: '/photo/malevich1.jpg',
      gallery: ['/photo/malevich2.jpg', '/photo/malevich3.jpg'],
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/malevich_minsk?igsh=ZTIzZHN1cGYxbzYw'
    },
    {
      id: 'mesto-pro-edu',
      name: 'Место про еду',
      type: 'restaurant',
      description: 'Заведение с блюдами высокой кухни для ценителей вкусной еды. Концепция кафе - "кухня родных продуктов". Здесь готовят необычные авторские блюда из локальных продуктов. В заведении представлен широкий перечень вина, авторских коктейлей и напитков собственного приготовления. В теплое время года открывается летняя терраса с видом на Свислочь. В кафе можно проводить праздники и крупные торжества до 120 персон.',
      address: 'ул. Октябрьская, 5А',
      allAddresses: ['ул. Октябрьская, 5А'],
      rating: 4.7,
      image: '/photo/mestoproedy1.jpg',
      gallery: ['/photo/mestoproedy2.jpg', '/photo/mestoproedy3.jpg'],
      priceLevel: 3,
      instagramUrl: 'https://www.instagram.com/mesto_pro_edu?igsh=NWRsa2l6NWJlNmZ0'
    },
    {
      id: 'roast',
      name: 'Roast',
      type: 'coffee',
      description: 'Семейный проект свежей обжарки, специализирующийся на спешелти-кофе. В меню представлены как классические напитки, так и альтернатива (воронка), а также авторские десерты. Атмосфера заведений отличается уютом и концепцией dog-friendly. ',
      address: 'ул. Белинского 23',
      allAddresses: ['📍 ул. Белинского 23',
    'ул. Тимирязева 28',
    'ул. Нововиленская 31',
    'пер. Софьи Ковалевской, 46',
    'ул. Независимости 95'],
      rating: 4.8,
      image: '/photo/roast1.jfif',
      gallery: ['/photo/roast2.jpg', '/photo/roast3.webp'],
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/roast.by?igsh=MTN4aWgwOHpyNmFhOQ=='
    },
    {
      id: 'vasilki',
      name: 'Васильки',
      type: 'restaurant',
      description: 'Рестораны народной кухни «Васiлькi» ежедневно встречают Гостей белорусским радушием и гостеприимством, ведь это не только место, где можно вкусно поесть, но и то самое место, где можно отдохнуть душой и провести время в компании близких.',
      address: 'ул. Якуба Коласа, 37',
      allAddresses: [
        'ул. Якуба Коласа, 37',
        'ул. Бобруйская, 6',
        'ул. Петра Глебки, 5',
        'ул. Петра Мстиславца, 11',
        'пр. Победителей, 9',
        'пр. Независимости, 89',
        'пр. Независимости, 58',
        'пр. Независимости, 16',
        'ул. Налибокская, 1',
        'ТРЦ Экспобел',
        'пр. Рокоссовского, 2',
        'пр. Партизанский, 150А',
        'ул. Тимирязева, 74А',
      ],
      rating: 4.8,
      image: '/photo/vasilki1.jpg',
      gallery: ['/photo/vasilki2.jpg', '/photo/vasilki3.webp'],
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/restoran.vasilki?igsh=bmIwM3Fta25mdnEz'
    },
    {
      id: 'zerno',
      name: 'Зерно',
      type: 'coffee',
      description: 'Все кофейни - это уютные и атмосферные места, в которых можно отлично провести время со всей семьей, даже со своими четвероногими друзьями, ведь наши кофейни dog-friendly. Интерьеры всех кофеен выполнены в разных дизайнерских стилистических решениях и с своей уникальной атмосферой. Объединяет их одна концепция и цель - сделать каждую чашку кофе, отдаваемую нашим гостям, идеальной.',
      address: 'пр-т Независимости, 46',
      allAddresses: ['📍 пр-т Независимости, 46', 'ул. Козлова, 6','ул. Интернациональная, 27Б.'],
      rating: 4.9,
      image: '/photo/zerno1.jpg',
      gallery: ['/photo/zerno2.jpg', '/photo/zerno2.jpeg'],
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/cafezerno?igsh=bnRlMGx5cWt3ODhv'
    },
    {
      id: 'varka',
      name: 'Varka',
      type: 'coffee',
      description: 'Популярная белорусская сеть кофеен в Минске и других городах страны, основанная предпринимателем и блогером Никитой Нестеровым. Заведения известны стильным дизайном, атмосферой уюта, демократичными ценами и форматом «кофе с собой». ',
      address: 'пр-т Независимости, 91',
      allAddresses: ['ул. Романовская Слобода, 5 (р-н Немиги)', 'ул. Октябрьская, 16, корп. 24','пр-т Независимости, 91','бул. Шевченко, 1','ул. Яна Чечота, 7','Логойский тракт, 15/2'],
      rating: 4.5,
      image: '/photo/varka1.jfif',
      gallery: ['/photo/varka2.png', '/photo/varka3.jpg'],
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/varkacoffee.official?igsh=MXZ0ZzVrMHk4ZGlzbg=='
    },
    {
      id: 'zavod',
      name: 'Zavod',
      type: 'bar', // Изменили на bar
      description: 'Гастропаб в центре города, с отдельным караоке-залом, круглогодичной террасой и двумя VIP-комнатами. Аутентичная атмосфера, превосходная кухня, правильные напитки, специально сваренная линейка разливного фирменного пива, ежедневная живая музыка, бесплатные аркадные автоматы, настольные игры, киккер, сабсоккер и спортивные трансляции — у нас каждый сможет найти для себя свое удовольствие.',
      address: 'пр-т Машерова, 19',
      allAddresses: ['пр-т Машерова, 19'],
      rating: 4.6,
      image: '/photo/zavod1.jpg',
      gallery: ['/photo/zavod2.jpg', '/photo/zavod3.jfif'],
      priceLevel: 3,
      instagramUrl: 'https://www.instagram.com/zavodpub/'
    }
  ];
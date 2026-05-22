export interface Venue {
    id: string;
    name: string;
    type: 'restaurant' | 'cafe' | 'coffee';
    description: string;
    address: string;
    allAddresses?: string[];
    rating: number;
    image: string;
    priceLevel: 1 | 2 | 3 | 4;
    instagramUrl: string;
  }
  
  export const venues: Venue[] = [
    {
      id: 'zerno',
      name: 'Зерно',
      type: 'coffee',
      description: 'Культовая кофейня со спешелти кофе и лучшими чизкейками в городе. Атмосфера для работы и встреч.',
      address: 'пр-т Независимости, 46',
      allAddresses: ['пр-т Независимости, 46', 'ул. Ленина, 16', 'ул. Киселева, 23'],
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/cafezerno?igsh=bnRlMGx5cWt3ODhv'
    },
    {
      id: 'mesto-pro-edu',
      name: 'Место про еду',
      type: 'restaurant',
      description: 'Уютное заведение с акцентом на качественные ингредиенты и понятную, но вкусную кухню.',
      address: 'ул. Козлова, 3',
      allAddresses: ['ул. Козлова, 3'],
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      priceLevel: 3,
      instagramUrl: 'https://www.instagram.com/mesto_pro_edu?igsh=NWRsa2l6NWJlNmZ0'
    },
    {
      id: 'ember',
      name: 'Эмбер',
      type: 'restaurant',
      description: 'Изысканный ресторан с винной картой и авторскими блюдами из мяса и морепродуктов.',
      address: 'пр-т Победителей, 9',
      allAddresses: ['пр-т Победителей, 9 (DoubleTree by Hilton)'],
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      priceLevel: 4,
      instagramUrl: 'https://www.instagram.com/ember_minsk?igsh=amNscHY3MWU0ZmRn'
    },
    {
      id: 'varka',
      name: 'Варка',
      type: 'coffee',
      description: 'Сеть уютных кофеен с широким выбором кофейных напитков и выпечки.',
      address: 'ул. Веры Хоружей, 25',
      allAddresses: ['ул. Веры Хоружей, 25', 'пр-т Дзержинского, 115', 'пр-т Независимости, 186'],
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      priceLevel: 2,
      instagramUrl: 'https://www.instagram.com/varkacoffee.official?igsh=MXZ0ZzVrMHk4ZGlzbg=='
    }
  ];
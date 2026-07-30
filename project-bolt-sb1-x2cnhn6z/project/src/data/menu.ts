export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  tag?: string;
}

export const menuCategories = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'cold', label: 'Cold Brews' },
  { id: 'food', label: 'Food' },
  { id: 'mocktails', label: 'Mocktails' },
  { id: 'desserts', label: 'Desserts' },
] as const;

export type MenuCategory = (typeof menuCategories)[number]['id'];

export const menu: MenuItem[] = [
  // Coffee
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A bold, intense single shot pulled from our house-roasted Arabica beans with a velvet crema.',
    price: 120,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/34563915/pexels-photo-34563915.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'coffee',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk and microfoam crowned with delicate latte art.',
    price: 160,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/28496565/pexels-photo-28496565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'coffee',
  },
  {
    id: 'latte',
    name: 'Caffe Latte',
    description: 'Silky steamed milk poured over a double espresso, smooth and mellow to the last sip.',
    price: 180,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/36851643/pexels-photo-36851643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'coffee',
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Espresso meets rich dark chocolate and steamed milk under a cloud of whipped cream.',
    price: 200,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/14704654/pexels-photo-14704654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'coffee',
  },
  {
    id: 'tea',
    name: 'Garden Herbal Tea',
    description: 'A fragrant infusion of chamomile and garden herbs, brewed slow and served steaming.',
    price: 110,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/27385918/pexels-photo-27385918.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'coffee',
  },

  // Cold
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    description: 'Chilled double-shot coffee blended with milk and ice for a creamy, refreshing kick.',
    price: 190,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/15800979/pexels-photo-15800979.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'cold',
  },
  {
    id: 'frappe',
    name: 'Caramel Frappe',
    description: 'Iced coffee blended with caramel, milk and ice, finished with whipped cream and a drizzle.',
    price: 220,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/17558646/pexels-photo-17558646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'cold',
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    description: 'Espresso poured over cold milk and ice — clean, crisp and dangerously drinkable.',
    price: 200,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/30041434/pexels-photo-30041434.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'cold',
  },

  // Food
  {
    id: 'pizza',
    name: 'Margherita Pizza',
    description: 'Wood-fired dough, San Marzano tomato, fresh mozzarella and torn basil.',
    price: 280,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/8609973/pexels-photo-8609973.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'food',
  },
  {
    id: 'pasta',
    name: 'Creamy Alfredo Pasta',
    description: 'Penne tossed in a silky parmesan cream sauce with black pepper and fresh parsley.',
    price: 260,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/30528623/pexels-photo-30528623.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'food',
  },
  {
    id: 'burger',
    name: 'Signature Burger',
    description: 'Juicy grilled patty, melted cheese, crisp lettuce and house sauce in a brioche bun.',
    price: 240,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'food',
  },
  {
    id: 'sandwich',
    name: 'Grilled Sandwich',
    description: 'Toasted loaded sandwich with cheese, veggies and a side of golden fries.',
    price: 180,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/8979161/pexels-photo-8979161.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'food',
  },
  {
    id: 'fries',
    name: 'French Fries',
    description: 'Golden, crispy-on-the-outside, fluffy-on-the-inside fries with smoked sea salt.',
    price: 140,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/5041473/pexels-photo-5041473.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'food',
  },
  {
    id: 'garlic-bread',
    name: 'Garlic Bread',
    description: 'Buttery garlic toast melted with mozzarella and a sprinkle of fresh parsley.',
    price: 150,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/9951852/pexels-photo-9951852.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'food',
  },

  // Mocktails
  {
    id: 'virgin-mojito',
    name: 'Virgin Mojito',
    description: 'Muddled mint, lime and soda over crushed ice — bright, zesty and alcohol-free.',
    price: 160,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/10839495/pexels-photo-10839495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'mocktails',
  },
  {
    id: 'fruit-cocktail',
    name: 'Fruit Cooler',
    description: 'A rainbow of fresh fruit juices layered over ice with a splash of soda.',
    price: 170,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/17558643/pexels-photo-17558643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'mocktails',
  },
  {
    id: 'cucumber-lime',
    name: 'Cucumber Lime Fizz',
    description: 'Cool cucumber and lime with a sparkling gradient — a summer in a glass.',
    price: 150,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/37515886/pexels-photo-37515886.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'mocktails',
  },

  // Desserts
  {
    id: 'choco-cake',
    name: 'Belgian Chocolate Cake',
    description: 'Three layers of dense chocolate sponge with silky ganache and fresh raspberries.',
    price: 220,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/34718258/pexels-photo-34718258.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'desserts',
  },
  {
    id: 'choco-pastry',
    name: 'Chocolate Pastry',
    description: 'A decadent individual chocolate pastry with a glossy mirror glaze.',
    price: 160,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/8498186/pexels-photo-8498186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'desserts',
  },
  {
    id: 'cupcake',
    name: 'Raspberry Cupcake',
    description: 'Moist chocolate cupcake topped with raspberry buttercream frosting.',
    price: 130,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'desserts',
  },
];

export interface GalleryImage {
  src: string;
  alt: string;
  span?: boolean; // tall / wide emphasis for masonry
}

export const gallery: GalleryImage[] = [
  {
    src: 'https://images.pexels.com/photos/11388016/pexels-photo-11388016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Cozy coffee shop dining area',
    span: true,
  },
  {
    src: 'https://images.pexels.com/photos/4927237/pexels-photo-4927237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Barista pouring latte art',
  },
  {
    src: 'https://images.pexels.com/photos/302893/pexels-photo-302893.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Espresso machine brewing',
  },
  {
    src: 'https://images.pexels.com/photos/31125217/pexels-photo-31125217.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Inviting cafe interior with stained glass',
    span: true,
  },
  {
    src: 'https://images.pexels.com/photos/5995769/pexels-photo-5995769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Cappuccino with sweets and nuts',
  },
  {
    src: 'https://images.pexels.com/photos/34718258/pexels-photo-34718258.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Chocolate cake dessert',
  },
  {
    src: 'https://images.pexels.com/photos/32805984/pexels-photo-32805984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Modern wooden cafe tables',
    span: true,
  },
  {
    src: 'https://images.pexels.com/photos/4161714/pexels-photo-4161714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Fettuccine pasta dish',
  },
  {
    src: 'https://images.pexels.com/photos/27626762/pexels-photo-27626762.png?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Luxury restaurant interior',
  },
];

export const scrollStoryScenes = [
  {
    n: '01',
    title: 'From Bean to Cup',
    text: 'It begins with a single bean. We hand-select Arabica from misted highland farms, roasted in small batches to coax out a deep, complex soul.',
    image: 'https://images.pexels.com/photos/942733/pexels-photo-942733.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    n: '02',
    title: 'The Perfect Extraction',
    text: 'Nine bars of pressure, thirty seconds, a velvet crema. Our baristas turn water and ground into liquid gold every single morning.',
    image: 'https://images.pexels.com/photos/302893/pexels-photo-302893.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    n: '03',
    title: 'The Pour',
    text: 'Silken milk meets espresso in a slow, deliberate pour — a rosetta, a tulip, a heart. Every cup carries the mark of its maker.',
    image: 'https://images.pexels.com/photos/4927237/pexels-photo-4927237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    n: '04',
    title: 'Rising Steam',
    text: 'The first sip is always an exhale. Warmth rises, the world slows, and the room becomes somewhere you want to stay a while.',
    image: 'https://images.pexels.com/photos/1694874/pexels-photo-1694874.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    n: '05',
    title: 'A Room to Remember',
    text: 'Warm wood, soft light, low conversation. Our interior is designed for lingering — for first dates, slow mornings, and quiet pages.',
    image: 'https://images.pexels.com/photos/11388016/pexels-photo-11388016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    n: '06',
    title: 'Signatures & Sweets',
    text: 'Beyond coffee: wood-fired pizza, creamy pasta, and desserts that arrive like a final chord. Every plate made to order, every time.',
    image: 'https://images.pexels.com/photos/10368556/pexels-photo-10368556.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const reviews = [
  {
    name: 'Aarav Mehta',
    role: 'Regular Guest',
    rating: 5,
    text: "Aroma Cafe is my second office. The cappuccino is the best in Valsad, the ambience is warm, and the staff remember your order. A genuine five-star experience every visit.",
    avatar: 'https://images.pexels.com/photos/13736419/pexels-photo-13736419.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    name: 'Priya Sharma',
    role: 'Food Blogger',
    rating: 5,
    text: "From the Belgian chocolate cake to the wood-fired pizza, everything is crafted with love. The interior feels like a luxury lounge. Easily the most beautiful cafe in South Gujarat.",
    avatar: 'https://images.pexels.com/photos/8937265/pexels-photo-8937265.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    name: 'Rohan Desai',
    role: 'Coffee Enthusiast',
    rating: 5,
    text: "Their espresso has a crema that lasts. You can tell the beans are freshly roasted. The caramel frappe on a hot day is unbeatable. Highly recommend the reserve experience.",
    avatar: 'https://images.pexels.com/photos/6205544/pexels-photo-6205544.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    name: 'Sneha Patel',
    role: 'Weekend Bruncher',
    rating: 5,
    text: "Reserved a table for a birthday and they decorated it beautifully. The service was impeccable and the mocktails were gorgeous. This is where memories are made in Valsad.",
    avatar: 'https://images.pexels.com/photos/21937123/pexels-photo-21937123.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
];

export const whyChooseUs = [
  {
    icon: 'Coffee',
    title: 'Handcrafted Coffee',
    text: 'Single-origin Arabica, roasted in-house and pulled by trained baristas who treat every shot like a ritual.',
  },
  {
    icon: 'UtensilsCrossed',
    title: 'Fresh Food, Made to Order',
    text: 'Wood-fired pizzas, creamy pastas and house desserts — never pre-made, always plated with care.',
  },
  {
    icon: 'Sparkles',
    title: 'Luxury Ambience',
    text: 'Warm wood, golden light and curated music create a space designed for lingering and connection.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Memorable Service',
    text: 'A team that learns your name and your order. Hospitality that turns first-timers into regulars.',
  },
  {
    icon: 'Leaf',
    title: 'Ethically Sourced',
    text: 'Direct-trade beans and local produce. Great taste that you can feel good about, cup after cup.',
  },
  {
    icon: 'MapPin',
    title: 'Heart of Valsad',
    text: 'Opp. Ambe Mata Temple, Green Park — easy to find, hard to leave. The coziest corner of Bhagdwada.',
  },
];

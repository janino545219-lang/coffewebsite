import { MenuItem, Review, Reservation, Order, InventoryItem } from '../types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Velvet Mocha Reserve',
    category: 'Hot Coffee',
    price: 7.50,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Single-origin Ethiopian Yirgacheffe espresso blended with 72% Valrhona dark chocolate, steamed oat milk, and dusted with smoked cinnamon.',
    ingredients: ['Espresso', 'Valrhona Dark Chocolate', 'Oat Milk', 'Smoked Cinnamon'],
    roastLevel: 'Medium',
    origin: 'Yirgacheffe, Ethiopia',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Vegan', 'Organic'],
    calories: 220,
  },
  {
    id: 'item-2',
    name: 'Golden Salted Caramel Latte',
    category: 'Hot Coffee',
    price: 6.80,
    rating: 4.8,
    reviewsCount: 98,
    description: 'Handcrafted house caramel infusion, espresso double shot, velvet micro-foam milk, finished with Maldon sea salt crystals.',
    ingredients: ['Espresso', 'House Caramel Syrup', 'Whole Milk', 'Maldon Sea Salt'],
    roastLevel: 'Medium-Dark',
    origin: 'Antioquia, Colombia',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    calories: 260,
  },
  {
    id: 'item-3',
    name: 'Obsidian Double Espresso',
    category: 'Espresso',
    price: 4.50,
    rating: 5.0,
    reviewsCount: 210,
    description: 'Pure concentrated essence of roasted Sidamo beans with a dark mahogany crema, notes of dark cherry, cedar, and raw cocoa.',
    ingredients: ['100% Arabica Single Origin Espresso'],
    roastLevel: 'Dark',
    origin: 'Sidamo, Ethiopia',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Vegan', 'Organic', 'Gluten-Free'],
    calories: 10,
  },
  {
    id: 'item-4',
    name: 'Nitro Cascade Cold Brew',
    category: 'Iced Coffee',
    price: 6.50,
    rating: 4.9,
    reviewsCount: 175,
    description: 'Steeped for 24 hours under inert nitrogen gas. Silky velvet cascading head with naturally sweet chocolate and hazelnut notes.',
    ingredients: ['Nitrogen Infused Cold Brew Coffee'],
    roastLevel: 'Medium',
    origin: 'Huehuetenango, Guatemala',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Vegan', 'Organic'],
    calories: 15,
  },
  {
    id: 'item-5',
    name: 'Bourbon Vanilla Flat White',
    category: 'Hot Coffee',
    price: 6.20,
    rating: 4.7,
    reviewsCount: 89,
    description: 'Ristretto espresso paired with micro-textured whole milk and Madagascar bourbon vanilla pod extract.',
    ingredients: ['Ristretto Espresso', 'Madagascar Vanilla Bean', 'Microfoam Whole Milk'],
    roastLevel: 'Medium',
    origin: 'Tarrazú, Costa Rica',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    calories: 180,
  },
  {
    id: 'item-6',
    name: 'Kyoto Slow Drip Elixir',
    category: 'Iced Coffee',
    price: 8.00,
    rating: 4.9,
    reviewsCount: 64,
    description: 'Extracted drop-by-drop over 12 hours through glass towers using mineralized mountain spring water. Complex winey character.',
    ingredients: ['Specialty Arabica Cold Drip Coffee'],
    roastLevel: 'Light',
    origin: 'Geisha, Panama',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Vegan', 'Organic'],
    calories: 5,
  },
  {
    id: 'item-7',
    name: 'Pistachio Cloud Matcha',
    category: 'Non-Coffee',
    price: 7.20,
    rating: 4.8,
    reviewsCount: 112,
    description: 'Ceremonial grade Uji Matcha whisked with hot water, layered over cold oat milk and topped with sea salt pistachio cream foam.',
    ingredients: ['Ceremonial Uji Matcha', 'Oat Milk', 'Pistachio Cold Foam', 'Pistachio Crumb'],
    roastLevel: undefined,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Organic', 'Contains Nuts'],
    calories: 240,
  },
  {
    id: 'item-8',
    name: 'Artisan Butter Croissant',
    category: 'Pastries',
    price: 4.80,
    rating: 4.9,
    reviewsCount: 230,
    description: 'Hand-laminated 81-layer French pastry baked fresh every morning with Normandy Isigny butter. Flaky exterior, tender interior.',
    ingredients: ['French Wheat Flour', 'Isigny Butter', 'Organic Yeast', 'Sea Salt'],
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    calories: 320,
  },
  {
    id: 'item-9',
    name: 'Valrhona Chocolate Torte',
    category: 'Desserts',
    price: 8.50,
    rating: 5.0,
    reviewsCount: 88,
    description: 'Flourless 70% dark chocolate cake with espresso ganache glaze and crushed roasted espresso bean brittle.',
    ingredients: ['Valrhona Dark Chocolate', 'Espresso Ganache', 'Organic Eggs', 'Cocoa Nibs'],
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Gluten-Free'],
    calories: 410,
  },
  {
    id: 'item-10',
    name: 'Cardamom Rose Affogato',
    category: 'Desserts',
    price: 7.90,
    rating: 4.9,
    reviewsCount: 52,
    description: 'Artisanal Tahitian vanilla gelato drowned in hot single-origin espresso, infused with cardamom syrup and organic rose petals.',
    ingredients: ['Tahitian Vanilla Gelato', 'Hot Espresso', 'Cardamom Syrup', 'Edible Rose Petals'],
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=800&q=80',
    calories: 280,
  },
  {
    id: 'item-11',
    name: 'Smoked Honey Oat Cappuccino',
    category: 'Hot Coffee',
    price: 6.40,
    rating: 4.8,
    reviewsCount: 76,
    description: 'Double espresso shot combined with steamed oat milk, wild mountain honey, and a torch-smoked cinnamon stick.',
    ingredients: ['Espresso', 'Mountain Honey', 'Oat Milk', 'Smoked Cinnamon'],
    roastLevel: 'Medium',
    origin: 'Sumatra, Indonesia',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Organic'],
    calories: 190,
  },
  {
    id: 'item-12',
    name: 'Salted Caramel Macaron Set',
    category: 'Desserts',
    price: 9.00,
    rating: 4.9,
    reviewsCount: 140,
    description: 'Set of 4 hand-piped Parisian macarons filled with espresso caramel ganache and smoked salt flakes.',
    ingredients: ['Almond Flour', 'Espresso Caramel', 'Sea Salt', 'Valrhona Chocolate'],
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Gluten-Free', 'Contains Nuts'],
    calories: 290,
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    role: 'Food & Wine Critic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Aura Roast redefines coffee culture. The Velvet Mocha Reserve paired with their glassmorphic, sunlit interior creates a transcendental morning ritual.',
    favoriteItem: 'Velvet Mocha Reserve',
    date: '2 days ago'
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    role: 'Architect & Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The attention to detail is staggering—from the custom roasted Sidamo beans to the floating 3D ambient aesthetic. Unmatched ambiance.',
    favoriteItem: 'Obsidian Double Espresso',
    date: '1 week ago'
  },
  {
    id: 'rev-3',
    author: 'Sophia Chen',
    role: 'Certified Sommelier',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The Kyoto Slow Drip Elixir reveals flavor nuances I have never tasted in cold coffee before—white peach, bergamot, and roasted cacao.',
    favoriteItem: 'Kyoto Slow Drip Elixir',
    date: '3 weeks ago'
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'RES-8921',
    customerName: 'Claire Beauchamp',
    email: 'claire@example.com',
    phone: '+1 (555) 234-5678',
    date: '2026-07-24',
    time: '10:30 AM',
    guests: 4,
    seating: 'Indoor Glasshouse',
    specialRequests: 'Anniversary celebration. Window seat preferred.',
    status: 'Confirmed',
    createdAt: '2026-07-21 14:30'
  },
  {
    id: 'RES-8922',
    customerName: 'David Miller',
    email: 'david.m@example.com',
    phone: '+1 (555) 876-5432',
    date: '2026-07-24',
    time: '02:00 PM',
    guests: 2,
    seating: 'Roastery Counter',
    specialRequests: 'Interested in barista tasting flight.',
    status: 'Pending',
    createdAt: '2026-07-22 09:15'
  },
  {
    id: 'RES-8923',
    customerName: 'Sophia Loren',
    email: 'sophia@example.com',
    phone: '+1 (555) 901-2345',
    date: '2026-07-25',
    time: '11:00 AM',
    guests: 6,
    seating: 'Patio Garden',
    specialRequests: 'High chair needed.',
    status: 'Confirmed',
    createdAt: '2026-07-20 16:45'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-1094',
    customerName: 'Arthur Dent',
    email: 'arthur@example.com',
    items: [
      { name: 'Velvet Mocha Reserve', quantity: 2, price: 7.50 },
      { name: 'Artisan Butter Croissant', quantity: 2, price: 4.80 }
    ],
    totalAmount: 24.60,
    status: 'Preparing',
    paymentMethod: 'Apple Pay',
    date: '10 mins ago',
    type: 'Dine-In'
  },
  {
    id: 'ORD-1093',
    customerName: 'Grace Hopper',
    email: 'grace@example.com',
    items: [
      { name: 'Nitro Cascade Cold Brew', quantity: 1, price: 6.50 },
      { name: 'Valrhona Chocolate Torte', quantity: 1, price: 8.50 }
    ],
    totalAmount: 15.00,
    status: 'Ready',
    paymentMethod: 'Credit Card',
    date: '25 mins ago',
    type: 'Takeaway'
  },
  {
    id: 'ORD-1092',
    customerName: 'Oliver Twist',
    email: 'oliver@example.com',
    items: [
      { name: 'Golden Salted Caramel Latte', quantity: 3, price: 6.80 }
    ],
    totalAmount: 20.40,
    status: 'Completed',
    paymentMethod: 'Credit Card',
    date: '1 hour ago',
    type: 'Delivery'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-01',
    name: 'Ethiopia Yirgacheffe Single-Origin Beans',
    category: 'Beans',
    stockLevel: 42,
    unit: 'kg',
    minThreshold: 15,
    supplier: 'Direct Trade Ethiopia Co-op',
    status: 'In Stock'
  },
  {
    id: 'INV-02',
    name: 'Colombia Antioquia Supremo Beans',
    category: 'Beans',
    stockLevel: 12,
    unit: 'kg',
    minThreshold: 20,
    supplier: 'Andean Roast Imports',
    status: 'Low Stock'
  },
  {
    id: 'INV-03',
    name: 'Valrhona 72% Dark Chocolate Pellets',
    category: 'Syrups',
    stockLevel: 8,
    unit: 'kg',
    minThreshold: 10,
    supplier: 'Valrhona France',
    status: 'Low Stock'
  },
  {
    id: 'INV-04',
    name: 'Organic Barista Oat Milk (Oatly)',
    category: 'Dairy & Milk',
    stockLevel: 120,
    unit: 'L',
    minThreshold: 40,
    supplier: 'Oatly Distribution',
    status: 'In Stock'
  },
  {
    id: 'INV-05',
    name: 'Eco Glassmorphic Takeaway Cups 12oz',
    category: 'Packaging',
    stockLevel: 450,
    unit: 'units',
    minThreshold: 500,
    supplier: 'EcoCraft Packaging',
    status: 'Low Stock'
  }
];

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    title: 'The Sunlit Glasshouse Lounge',
    category: 'Ambiance'
  },
  {
    url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    title: 'Pour-Over Precision Bar',
    category: 'Craftsmanship'
  },
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    title: 'Custom German Cast Iron Roaster',
    category: 'Roastery'
  },
  {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    title: 'Barista Latte Art Competition',
    category: 'Artistry'
  },
  {
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    title: 'Evening Jazz & Espresso Flights',
    category: 'Ambiance'
  },
  {
    url: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&w=800&q=80',
    title: 'Handcrafted Pastry Counter',
    category: 'Delicacies'
  }
];

export const REVENUE_ANALYTICS_DATA = [
  { day: 'Mon', revenue: 2450, orders: 112 },
  { day: 'Tue', revenue: 2890, orders: 128 },
  { day: 'Wed', revenue: 3100, orders: 135 },
  { day: 'Thu', revenue: 2950, orders: 130 },
  { day: 'Fri', revenue: 4200, orders: 185 },
  { day: 'Sat', revenue: 5400, orders: 230 },
  { day: 'Sun', revenue: 4800, orders: 210 }
];

export const SALES_BY_CATEGORY = [
  { name: 'Hot Coffee', value: 42 },
  { name: 'Iced Coffee', value: 28 },
  { name: 'Espresso', value: 15 },
  { name: 'Pastries & Desserts', value: 15 }
];

export const POPULAR_TIMES = [
  { time: '6 AM', orders: 12 },
  { time: '8 AM', orders: 45 },
  { time: '10 AM', orders: 38 },
  { time: '12 PM', orders: 55 },
  { time: '2 PM', orders: 42 },
  { time: '4 PM', orders: 28 },
  { time: '6 PM', orders: 15 },
];

export const FEATURED_PRODUCTS = INITIAL_MENU_ITEMS.filter(item => item.isFeatured);
export const ALL_PRODUCTS = INITIAL_MENU_ITEMS;


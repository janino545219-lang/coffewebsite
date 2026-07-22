export type Category = 
  | 'All' 
  | 'Hot Coffee' 
  | 'Iced Coffee' 
  | 'Espresso' 
  | 'Non-Coffee' 
  | 'Pastries' 
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  ingredients: string[];
  roastLevel?: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  origin?: string;
  isFeatured: boolean;
  image: string;
  dietaryTags?: ('Vegan' | 'Gluten-Free' | 'Organic' | 'Contains Nuts')[];
  calories?: number;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  size: 'Standard' | 'Grand' | 'Reserve';
  milk: 'Whole' | 'Oat' | 'Almond' | 'Soy' | 'None';
  sweetness: '100%' | '75%' | '50%' | '25%' | 'Unsweetened';
  notes?: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: 'Indoor Glasshouse' | 'Patio Garden' | 'Roastery Counter';
  specialRequests?: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'Cash';
  date: string;
  type: 'Dine-In' | 'Takeaway' | 'Delivery';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Beans' | 'Dairy & Milk' | 'Syrups' | 'Packaging' | 'Pastry Ingredients';
  stockLevel: number;
  unit: 'kg' | 'L' | 'bottles' | 'boxes' | 'units';
  minThreshold: number;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Critical';
}

export interface Review {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteItem: string;
  date: string;
}

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'customer';
  avatar?: string;
}

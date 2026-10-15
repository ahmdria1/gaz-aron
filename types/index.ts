export type Product = {
  id: string;
  name: string;
  size_kg: number;
  price: number;
  is_active: boolean;
};

export type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'delivering' | 'delivered' | 'cancelled';
  payment_method: 'electronic' | 'cash_on_delivery';
  total_amount: number;
  delivery_fee: number;
  created_at: string;
};

export type City = {
  id: string;
  name: string;
  is_active: boolean;
};

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  loyalty_points: number;
  role: 'user' | 'admin';
};

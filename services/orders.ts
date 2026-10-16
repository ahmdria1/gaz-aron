import { supabase } from '../lib/supabase';
import { validateOrder } from '../utils/validation';

export async function createOrder(input: {
  productId: string;
  quantity?: number;
  paymentMethod: 'electronic' | 'cash_on_delivery';
  isExchange?: boolean;
}) {
  const result = validateOrder(input);
  if (!result.success) {
    return { error: new Error(result.error.issues[0].message) };
  }

  const { productId, quantity, paymentMethod, isExchange } = result.data;

  const { data, error } = await supabase.rpc('create_order', {
    p_product_id: productId,
    p_quantity: quantity,
    p_payment_method: paymentMethod,
    p_is_exchange: isExchange,
  });

  return { data, error };
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('id, status, total_amount, delivery_fee, payment_method, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

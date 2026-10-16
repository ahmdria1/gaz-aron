import { supabase } from '../lib/supabase';

type CreateOrderParams = {
  productId: string;
  quantity?: number;
  paymentMethod: 'electronic' | 'cash_on_delivery';
  isExchange?: boolean;
};

export async function createOrder({
  productId,
  quantity = 1,
  paymentMethod,
  isExchange = false,
}: CreateOrderParams) {
  if (!productId) return { error: new Error('المنتج غير محدد') };
  if (quantity < 1) return { error: new Error('الكمية يجب أن تكون 1 على الأقل') };

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

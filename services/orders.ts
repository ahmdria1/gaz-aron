import { supabase } from '../lib/supabase';
import { addLoyaltyPoints } from './loyalty';
import { createNotification } from './notifications';

type CreateOrderParams = {
  userId: string;
  productId: string;
  quantity?: number;
  paymentMethod: 'electronic' | 'cash_on_delivery';
  isExchange?: boolean;
};

export async function createOrder({
  userId,
  productId,
  quantity = 1,
  paymentMethod,
  isExchange = false,
}: CreateOrderParams) {
  // Validation
  if (!userId) return { error: new Error('المستخدم غير مسجل') };
  if (!productId) return { error: new Error('المنتج غير محدد') };
  if (quantity < 1) return { error: new Error('الكمية يجب أن تكون 1 على الأقل') };

  // جلب بيانات المنتج من قاعدة البيانات (منع التلاعب بالسعر)
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .eq('is_active', true)
    .single();

  if (productError || !product) {
    return { error: productError || new Error('المنتج غير متاح') };
  }

  const deliveryFee = 5;
  const totalAmount = product.price * quantity + deliveryFee;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      status: 'pending',
      payment_method: paymentMethod,
      total_amount: totalAmount,
      delivery_fee: deliveryFee,
    })
    .select()
    .single();

  if (orderError || !order) {
    return { error: orderError };
  }

  await supabase.from('order_items').insert({
    order_id: order.id,
    product_id: productId,
    quantity,
    price: product.price,
    is_exchange: isExchange,
  });

  await addLoyaltyPoints(userId, 10, 'order', order.id);

  await createNotification(
    userId,
    'تم استلام طلبك',
    `طلبك بقيمة ⃁ ${totalAmount} قيد المعالجة`
  );

  return { data: order };
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

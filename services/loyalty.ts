import { supabase } from '../lib/supabase';

export async function addLoyaltyPoints(userId: string, points: number, reason: string, orderId?: string) {
  const { error: txError } = await supabase.from('loyalty_transactions').insert({
    user_id: userId,
    points,
    reason,
    order_id: orderId,
  });

  if (txError) return { error: txError };

  const { data: profile } = await supabase.from('profiles').select('loyalty_points').eq('id', userId).single();
  const newPoints = (profile?.loyalty_points || 0) + points;

  const { error } = await supabase.from('profiles').update({ loyalty_points: newPoints }).eq('id', userId);
  return { error };
}

export async function getLoyaltyPoints(userId: string) {
  const { data } = await supabase.from('profiles').select('loyalty_points').eq('id', userId).single();
  return data?.loyalty_points || 0;
}

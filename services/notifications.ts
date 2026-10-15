import { supabase } from '../lib/supabase';

export async function createNotification(userId: string, title: string, body: string) {
  return supabase.from('notifications').insert({
    user_id: userId,
    title,
    body,
    is_read: false,
  });
}

export async function getNotifications(userId: string) {
  const { data } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return data || [];
}

export async function markAsRead(id: string) {
  return supabase.from('notifications').update({ is_read: true }).eq('id', id);
}

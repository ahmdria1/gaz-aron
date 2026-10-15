import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { Order } from '../types';

export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, [user]);

  async function fetchOrders() {
    if (!user) return;
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (err) {
      setError(err.message);
    } else {
      setOrders(data as Order[]);
    }
    setLoading(false);
  }

  return { orders, loading, error, refetch: fetchOrders };
}

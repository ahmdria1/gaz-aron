import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (err) {
      setError(err.message);
    } else {
      setProducts(data as Product[]);
    }
    setLoading(false);
  }

  return { products, loading, error, refetch: fetchProducts };
}

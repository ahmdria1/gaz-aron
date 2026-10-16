import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from('products')
      .select('id, name, size_kg, price, is_active')
      .eq('is_active', true);

    if (err) {
      setError(err.message);
      setProducts([]);
    } else {
      setProducts(data as Product[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

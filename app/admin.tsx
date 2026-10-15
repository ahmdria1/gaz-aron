import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import type { Product, Order, City } from '../types';

export default function AdminScreen() {
  const [tab, setTab] = useState<'products' | 'orders' | 'cities'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
    fetchData();
  }, []);

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (data?.role !== 'admin') {
      Alert.alert('غير مصرح', 'ليس لديك صلاحية الوصول');
    }
  }

  async function fetchData() {
    setLoading(true);
    const [p, o, c] = await Promise.all([
      supabase.from('products').select('*'),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('cities').select('*'),
    ]);
    if (p.data) setProducts(p.data as Product[]);
    if (o.data) setOrders(o.data as Order[]);
    if (c.data) setCities(c.data as City[]);
    setLoading(false);
  }

  async function toggleCity(id: string, current: boolean) {
    await supabase.from('cities').update({ is_active: !current }).eq('id', id);
    fetchData();
  }

  return (
    <ScreenContainer>
      <Header title="لوحة التحكم" showBack />
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab('products')} style={[styles.tab, tab === 'products' && styles.activeTab]}>
          <Text style={styles.tabText}>المنتجات</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('orders')} style={[styles.tab, tab === 'orders' && styles.activeTab]}>
          <Text style={styles.tabText}>الطلبات</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('cities')} style={[styles.tab, tab === 'cities' && styles.activeTab]}>
          <Text style={styles.tabText}>المدن</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : tab === 'products' ? (
        <FlatList
          data={products}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.sub}>⃁ {item.price}</Text>
            </View>
          )}
        />
      ) : tab === 'orders' ? (
        <FlatList
          data={orders}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>الحالة: {item.status}</Text>
              <Text style={styles.sub}>⃁ {item.total_amount}</Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={cities}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => toggleCity(item.id, item.is_active)}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.sub}>{item.is_active ? 'نشطة' : 'موقوفة'}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: 'row', padding: 16, gap: 8 },
  tab: { flex: 1, padding: 12, backgroundColor: colors.white, borderRadius: 10, alignItems: 'center' },
  activeTab: { backgroundColor: colors.primary },
  tabText: { color: colors.text, fontWeight: '600' },
  loader: { marginTop: 40 },
  card: { backgroundColor: colors.white, marginHorizontal: 16, marginBottom: 8, padding: 16, borderRadius: 12 },
  title: { fontSize: 16, fontWeight: '600', color: colors.text },
  sub: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
});

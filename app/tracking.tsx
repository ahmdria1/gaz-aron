import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import type { Order } from '../types';

export default function TrackingScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setOrders(data as Order[]);
    setLoading(false);
  }

  return (
    <ScreenContainer>
      <Header title="تتبع الطلبات" showBack />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : orders.length === 0 ? (
        <Text style={styles.empty}>لا توجد طلبات حالياً</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.status}>الحالة: {item.status}</Text>
              <Text style={styles.amount}>⃁ {item.total_amount}</Text>
              <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString('ar')}</Text>
            </View>
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loader: { marginTop: 40 },
  empty: { textAlign: 'center', color: colors.textSecondary, marginTop: 40 },
  list: { padding: 24 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 20, marginBottom: 12 },
  status: { fontSize: 16, fontWeight: '600', color: colors.text },
  amount: { fontSize: 18, fontWeight: '700', color: colors.primary, marginVertical: 4 },
  date: { fontSize: 14, color: colors.textSecondary },
});

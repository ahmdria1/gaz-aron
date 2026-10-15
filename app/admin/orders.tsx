import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Header } from '../../components/Header';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { colors } from '../../theme/colors';
import type { Order } from '../../types';

export default function AdminOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data as Order[]);
    setLoading(false);
  }

  async function cancelOrder(id: string) {
    Alert.alert('تأكيد', 'هل تريد إلغاء هذا الطلب؟', [
      { text: 'لا', style: 'cancel' },
      {
        text: 'نعم',
        style: 'destructive',
        onPress: async () => {
          await supabase.from('orders').update({ status: 'cancelled' }).eq('id', id);
          fetchOrders();
        },
      },
    ]);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchOrders();
  }

  return (
    <ProtectedRoute requireAdmin>
      <ScreenContainer>
        <Header title="إدارة الطلبات" showBack />
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
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
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => updateStatus(item.id, 'confirmed')}>
                    <Text style={styles.action}>تأكيد</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateStatus(item.id, 'delivering')}>
                    <Text style={styles.action}>توصيل</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateStatus(item.id, 'delivered')}>
                    <Text style={styles.action}>تم</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => cancelOrder(item.id)}>
                    <Text style={styles.cancel}>إلغاء</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </ScreenContainer>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  loader: { marginTop: 40 },
  list: { padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 12 },
  status: { fontSize: 16, fontWeight: '600', color: colors.text },
  amount: { fontSize: 18, fontWeight: '700', color: colors.primary, marginVertical: 4 },
  date: { fontSize: 14, color: colors.textSecondary },
  actions: { flexDirection: 'row', marginTop: 12, gap: 12 },
  action: { color: colors.primary, fontWeight: '600' },
  cancel: { color: colors.error, fontWeight: '600' },
});

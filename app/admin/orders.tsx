import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Header } from '../../components/Header';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { colors } from '../../theme/colors';
import type { Order } from '../../types';

const PAGE_SIZE = 20;

export default function AdminOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchOrders = useCallback(async (pageNum: number, refresh = false) => {
    if (pageNum === 0) setLoading(true);
    else setLoadingMore(true);

    const from = pageNum * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data } = await supabase
      .from('orders')
      .select('id, status, total_amount, created_at')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (data) {
      setOrders(prev => refresh ? data as Order[] : [...prev, ...data as Order[]]);
      setHasMore(data.length === PAGE_SIZE);
    }

    setLoading(false);
    setLoadingMore(false);
  }, []);

  useEffect(() => {
    fetchOrders(0, true);
  }, [fetchOrders]);

  function loadMore() {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOrders(nextPage);
    }
  }

  async function cancelOrder(id: string) {
    Alert.alert('تأكيد', 'هل تريد إلغاء هذا الطلب؟', [
      { text: 'لا', style: 'cancel' },
      {
        text: 'نعم',
        style: 'destructive',
        onPress: async () => {
          await supabase.from('orders').update({ status: 'cancelled' }).eq('id', id);
          fetchOrders(0, true);
        },
      },
    ]);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchOrders(0, true);
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
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.primary} /> : null}
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

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Header } from '../../components/Header';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { colors } from '../../theme/colors';

type Delivery = {
  id: string;
  order_id: string;
  driver_name: string | null;
  status: string;
  current_location: string | null;
  updated_at: string;
};

export default function AdminTrackingScreen() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  async function fetchDeliveries() {
    setLoading(true);
    const { data } = await supabase
      .from('deliveries')
      .select('*')
      .order('updated_at', { ascending: false });
    if (data) setDeliveries(data as Delivery[]);
    setLoading(false);
  }

  return (
    <ProtectedRoute requireAdmin>
      <ScreenContainer>
        <Header title="تتبع المندوبين" showBack />
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : deliveries.length === 0 ? (
          <Text style={styles.empty}>لا توجد توصيلات حالية</Text>
        ) : (
          <FlatList
            data={deliveries}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.driver}>المندوب: {item.driver_name || 'غير محدد'}</Text>
                <Text style={styles.status}>الحالة: {item.status}</Text>
                <Text style={styles.location}>الموقع: {item.current_location || '-'}</Text>
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
  empty: { textAlign: 'center', color: colors.textSecondary, marginTop: 40 },
  list: { padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 12 },
  driver: { fontSize: 16, fontWeight: '600', color: colors.text },
  status: { fontSize: 14, color: colors.primary, marginTop: 4 },
  location: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
});

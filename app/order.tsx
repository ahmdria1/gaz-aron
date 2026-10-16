import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { createOrder } from '../services/orders';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';

export default function OrderScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const deliveryFee = 5;

  async function placeOrder() {
    if (!productId) {
      Alert.alert('خطأ', 'لم يتم تحديد المنتج');
      return;
    }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert('تنبيه', 'يرجى تسجيل الدخول أولاً');
      router.push('/login');
      setLoading(false);
      return;
    }

    const { error } = await createOrder({
      productId,
      paymentMethod: 'cash_on_delivery',
    });

    setLoading(false);

    if (error) {
      Alert.alert('خطأ', 'فشل إنشاء الطلب');
    } else {
      Alert.alert('نجاح', 'تم إنشاء الطلب بنجاح');
      router.replace('/tracking');
    }
  }

  return (
    <ScreenContainer>
      <Header title="تأكيد الطلب" showBack />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.item}>أسطوانة غاز</Text>
          <Text style={styles.price}>⃁ 28</Text>
          <Text style={styles.delivery}>توصيل: ⃁ {deliveryFee}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={placeOrder} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>تأكيد الطلب</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 20, marginBottom: 24 },
  item: { fontSize: 18, fontWeight: '600', color: colors.text },
  price: { fontSize: 20, fontWeight: '700', color: colors.primary, marginVertical: 8 },
  delivery: { fontSize: 14, color: colors.textSecondary },
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: colors.white, fontSize: 18, fontWeight: '600' },
});

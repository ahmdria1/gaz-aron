import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function OrderScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const deliveryFee = 5;

  async function placeOrder() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert('تنبيه', 'يرجى تسجيل الدخول أولاً');
      router.push('/login');
      setLoading(false);
      return;
    }

    // مثال بسيط - في الواقع تجلب بيانات المنتج من قاعدة البيانات
    const { error } = await supabase.from('orders').insert({
      user_id: user.id,
      status: 'pending',
      payment_method: 'cash_on_delivery',
      total_amount: 33, // مثال
      delivery_fee: deliveryFee,
    });

    setLoading(false);

    if (error) {
      Alert.alert('خطأ', 'فشل إنشاء الطلب');
    } else {
      Alert.alert('نجاح', 'تم إنشاء الطلب بنجاح');
      router.push('/tracking');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>تأكيد الطلب</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.item}>أسطوانة غاز</Text>
          <Text style={styles.price}>⃁ 28</Text>
          <Text style={styles.delivery}>توصيل: ⃁ {deliveryFee}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={placeOrder} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>تأكيد الطلب</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { height: 100, backgroundColor: '#3880C7', justifyContent: 'center', paddingHorizontal: 24 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
  content: { padding: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 24 },
  item: { fontSize: 18, fontWeight: '600', color: '#2E333D' },
  price: { fontSize: 20, fontWeight: '700', color: '#3880C7', marginVertical: 8 },
  delivery: { fontSize: 14, color: '#666' },
  button: { backgroundColor: '#3880C7', borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

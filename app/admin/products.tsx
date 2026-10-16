import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Header } from '../../components/Header';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { colors } from '../../theme/colors';
import type { Product } from '../../types';

export default function AdminProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sizeKg, setSizeKg] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from('products').select('id, name, price, size_kg, is_active');
    if (data) setProducts(data as Product[]);
    setLoading(false);
  }

  async function addProduct() {
    const parsedPrice = parseFloat(price);
    const parsedSize = sizeKg ? parseFloat(sizeKg) : null;

    if (!name.trim()) {
      Alert.alert('خطأ', 'أدخل اسم المنتج');
      return;
    }

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('خطأ', 'أدخل سعراً صحيحاً');
      return;
    }

    const { error } = await supabase.from('products').insert({
      name: name.trim(),
      price: parsedPrice,
      size_kg: parsedSize && !isNaN(parsedSize) ? parsedSize : null,
      is_active: true,
    });

    if (error) {
      Alert.alert('خطأ', error.message);
    } else {
      setName('');
      setPrice('');
      setSizeKg('');
      fetchProducts();
    }
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from('products').update({ is_active: !current }).eq('id', id);
    fetchProducts();
  }

  return (
    <ProtectedRoute requireAdmin>
      <ScreenContainer>
        <Header title="إدارة المنتجات" showBack />

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="اسم المنتج" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="السعر" value={price} onChangeText={setPrice} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="الحجم (كجم)" value={sizeKg} onChangeText={setSizeKg} keyboardType="numeric" />
          <TouchableOpacity style={styles.addBtn} onPress={addProduct}>
            <Text style={styles.addText}>إضافة منتج</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>⃁ {item.price}</Text>
                <Text style={styles.status}>{item.is_active ? 'نشط' : 'موقوف'}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => toggleActive(item.id, item.is_active)}>
                    <Text style={styles.action}>{item.is_active ? 'إيقاف' : 'تفعيل'}</Text>
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
  form: { padding: 16, backgroundColor: colors.white, margin: 16, borderRadius: 12 },
  input: { backgroundColor: colors.background, borderRadius: 8, padding: 12, marginBottom: 8 },
  addBtn: { backgroundColor: colors.primary, borderRadius: 8, padding: 12, alignItems: 'center' },
  addText: { color: colors.white, fontWeight: '600' },
  list: { padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  price: { fontSize: 18, fontWeight: '700', color: colors.primary, marginVertical: 4 },
  status: { fontSize: 14, color: colors.textSecondary },
  actions: { flexDirection: 'row', marginTop: 8 },
  action: { color: colors.primary, fontWeight: '600' },
});

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

type Product = {
  id: string;
  name: string;
  price: number;
  size_kg: number;
};

export default function HomeScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>غاز أرون</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Text style={styles.headerLink}>الحساب</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcome}>مرحباً بك في غاز أرون</Text>
        <Text style={styles.subtitle}>اطلب أسطوانة غاز أو استبدل فارغتك</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#3880C7" />
        ) : products.length === 0 ? (
          <Text style={styles.empty}>لا توجد منتجات متاحة حالياً</Text>
        ) : (
          products.map((product) => (
            <View key={product.id} style={styles.card}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.price}>⃁ {product.price}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push({ pathname: '/order', params: { productId: product.id } })}
              >
                <Text style={styles.buttonText}>اطلب</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.links}>
          <TouchableOpacity onPress={() => router.push('/contact')}>
            <Text style={styles.link}>تواصل معنا</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/terms')}>
            <Text style={styles.link}>الشروط والأحكام</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { height: 100, backgroundColor: '#3880C7', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 },
  logo: { color: '#FFFFFF', fontSize: 28, fontWeight: '700' },
  headerLink: { color: '#FFFFFF', fontSize: 16 },
  content: { padding: 24 },
  welcome: { fontSize: 20, fontWeight: '600', color: '#2E333D', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16 },
  productName: { fontSize: 18, fontWeight: '600', color: '#2E333D' },
  price: { fontSize: 22, fontWeight: '700', color: '#3880C7', marginVertical: 8 },
  button: { backgroundColor: '#3880C7', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, alignSelf: 'flex-end' },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
  links: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 32 },
  link: { color: '#3880C7', fontSize: 16 },
  empty: { textAlign: 'center', color: '#666', marginTop: 40 },
});

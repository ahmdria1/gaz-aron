import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const router = useRouter();
  const { products, loading, error } = useProducts();

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
          <ActivityIndicator size="large" color={colors.primary} />
        ) : error ? (
          <Text style={styles.empty}>حدث خطأ في جلب المنتجات</Text>
        ) : products.length === 0 ? (
          <Text style={styles.empty}>لا توجد منتجات متاحة حالياً</Text>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={() => router.push({ pathname: '/order', params: { productId: product.id } })}
            />
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
  container: { flex: 1, backgroundColor: colors.background },
  header: { height: 100, backgroundColor: colors.primary, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 },
  logo: { color: colors.white, fontSize: 28, fontWeight: '700' },
  headerLink: { color: colors.white, fontSize: 16 },
  content: { padding: 24 },
  welcome: { fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 24 },
  links: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 32 },
  link: { color: colors.primary, fontSize: 16 },
  empty: { textAlign: 'center', color: colors.textSecondary, marginTop: 40 },
});

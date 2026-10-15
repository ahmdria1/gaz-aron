import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { colors } from '../theme/colors';

export default function AdminScreen() {
  const router = useRouter();

  const menuItems = [
    { title: 'إدارة المنتجات', route: '/admin/products' },
    { title: 'إدارة الطلبات', route: '/admin/orders' },
    { title: 'إدارة المستخدمين', route: '/admin/users' },
    { title: 'تتبع المندوبين', route: '/admin/tracking' },
  ];

  return (
    <ProtectedRoute requireAdmin>
      <ScreenContainer>
        <Header title="لوحة التحكم" showBack />
        <View style={styles.content}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={styles.item}
              onPress={() => router.push(item.route as any)}
            >
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScreenContainer>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Header title="الحساب" />
      <View style={styles.content}>
        <Text style={styles.label}>نقاط الولاء</Text>
        <Text style={styles.points}>120</Text>
        <TouchableOpacity style={styles.item} onPress={() => router.push('/tracking')}>
          <Text style={styles.itemText}>سجل الطلبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => router.push('/login')}>
          <Text style={styles.itemText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  label: { fontSize: 16, color: colors.textSecondary, marginBottom: 8 },
  points: { fontSize: 32, fontWeight: '700', color: colors.primary, marginBottom: 24 },
  item: { backgroundColor: colors.white, borderRadius: 12, padding: 20, marginBottom: 12 },
  itemText: { fontSize: 18, fontWeight: '600', color: colors.text },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>الحساب</Text>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { height: 100, backgroundColor: '#3880C7', justifyContent: 'center', paddingHorizontal: 24 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
  content: { padding: 24 },
  label: { fontSize: 16, color: '#666', marginBottom: 8 },
  points: { fontSize: 32, fontWeight: '700', color: '#3880C7', marginBottom: 24 },
  item: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 12 },
  itemText: { fontSize: 18, fontWeight: '600', color: '#2E333D' },
});

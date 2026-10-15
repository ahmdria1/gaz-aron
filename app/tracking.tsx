import { View, Text, StyleSheet } from 'react-native';

export default function TrackingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>تتبع الطلب</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.status}>الطلب قيد التوصيل</Text>
          <Text style={styles.detail}>يصل خلال 30 دقيقة</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { height: 100, backgroundColor: '#3880C7', justifyContent: 'center', paddingHorizontal: 24 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
  content: { padding: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24 },
  status: { fontSize: 18, fontWeight: '600', color: '#2E333D' },
  detail: { fontSize: 14, color: '#666', marginTop: 8 },
});

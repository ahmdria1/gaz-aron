import { View, Text, StyleSheet } from 'react-native';

export default function OrderScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>تأكيد الطلب</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.item}>أسطوانة 12 كجم</Text>
          <Text style={styles.price}>⃁ 28</Text>
          <Text style={styles.delivery}>توصيل: ⃁ 5</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F8' },
  header: { height: 100, backgroundColor: '#1A386B', justifyContent: 'center', paddingHorizontal: 24 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
  content: { padding: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20 },
  item: { fontSize: 18, fontWeight: '600', color: '#14161B' },
  price: { fontSize: 20, fontWeight: '700', color: '#1A386B', marginVertical: 8 },
  delivery: { fontSize: 14, color: '#666' },
});

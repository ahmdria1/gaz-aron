import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>لوحة التحكم</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>إدارة المدن</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>إدارة المنتجات والأسعار</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>إدارة الطلبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>إدارة المستخدمين</Text>
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
  item: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 12 },
  itemText: { fontSize: 18, fontWeight: '600', color: '#2E333D' },
});

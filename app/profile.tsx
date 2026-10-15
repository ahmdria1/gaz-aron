import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>الحساب</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>نقاط الولاء</Text>
        <Text style={styles.points}>120</Text>
        <Text style={styles.label}>سجل الطلبات</Text>
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
});

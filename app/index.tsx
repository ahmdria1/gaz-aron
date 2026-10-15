import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>غاز أرون</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcome}>مرحباً بك في غاز أرون</Text>
        <Text style={styles.subtitle}>اطلب أسطوانة غاز أو استبدل فارغتك</Text>

        <View style={styles.card}>
          <Text style={styles.productName}>أسطوانة 12 كجم</Text>
          <Text style={styles.price}>⃁ 28</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>اطلب</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.productName}>أسطوانة 25 كجم</Text>
          <Text style={styles.price}>⃁ 45</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>اطلب</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F8' },
  header: { height: 100, backgroundColor: '#1A386B', justifyContent: 'center', paddingHorizontal: 24 },
  logo: { color: '#FFFFFF', fontSize: 28, fontWeight: '700' },
  content: { padding: 24 },
  welcome: { fontSize: 20, fontWeight: '600', color: '#14161B', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16 },
  productName: { fontSize: 18, fontWeight: '600', color: '#14161B' },
  price: { fontSize: 22, fontWeight: '700', color: '#1A386B', marginVertical: 8 },
  button: { backgroundColor: '#404852', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, alignSelf: 'flex-end' },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
});

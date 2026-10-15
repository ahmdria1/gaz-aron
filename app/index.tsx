import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

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

        <View style={styles.card}>
          <Text style={styles.productName}>أسطوانة 12 كجم</Text>
          <Text style={styles.price}>⃁ 28</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/order')}>
            <Text style={styles.buttonText}>اطلب</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.productName}>أسطوانة 25 كجم</Text>
          <Text style={styles.price}>⃁ 45</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/order')}>
            <Text style={styles.buttonText}>اطلب</Text>
          </TouchableOpacity>
        </View>

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
});

import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      <TextInput style={styles.input} placeholder="البريد الإلكتروني" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="كلمة المرور" secureTextEntry />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>دخول</Text>
      </TouchableOpacity>
      <Text style={styles.link}>ليس لديك حساب؟ أنشئ حساباً</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#2E333D', marginBottom: 32 },
  input: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 16 },
  button: { backgroundColor: '#3880C7', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  link: { color: '#3880C7', textAlign: 'center', marginTop: 24 },
});

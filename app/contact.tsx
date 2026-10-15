import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>تواصل معنا</Text>
      </View>
      <View style={styles.content}>
        <TextInput style={styles.input} placeholder="الاسم" />
        <TextInput style={styles.input} placeholder="الرسالة" multiline />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>إرسال</Text>
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
  input: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 16, minHeight: 48 },
  button: { backgroundColor: '#3880C7', borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
});

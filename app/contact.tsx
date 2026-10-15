import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name || !message) {
      Alert.alert('خطأ', 'يرجى إدخال الاسم والرسالة');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('contact_messages').insert({ name, email, message });
    setLoading(false);

    if (error) {
      Alert.alert('خطأ', 'فشل إرسال الرسالة');
    } else {
      Alert.alert('نجاح', 'تم إرسال رسالتك');
      setName('');
      setEmail('');
      setMessage('');
    }
  }

  return (
    <ScreenContainer>
      <Header title="تواصل معنا" showBack />
      <View style={styles.content}>
        <TextInput style={styles.input} placeholder="الاسم" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={[styles.input, styles.message]} placeholder="الرسالة" value={message} onChangeText={setMessage} multiline />
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonText}>إرسال</Text>}
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  input: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 16 },
  message: { minHeight: 120, textAlignVertical: 'top' },
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: colors.white, fontSize: 18, fontWeight: '600' },
});

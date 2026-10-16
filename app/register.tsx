import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { supabase } from '../lib/supabase';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  async function getLocation() {
    setLocating(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('تنبيه', 'يرجى السماح بالموقع');
      setLocating(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const [address] = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    const city = address?.city || address?.region || 'غير محدد';
    setLocation(city);
    setLocating(false);
  }

  async function handleRegister() {
    if (!fullName || !email || !phone || !password) {
      Alert.alert('خطأ', 'يرجى تعبئة جميع الحقول');
      return;
    }

    setLoading(true);

    // Profile is created automatically by database trigger
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone, city_name: location },
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert('خطأ', error.message);
      return;
    }

    Alert.alert('نجاح', 'تم إرسال رابط التفعيل إلى بريدك الإلكتروني');
    router.replace('/login');
  }

  return (
    <ScreenContainer>
      <Header title="إنشاء حساب" showBack />
      <View style={styles.content}>
        <TextInput style={styles.input} placeholder="الاسم الكامل" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="رقم الجوال" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="كلمة المرور" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.locationBtn} onPress={getLocation} disabled={locating}>
          {locating ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Text style={styles.locationText}>{location ? `الموقع: ${location}` : 'تحديد الموقع'}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonText}>تسجيل</Text>}
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  input: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 16 },
  locationBtn: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 16, alignItems: 'center' },
  locationText: { color: colors.primary, fontWeight: '600' },
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: colors.white, fontSize: 18, fontWeight: '600' },
});

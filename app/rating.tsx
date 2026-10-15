import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';

export default function RatingScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  async function submitRating() {
    if (rating === 0) {
      Alert.alert('خطأ', 'اختر تقييماً');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('ratings').insert({
      order_id: orderId,
      user_id: user.id,
      rating,
      comment,
    });

    if (error) {
      Alert.alert('خطأ', error.message);
    } else {
      Alert.alert('شكراً', 'تم تسجيل تقييمك');
      router.back();
    }
  }

  return (
    <ScreenContainer>
      <Header title="تقييم الطلب" showBack />
      <View style={styles.content}>
        <Text style={styles.label}>كيف كانت تجربتك؟</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Text style={[styles.star, rating >= star && styles.starActive]}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="تعليق (اختياري)"
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={submitRating}>
          <Text style={styles.buttonText}>إرسال التقييم</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, alignItems: 'center' },
  label: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 16 },
  stars: { flexDirection: 'row', marginBottom: 24 },
  star: { fontSize: 40, color: colors.border, marginHorizontal: 4 },
  starActive: { color: '#F59E0B' },
  input: { backgroundColor: colors.white, borderRadius: 12, padding: 16, width: '100%', minHeight: 100, marginBottom: 16 },
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, width: '100%', alignItems: 'center' },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});

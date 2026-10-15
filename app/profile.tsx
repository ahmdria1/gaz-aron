import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { getLoyaltyPoints } from '../services/loyalty';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  const router = useRouter();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPoints();
  }, []);

  async function loadPoints() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const p = await getLoyaltyPoints(user.id);
      setPoints(p);
    }
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  return (
    <ScreenContainer>
      <Header title="الحساب" />
      <View style={styles.content}>
        <Text style={styles.label}>نقاط الولاء</Text>
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Text style={styles.points}>{points}</Text>
        )}
        <TouchableOpacity style={styles.item} onPress={() => router.push('/tracking')}>
          <Text style={styles.itemText}>سجل الطلبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleLogout}>
          <Text style={styles.itemText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  label: { fontSize: 16, color: colors.textSecondary, marginBottom: 8 },
  points: { fontSize: 32, fontWeight: '700', color: colors.primary, marginBottom: 24 },
  item: { backgroundColor: colors.white, borderRadius: 12, padding: 20, marginBottom: 12 },
  itemText: { fontSize: 18, fontWeight: '600', color: colors.text },
});

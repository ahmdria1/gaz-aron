import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Header } from '../../components/Header';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { colors } from '../../theme/colors';

type UserProfile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  loyalty_points: number;
  role: string;
};

export default function AdminUsersScreen() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data } = await supabase.from('profiles').select('*');
    if (data) setUsers(data as UserProfile[]);
    setLoading(false);
  }

  async function deleteUser(id: string) {
    Alert.alert('تأكيد', 'هل تريد حذف هذا المستخدم؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: async () => {
          await supabase.from('profiles').delete().eq('id', id);
          fetchUsers();
        },
      },
    ]);
  }

  return (
    <ProtectedRoute requireAdmin>
      <ScreenContainer>
        <Header title="إدارة المستخدمين" showBack />
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>{item.full_name || 'بدون اسم'}</Text>
                <Text style={styles.detail}>الجوال: {item.phone || '-'}</Text>
                <Text style={styles.detail}>النقاط: {item.loyalty_points}</Text>
                <Text style={styles.detail}>الدور: {item.role}</Text>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteUser(item.id)}>
                  <Text style={styles.deleteText}>حذف</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScreenContainer>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  loader: { marginTop: 40 },
  list: { padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '600', color: colors.text },
  detail: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  deleteBtn: { marginTop: 12, alignSelf: 'flex-end' },
  deleteText: { color: colors.error, fontWeight: '600' },
});

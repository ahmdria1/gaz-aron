import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { getNotifications, markAsRead } from '../services/notifications';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';

type Notification = {
  id: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const data = await getNotifications(user.id);
      setNotifications(data as Notification[]);
    }
    setLoading(false);
  }

  async function handlePress(id: string, isRead: boolean) {
    if (!isRead) {
      await markAsRead(id);
      loadNotifications();
    }
  }

  return (
    <ScreenContainer>
      <Header title="الإشعارات" showBack />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : notifications.length === 0 ? (
        <Text style={styles.empty}>لا توجد إشعارات</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, !item.is_read && styles.unread]}
              onPress={() => handlePress(item.id, item.is_read)}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString('ar')}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loader: { marginTop: 40 },
  empty: { textAlign: 'center', color: colors.textSecondary, marginTop: 40 },
  list: { padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 10 },
  unread: { borderRightWidth: 4, borderRightColor: colors.primary },
  title: { fontSize: 16, fontWeight: '600', color: colors.text },
  body: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  date: { fontSize: 12, color: colors.textSecondary, marginTop: 8 },
});

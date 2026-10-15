import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>الشروط والأحكام</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.text}>
          مرحباً بك في غاز أرون. باستخدام التطبيق توافق على الشروط التالية...
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { height: 100, backgroundColor: '#3880C7', justifyContent: 'center', paddingHorizontal: 24 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
  content: { padding: 24 },
  text: { fontSize: 16, lineHeight: 24, color: '#2E333D' },
});

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';

export default function TermsScreen() {
  return (
    <ScreenContainer>
      <Header title="الشروط والأحكام" showBack />
      <ScrollView style={styles.content}>
        <Text style={styles.text}>
          مرحباً بك في غاز أرون.\n\n
          باستخدام هذا التطبيق توافق على الشروط والأحكام التالية:\n\n
          1. الطلبات تخضع للتوفر في المدينة المحددة.\n
          2. رسوم التوصيل 5 ⃁.\n
          3. يمكن الدفع إلكترونياً أو عند الاستلام.\n
          4. نقاط الولاء تُحسب حسب سياسة المتجر.\n\n
          للاستفسار: تواصل معنا من خلال التطبيق.
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24 },
  text: { fontSize: 16, lineHeight: 26, color: colors.text },
});

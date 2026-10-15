import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  showBack?: boolean;
};

export function Header({ title, showBack = false }: Props) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  back: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '600',
  },
  placeholder: {
    width: 30,
  },
});

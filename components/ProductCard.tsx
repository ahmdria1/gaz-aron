import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import type { Product } from '../types';

type Props = {
  product: Product;
  onOrder: () => void;
};

export function ProductCard({ product, onOrder }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>⃁ {product.price}</Text>
      <TouchableOpacity style={styles.button} onPress={onOrder}>
        <Text style={styles.buttonText}>اطلب</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginVertical: 8,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },
});

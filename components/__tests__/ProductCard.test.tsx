import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../ProductCard';

const mockProduct = {
  id: '1',
  name: 'أسطوانة 12 كجم',
  size_kg: 12,
  price: 28,
  is_active: true,
};

describe('ProductCard', () => {
  it('renders product name and price correctly', () => {
    const { getByText } = render(<ProductCard product={mockProduct} onOrder={() => {}} />);
    expect(getByText('أسطوانة 12 كجم')).toBeTruthy();
    expect(getByText('⃁ 28')).toBeTruthy();
  });

  it('calls onOrder when button is pressed', () => {
    const onOrder = jest.fn();
    const { getByText } = render(<ProductCard product={mockProduct} onOrder={onOrder} />);
    fireEvent.press(getByText('اطلب'));
    expect(onOrder).toHaveBeenCalledTimes(1);
  });
});

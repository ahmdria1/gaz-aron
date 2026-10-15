import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Header } from '../Header';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

describe('Header', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<Header title="غاز أرون" />);
    expect(getByText('غاز أرون')).toBeTruthy();
  });

  it('shows back button when showBack is true', () => {
    const { getByText } = render(<Header title="الطلب" showBack />);
    expect(getByText('←')).toBeTruthy();
  });
});

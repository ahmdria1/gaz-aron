import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ProtectedRoute } from '../ProtectedRoute';

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: jest.fn() }),
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'u1' }, loading: false }),
}));

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { role: 'admin' }, error: null }),
    })),
  },
}));

describe('ProtectedRoute', () => {
  it('renders children when user is authenticated', () => {
    const { getByText } = render(
      <ProtectedRoute>
        <Text>محتوى محمي</Text>
      </ProtectedRoute>
    );
    expect(getByText('محتوى محمي')).toBeTruthy();
  });
});

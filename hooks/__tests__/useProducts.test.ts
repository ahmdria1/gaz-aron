import { renderHook, waitFor } from '@testing-library/react-native';
import { useProducts } from '../useProducts';

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({
        data: [{ id: '1', name: 'أسطوانة 12 كجم', price: 28, size_kg: 12, is_active: true }],
        error: null,
      }),
    })),
  },
}));

describe('useProducts', () => {
  it('fetches products successfully', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products.length).toBe(1);
    expect(result.current.products[0].name).toBe('أسطوانة 12 كجم');
    expect(result.current.error).toBeNull();
  });
});

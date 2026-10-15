import { createOrder } from '../orders';

jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn((table: string) => {
      if (table === 'products') {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({
            data: { id: 'p1', price: 28, is_active: true },
            error: null,
          }),
        };
      }
      return {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { id: 'o1' }, error: null }),
      };
    }),
  },
}));

jest.mock('../loyalty', () => ({
  addLoyaltyPoints: jest.fn().mockResolvedValue({}),
}));

jest.mock('../notifications', () => ({
  createNotification: jest.fn().mockResolvedValue({}),
}));

describe('createOrder', () => {
  it('rejects invalid quantity', async () => {
    const result = await createOrder({
      userId: 'u1',
      productId: 'p1',
      quantity: 0,
      paymentMethod: 'cash_on_delivery',
    });
    expect(result.error).toBeDefined();
  });

  it('rejects missing user', async () => {
    const result = await createOrder({
      userId: '',
      productId: 'p1',
      paymentMethod: 'cash_on_delivery',
    });
    expect(result.error).toBeDefined();
  });
});

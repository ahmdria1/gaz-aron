import { createOrder, getUserOrders } from '../orders';

jest.mock('../../lib/supabase', () => ({
  supabase: {
    rpc: jest.fn().mockResolvedValue({ data: { id: 'o1' }, error: null }),
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: [], error: null }),
    })),
  },
}));

describe('createOrder', () => {
  it('rejects empty productId', async () => {
    const result = await createOrder({
      productId: '',
      paymentMethod: 'cash_on_delivery',
    });
    expect(result.error).toBeDefined();
  });

  it('rejects zero quantity', async () => {
    const result = await createOrder({
      productId: 'p1',
      quantity: 0,
      paymentMethod: 'cash_on_delivery',
    });
    expect(result.error).toBeDefined();
  });

  it('rejects negative quantity', async () => {
    const result = await createOrder({
      productId: 'p1',
      quantity: -1,
      paymentMethod: 'cash_on_delivery',
    });
    expect(result.error).toBeDefined();
  });

  it('accepts valid order', async () => {
    const result = await createOrder({
      productId: 'p1',
      quantity: 1,
      paymentMethod: 'cash_on_delivery',
    });
    expect(result.data).toBeDefined();
  });
});

describe('getUserOrders', () => {
  it('returns orders', async () => {
    const result = await getUserOrders('u1');
    expect(result.data).toBeDefined();
  });
});

import { createOrder } from '../orders';

jest.mock('../../lib/supabase', () => ({
  supabase: {
    rpc: jest.fn().mockResolvedValue({ data: { id: 'o1' }, error: null }),
  },
}));

describe('createOrder', () => {
  it('rejects invalid quantity', async () => {
    const result = await createOrder({
      productId: 'p1',
      quantity: 0,
      paymentMethod: 'cash_on_delivery',
    });
    expect(result.error).toBeDefined();
  });

  it('rejects missing product', async () => {
    const result = await createOrder({
      productId: '',
      paymentMethod: 'cash_on_delivery',
    });
    expect(result.error).toBeDefined();
  });
});

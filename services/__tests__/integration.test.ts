import { createOrder, getUserOrders } from '../orders';
import { validateOrder } from '../../utils/validation';

const mockRpc = jest.fn();
const mockFrom = jest.fn();

jest.mock('../../lib/supabase', () => ({
  supabase: {
    rpc: (...args: unknown[]) => mockRpc(...args),
    from: (...args: unknown[]) => mockFrom(...args),
  },
}));

describe('Integration: Order Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('validates then creates order', async () => {
    mockRpc.mockResolvedValueOnce({ data: { id: 'order-1', status: 'pending' }, error: null });

    const input = {
      productId: 'prod-1',
      quantity: 2,
      paymentMethod: 'cash_on_delivery' as const,
    };

    const validation = validateOrder(input);
    expect(validation.success).toBe(true);

    const result = await createOrder(input);
    expect(result.error).toBeFalsy();
    expect(result.data).toEqual({ id: 'order-1', status: 'pending' });
    expect(mockRpc).toHaveBeenCalledWith('create_order', expect.objectContaining({
      p_product_id: 'prod-1',
      p_quantity: 2,
    }));
  });

  it('rejects invalid order before RPC', async () => {
    const result = await createOrder({
      productId: '',
      quantity: -1,
      paymentMethod: 'cash_on_delivery',
    });

    expect(result.error).toBeDefined();
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it('handles RPC error', async () => {
    mockRpc.mockResolvedValueOnce({ data: null, error: { message: 'Database error' } });

    const result = await createOrder({
      productId: 'prod-1',
      quantity: 1,
      paymentMethod: 'electronic',
    });

    expect(result.error).toBeDefined();
  });

  it('fetches user orders after creation', async () => {
    const orders = [
      { id: 'o1', status: 'pending', total_amount: 33 },
      { id: 'o2', status: 'delivered', total_amount: 28 },
    ];

    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: orders, error: null }),
    });

    const result = await getUserOrders('user-1');
    expect(result.data).toHaveLength(2);
    expect(result.data?.[0].status).toBe('pending');
  });

  it('full flow: validate -> create -> fetch', async () => {
    mockRpc.mockResolvedValueOnce({ data: { id: 'new-order' }, error: null });
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({
        data: [{ id: 'new-order', status: 'pending' }],
        error: null,
      }),
    });

    const input = {
      productId: 'prod-1',
      quantity: 1,
      paymentMethod: 'cash_on_delivery' as const,
    };

    const validation = validateOrder(input);
    expect(validation.success).toBe(true);

    const created = await createOrder(input);
    expect(created.data?.id).toBe('new-order');

    const fetched = await getUserOrders('user-1');
    expect(fetched.data?.[0].id).toBe('new-order');
  });
});

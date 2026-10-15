import { addLoyaltyPoints, getLoyaltyPoints } from '../loyalty';

// Mock supabase
jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { loyalty_points: 50 }, error: null }),
      update: jest.fn().mockReturnThis(),
    })),
  },
}));

describe('Loyalty Service', () => {
  it('getLoyaltyPoints returns points', async () => {
    const points = await getLoyaltyPoints('user-123');
    expect(points).toBe(50);
  });
});

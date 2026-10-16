import { ERRORS } from '../errors';

describe('ERRORS', () => {
  it('has network error', () => {
    expect(ERRORS.NETWORK).toContain('الاتصال');
  });

  it('has auth error', () => {
    expect(ERRORS.AUTH_REQUIRED).toContain('تسجيل');
  });

  it('has order error', () => {
    expect(ERRORS.ORDER_FAILED).toContain('الطلب');
  });

  it('all values are strings', () => {
    Object.values(ERRORS).forEach(v => {
      expect(typeof v).toBe('string');
      expect(v.length).toBeGreaterThan(0);
    });
  });
});

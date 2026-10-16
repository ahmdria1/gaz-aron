import { validateOrder, isValidEmail, isValidPhone, isValidPrice, isValidQuantity } from '../validation';

describe('Field Validation', () => {
  describe('productId', () => {
    it('rejects empty string', () => {
      const result = validateOrder({
        productId: '',
        paymentMethod: 'cash_on_delivery',
      });
      expect(result.success).toBe(false);
    });

    it('rejects whitespace only', () => {
      const result = validateOrder({
        productId: '   ',
        paymentMethod: 'cash_on_delivery',
      });
      expect(result.success).toBe(false);
    });

    it('accepts valid id', () => {
      const result = validateOrder({
        productId: 'abc-123',
        paymentMethod: 'cash_on_delivery',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('paymentMethod', () => {
    it('accepts electronic', () => {
      const result = validateOrder({
        productId: 'p1',
        paymentMethod: 'electronic',
      });
      expect(result.success).toBe(true);
    });

    it('accepts cash_on_delivery', () => {
      const result = validateOrder({
        productId: 'p1',
        paymentMethod: 'cash_on_delivery',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid method', () => {
      const result = validateOrder({
        productId: 'p1',
        paymentMethod: 'bitcoin',
      });
      expect(result.success).toBe(false);
    });

    it('rejects empty method', () => {
      const result = validateOrder({
        productId: 'p1',
        paymentMethod: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('isExchange', () => {
    it('defaults to false', () => {
      const result = validateOrder({
        productId: 'p1',
        paymentMethod: 'cash_on_delivery',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isExchange).toBe(false);
      }
    });

    it('accepts true', () => {
      const result = validateOrder({
        productId: 'p1',
        paymentMethod: 'cash_on_delivery',
        isExchange: true,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isExchange).toBe(true);
      }
    });
  });

  describe('email edge cases', () => {
    it('rejects missing @', () => {
      expect(isValidEmail('testexample.com')).toBe(false);
    });

    it('rejects missing domain', () => {
      expect(isValidEmail('test@')).toBe(false);
    });

    it('accepts subdomain', () => {
      expect(isValidEmail('test@mail.example.com')).toBe(true);
    });
  });

  describe('phone edge cases', () => {
    it('rejects short number', () => {
      expect(isValidPhone('05123')).toBe(false);
    });

    it('rejects wrong prefix', () => {
      expect(isValidPhone('0612345678')).toBe(false);
    });

    it('accepts with country code and spaces', () => {
      expect(isValidPhone('+966 512 345 678')).toBe(true);
    });
  });

  describe('price edge cases', () => {
    it('rejects negative', () => {
      expect(isValidPrice(-0.01)).toBe(false);
    });

    it('accepts small positive', () => {
      expect(isValidPrice(0.01)).toBe(true);
    });

    it('accepts large number', () => {
      expect(isValidPrice(999999)).toBe(true);
    });
  });

  describe('quantity edge cases', () => {
    it('rejects zero', () => {
      expect(isValidQuantity(0)).toBe(false);
    });

    it('accepts large quantity', () => {
      expect(isValidQuantity(100)).toBe(true);
    });

    it('rejects float', () => {
      expect(isValidQuantity(2.7)).toBe(false);
    });
  });
});

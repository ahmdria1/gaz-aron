import { isValidEmail, isValidPhone, isValidPrice, isValidQuantity } from '../validation';

describe('validation', () => {
  describe('isValidEmail', () => {
    it('accepts valid email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });

    it('rejects invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('accepts Saudi phone', () => {
      expect(isValidPhone('0512345678')).toBe(true);
    });

    it('rejects invalid phone', () => {
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('isValidPrice', () => {
    it('accepts positive price', () => {
      expect(isValidPrice(10)).toBe(true);
    });

    it('rejects zero and negative', () => {
      expect(isValidPrice(0)).toBe(false);
      expect(isValidPrice(-5)).toBe(false);
    });

    it('rejects NaN', () => {
      expect(isValidPrice(NaN)).toBe(false);
    });
  });

  describe('isValidQuantity', () => {
    it('accepts positive integer', () => {
      expect(isValidQuantity(1)).toBe(true);
      expect(isValidQuantity(10)).toBe(true);
    });

    it('rejects zero and negative', () => {
      expect(isValidQuantity(0)).toBe(false);
      expect(isValidQuantity(-1)).toBe(false);
    });

    it('rejects decimal', () => {
      expect(isValidQuantity(1.5)).toBe(false);
    });
  });
});

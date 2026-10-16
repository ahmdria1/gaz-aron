import { formatPrice, formatDate, formatPhone, formatStatus } from '../formatters';

describe('formatters', () => {
  describe('formatPrice', () => {
    it('formats with riyal symbol', () => {
      expect(formatPrice(28)).toBe('⃁ 28.00');
    });

    it('formats decimal', () => {
      expect(formatPrice(28.5)).toBe('⃁ 28.50');
    });
  });

  describe('formatPhone', () => {
    it('formats 05 number', () => {
      expect(formatPhone('0512345678')).toBe('051 234 5678');
    });

    it('formats 966 number', () => {
      expect(formatPhone('966512345678')).toContain('+966');
    });
  });

  describe('formatStatus', () => {
    it('translates pending', () => {
      expect(formatStatus('pending')).toBe('قيد الانتظار');
    });

    it('translates delivered', () => {
      expect(formatStatus('delivered')).toBe('تم التسليم');
    });

    it('returns unknown as-is', () => {
      expect(formatStatus('unknown')).toBe('unknown');
    });
  });

  describe('formatDate', () => {
    it('formats date string', () => {
      const result = formatDate('2026-10-16');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});

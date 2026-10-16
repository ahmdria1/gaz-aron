import { sanitizeInput, isSecurePassword, maskSensitive, generateNonce } from '../security';

describe('security', () => {
  describe('sanitizeInput', () => {
    it('removes HTML tags', () => {
      expect(sanitizeInput('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
    });

    it('trims whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test');
    });

    it('limits length', () => {
      const long = 'a'.repeat(2000);
      expect(sanitizeInput(long).length).toBe(1000);
    });
  });

  describe('isSecurePassword', () => {
    it('rejects short password', () => {
      expect(isSecurePassword('Abc123')).toBe(false);
    });

    it('rejects no uppercase', () => {
      expect(isSecurePassword('abcdef123')).toBe(false);
    });

    it('rejects no lowercase', () => {
      expect(isSecurePassword('ABCDEF123')).toBe(false);
    });

    it('rejects no number', () => {
      expect(isSecurePassword('Abcdefgh')).toBe(false);
    });

    it('accepts strong password', () => {
      expect(isSecurePassword('Abcdefg1')).toBe(true);
    });
  });

  describe('maskSensitive', () => {
    it('masks email', () => {
      const masked = maskSensitive('test@example.com');
      expect(masked.startsWith('test')).toBe(true);
      expect(masked).toContain('*');
    });

    it('masks short value completely', () => {
      expect(maskSensitive('ab', 4)).toBe('**');
    });
  });

  describe('generateNonce', () => {
    it('generates unique values', () => {
      const n1 = generateNonce();
      const n2 = generateNonce();
      expect(n1).not.toBe(n2);
    });

    it('generates non-empty string', () => {
      expect(generateNonce().length).toBeGreaterThan(0);
    });
  });
});

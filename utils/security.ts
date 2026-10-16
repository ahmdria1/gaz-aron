export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000);
}

export function isSecurePassword(password: string): boolean {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
}

export function maskSensitive(value: string, visibleChars = 4): string {
  if (value.length <= visibleChars) return '*'.repeat(value.length);
  return value.slice(0, visibleChars) + '*'.repeat(value.length - visibleChars);
}

export function generateNonce(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^05\d{8}$/.test(phone);
}

export function isValidPrice(price: number): boolean {
  return !isNaN(price) && price > 0;
}

export function isValidQuantity(qty: number): boolean {
  return Number.isInteger(qty) && qty >= 1;
}

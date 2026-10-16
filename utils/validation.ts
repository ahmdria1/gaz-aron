import { z } from 'zod';

export const emailSchema = z.string().email('بريد غير صحيح');

export const phoneSchema = z.string()
  .transform(s => s.replace(/\s+/g, ''))
  .refine(s => /^(05|\+9665|9665)\d{8}$/.test(s), 'رقم غير صحيح');

export const priceSchema = z.number().positive('السعر يجب أن يكون موجباً');

export const quantitySchema = z.number().int().min(1, 'الكمية يجب أن تكون 1 على الأقل');

export const orderSchema = z.object({
  productId: z.string().trim().min(1, 'المنتج مطلوب'),
  quantity: quantitySchema.default(1),
  paymentMethod: z.enum(['electronic', 'cash_on_delivery']),
  isExchange: z.boolean().default(false),
});

export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function isValidPhone(phone: string): boolean {
  return phoneSchema.safeParse(phone).success;
}

export function isValidPrice(price: number): boolean {
  return priceSchema.safeParse(price).success;
}

export function isValidQuantity(qty: number): boolean {
  return quantitySchema.safeParse(qty).success;
}

export function validateOrder(data: unknown) {
  return orderSchema.safeParse(data);
}

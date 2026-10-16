export function formatPrice(price: number): string {
  return `⃁ ${price.toFixed(2)}`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  if (clean.startsWith('966')) {
    return `+${clean.slice(0, 3)} ${clean.slice(3, 5)} ${clean.slice(5)}`;
  }
  if (clean.startsWith('05')) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  return phone;
}

export function formatStatus(status: string): string {
  const map: Record<string, string> = {
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    delivering: 'قيد التوصيل',
    delivered: 'تم التسليم',
    cancelled: 'ملغى',
  };
  return map[status] || status;
}

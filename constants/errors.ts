export const ERRORS = {
  NETWORK: 'خطأ في الاتصال. تحقق من الإنترنت.',
  AUTH_REQUIRED: 'يرجى تسجيل الدخول أولاً',
  INVALID_INPUT: 'البيانات المدخلة غير صحيحة',
  ORDER_FAILED: 'فشل إنشاء الطلب. حاول مرة أخرى.',
  PRODUCT_NOT_FOUND: 'المنتج غير متوفر',
  UNAUTHORIZED: 'ليس لديك صلاحية لهذا الإجراء',
} as const;

export type ErrorKey = keyof typeof ERRORS;

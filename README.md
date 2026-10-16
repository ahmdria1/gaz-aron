# غاز أرون (Gaz Aron)

متجر لبيع واستبدال أسطوانات غاز الطبخ المنزلي.

## الحالة
**المشروع مكتمل وجاهز للتدشين.**

## الميزات
- تسجيل حساب + تفعيل بالبريد + تحديد الموقع
- طلب أونلاين + تتبع الطلبات
- نقاط ولاء + إشعارات تلقائية
- تقييم الطلب بعد التسليم
- لوحة تحكم كاملة:
  - إدارة المنتجات (إضافة / تفعيل / إيقاف)
  - إدارة الطلبات (تأكيد / توصيل / إلغاء)
  - إدارة المستخدمين
  - تتبع المندوبين
- AuthProvider + ProtectedRoute + ErrorBoundary
- ويب + أندرويد + آيفون

## التشغيل
```bash
npm install
npx expo start
```

## الاختبارات
```bash
npm test
```

## التدشين
1. أنشئ مشروعاً على [Supabase](https://supabase.com)
2. نفذ `supabase/schema.sql` ثم `supabase/functions.sql` ثم `supabase/seed.sql`
3. أنشئ ملف `.env`:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
4. بناء الويب:
   ```bash
   npx expo export --platform web
   ```
5. ارفع مجلد `dist` على هوستنجر

## الملفات الرئيسية
- `app/` - الشاشات
- `components/` - المكونات
- `context/` - AuthContext
- `hooks/` - useProducts, useOrders
- `services/` - خدمات الأعمال
- `supabase/` - قاعدة البيانات + دوال RPC

تم التطوير بواسطة **Ahmed Al-Omrani**

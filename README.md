# غاز أرون (Gaz Aron)

متجر لبيع واستبدال أسطوانات غاز الطبخ المنزلي.

## الحالة
**المشروع مكتمل وجاهز للتدشين.**

## الميزات المنفذة
- طلب أونلاين + تتبع الطلبات
- حسابات مستخدمين (تسجيل دخول / خروج)
- لوحة تحكم (منتجات، طلبات، مدن)
- نقاط ولاء (تُضاف تلقائياً عند الطلب)
- إشعارات (تُرسل عند إنشاء الطلب)
- تواصل معنا
- شروط وأحكام
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

## التدشين على هوستنجر
1. أنشئ مشروعاً على [Supabase](https://supabase.com)
2. نفذ `supabase/schema.sql` ثم `supabase/seed.sql` في SQL Editor
3. انسخ URL و Anon Key إلى ملف `.env`:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
4. أنشئ بناء الويب:
   ```bash
   npx expo export --platform web
   ```
5. ارفع محتوى مجلد `dist` على هوستنجر

## الملفات الرئيسية
- `app/` - الشاشات
- `components/` - المكونات المشتركة
- `services/` - خدمات الأعمال
- `supabase/` - هيكل قاعدة البيانات
- `theme/` - الألوان
- `types/` - أنواع TypeScript

تم التطوير بواسطة **Ahmed Al-Omrani**

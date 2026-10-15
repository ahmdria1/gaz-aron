-- بيانات تجريبية لمشروع غاز أرون
-- نفذ هذا بعد schema.sql

insert into cities (name, is_active) values
('تبوك', true),
('المدينة', true),
('جدة', false);

insert into products (name, size_kg, price, is_active) values
('أسطوانة 12 كجم', 12, 28, true),
('أسطوانة 25 كجم', 25, 45, true),
('أسطوانة 6 كجم', 6, 18, true);

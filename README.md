# راهنمای نصب و اجرای ShopZone

ShopZone یک پروژه فروشگاهی سه‌بخشی است که از این قسمت‌ها تشکیل شده است:

- `frontend`: پنل کاربری فروشگاه برای مشتریان
- `admin`: پنل مدیریت محصولات و سفارش‌ها
- `backend`: API سرور، اتصال به MongoDB، احراز هویت، محصولات، سبد خرید و سفارش‌ها

برای توضیح جداگانه قابلیت‌های هر بخش، فایل [FEATURES.md](./FEATURES.md) را ببینید.

## پیش‌نیازها

قبل از اجرا، این موارد باید روی سیستم نصب باشند:

- Node.js نسخه 18 یا بالاتر
- npm

اتصال به دیتابیس و Cloudinary از طریق فایل‌های `.env` آماده انجام می‌شود.

## ساختار پروژه

```text
shopzone/
├── frontend/   # فروشگاه اصلی مشتریان
├── admin/      # پنل مدیریت
└── backend/    # API و دیتابیس
```

## نصب وابستگی‌ها

از ریشه پروژه، وابستگی‌های هر سه بخش را جداگانه نصب کنید:

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

```bash
cd ../admin
npm install
```

## تنظیم فایل‌های محیطی

برای اجرای کامل پروژه، فایل‌های `.env` آماده همراه پروژه در اختیار بررسی‌کننده قرار می‌گیرند. کافی است این فایل‌ها در مسیرهای زیر قرار داشته باشند:

- `backend/.env`
- `frontend/.env`
- `admin/.env`

اگر فایل‌های `.env` آماده را ندارید، می‌توانید فایل‌های example را کپی کنید و مقادیر واقعی را داخل آن‌ها قرار دهید:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp admin/.env.example admin/.env
```

### Backend

در مسیر `backend/.env` این متغیرها باید وجود داشته باشند:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

نکته: بک‌اند به دیتابیس `e-commerce` وصل می‌شود، یعنی مقدار `MONGODB_URL` باید فقط آدرس اصلی اتصال باشد و نام دیتابیس در کد اضافه می‌شود.

### Frontend

در مسیر `frontend/.env` مقدار زیر را قرار دهید:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Admin

در مسیر `admin/.env` مقدار زیر را قرار دهید:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## اجرای پروژه در حالت توسعه

برای اجرای کامل پروژه، سه ترمینال جدا باز کنید.

### اجرای Backend

```bash
cd backend
npm run server
```

اگر همه چیز درست باشد، پیام‌هایی شبیه این می‌بینید:

```text
DB Connected
Server started on PORT :4000
```

### اجرای Frontend

```bash
cd frontend
npm run dev
```

معمولا آدرس اجرا به این شکل است:

```text
http://localhost:5173
```

### اجرای Admin

```bash
cd admin
npm run dev
```

اگر پورت `5173` توسط فرانت‌اند استفاده شده باشد، Vite برای پنل ادمین یک پورت دیگر مثل `5174` انتخاب می‌کند.

## ورود به پنل ادمین

برای ورود به پنل مدیریت، از مقادیر زیر که در `backend/.env` تنظیم کرده‌اید استفاده کنید:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

بعد از ورود، توکن ادمین در `localStorage` ذخیره می‌شود.

## ساخت نسخه Production

برای گرفتن خروجی production از فرانت‌اند:

```bash
cd frontend
npm run build
```

برای گرفتن خروجی production از پنل ادمین:

```bash
cd admin
npm run build
```

برای اجرای بک‌اند در production:

```bash
cd backend
npm start
```

## بررسی کیفیت کد

در فرانت‌اند:

```bash
cd frontend
npm run lint
```

در پنل ادمین:

```bash
cd admin
npm run lint
```

## مسیرهای اصلی API

بک‌اند روی `/api` این بخش‌ها را ارائه می‌کند:

- `/api/user`: ثبت‌نام، ورود کاربر و ورود ادمین
- `/api/product`: افزودن، حذف، لیست و اطلاعات محصول
- `/api/cart`: افزودن به سبد، دریافت سبد و تغییر تعداد
- `/api/order`: ثبت سفارش، لیست سفارش‌ها، سفارش‌های کاربر و تغییر وضعیت سفارش

## پرداخت و سفارش‌ها

در نسخه فعلی، فرانت‌اند روش‌های پرداخت زیر را نمایش می‌دهد:

- زرین‌پال
- بانک ملت
- بانک سامان

سفارش‌ها از مسیر `/api/order/place` در MongoDB ذخیره می‌شوند. اطلاعاتی مثل روش پرداخت، کد پرداخت، نام درگاه، وضعیت پرداخت و پاسخ احتمالی درگاه در مدل سفارش پشتیبانی شده‌اند.

توجه: اتصال واقعی به API درگاه پرداخت و تایید callback هنوز به مستندات و اطلاعات درگاه پرداخت شما نیاز دارد.

## نکات رایج برای خطایابی

- اگر فایل‌های `.env` آماده را دریافت کرده‌اید، مطمئن شوید دقیقا در مسیرهای `backend/.env`، `frontend/.env` و `admin/.env` قرار گرفته‌اند.
- اگر محصولات یا سفارش‌ها نمایش داده نمی‌شوند، مقدار `VITE_BACKEND_URL` را در `frontend/.env` و `admin/.env` بررسی کنید.
- اگر بک‌اند به دیتابیس وصل نمی‌شود، مقدار `MONGODB_URL` و دسترسی شبکه MongoDB Atlas را بررسی کنید.
- اگر آپلود تصویر محصول مشکل دارد، مقادیر Cloudinary در `backend/.env` را بررسی کنید.
- اگر ورود ادمین انجام نمی‌شود، مطمئن شوید `ADMIN_EMAIL` و `ADMIN_PASSWORD` در `.env` بک‌اند با اطلاعات ورود یکی هستند.

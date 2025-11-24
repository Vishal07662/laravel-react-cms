# Laravel + React CMS

A mini Content Management System (CMS) built with Laravel 12, React 18, and Bootstrap 5.
Includes a public website (Blade) and an admin panel (React) with CRUD operations for Posts, Pages, and Media uploads.

---

## **Tech Stack**

- Laravel 12 (PHP 8.2+)
- MySQL / PostgreSQL
- React 18
- Bootstrap 5
- Vite (Laravel 12)

---

## **Setup Instructions**

### **1. Clone Repository**

```bash
git clone hhttps://github.com/Vishal07662/laravel-react-cms.git
cd laravel-react-cms
```

### **2.Backend Setup (Laravel)**
- From the project Root dir `/laravel-react-cms/`:

```bash
    cd backend
    composer install
    cp .env.example .env
    php artisan key:generate
```

- Update .env with your database credentials, e.g.:
```
APP_NAME=LaravelCMS
APP_ENV=local
APP_KEY=base64:GENERATED_KEY
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_cms
DB_USERNAME=root
DB_PASSWORD=secret

FILESYSTEM_DRIVER=public
```
- Run migrations & seeders:
```bash
php artisan migrate --seed
```
- Link storge folder storage/app/public

```bash
storage/app/public folder is linked
```
- Start Laravel server:
```bash
php artisan serve
```

### **3. Frontend Setup (React Admin Panel)**
- From the project Root dir `/laravel-react-cms/`:
- Add api key for the tinymce in `\admin\src\components\partials\Config.js`

```
  TINYMCE_API_KEY: 'tinymce_api_key', // add the tinymce api key here.
```

```bash
cd admin
npm install
npm start
```

- Admin panel will run at http://localhost:3000 by default.
- Ensure Laravel API server is running (port 8000 , saved in the .env file)
- To login in the admin panel use the following credentials:
 ```
 email: admin@demo.com
 pass: adminadmin
 ```


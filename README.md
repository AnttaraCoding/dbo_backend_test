NodeJs RestAPI express
by: Andra Manday

## Package NPM yang digunakan
* [Express](https://www.npmjs.com/package/express) - framework node.js yang minimal dan flexible untuk membangun sebuah web aplikasi dan fiturnya yg bagus untuk web
* [mysql2](https://www.npmjs.com/package/mysql2/) - Database Management System Tool yang dapat mempermudah cara kerja untuk mementukan schema dan interaksi dengan data
* [bcrypt.js](https://www.npmjs.com/package/bcrypt) — ini berfungsi untuk merubah  password menjadi hash sebelum password disimpan didatabase.
* [express-validator](https://www.npmjs.com/package/validator) — digunakan sebagai data validasi yang sesuai dengan keinginan sebelum disimpan didatabase.
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) — JSON Web Token(JWT) kita gunakan untuk authentication and authorization. sangat penting sebagai proteksi data.
* [nodemon](https://nodemon.io/) — Nodemon will re-run the express server every time we make changes to our code.

Cara Mengunakan :

1. Create database mysql di local atau server anda sendiri
2. Setting config database aplikasi pada /src/config/config.js
3. migration table dengan cara **yarn migration || npm run migration**
4. **yarn serve || npm run serve** untuk memulai mengunakan
5. silahkan import collection file postman yang ada didalam directory applikasi
6. base url untuk api [http://localhost:9003/api/v1/{endpoint)](http://localhost:9003/api/v1/)
7. check document api di [http://localhost:9003/api-docs/](http://localhost:9003/api-docs/) | jangan lupa di jalankan **yarn serve || npm run serve**

## git clone && yarn install || npm install

ERD TABEL
![ERD TABEL](https://user-images.githubusercontent.com/88897139/148419107-57142666-e9ad-402d-b938-48e52003110d.png)

API DOCUMENTATION
![API DOC](https://user-images.githubusercontent.com/88897139/148491715-91536691-142a-46a8-9a26-75d655a05602.png)

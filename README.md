# Hướng dẫn chạy chương trình
### Sau khi cài đủ các yêu cầu cần thiết

## SERVER
Trong thư mục server-php chạy lệnh
```bash
php -S 127.0.0.1:8081
```
để chạy server trên cổng 8081

### Xampp
Vào file client/src/lib/util/endpoints.constant.ts thay đổi cổng mặc định ở biến PORT 

## CLIENT
Chạy chương trình với môi trường lập trình
```bash
yarn dev
```

Mở [http://localhost:3000/user/login](http://localhost:3000/user/login) trong trình duyệt để xem kết quả

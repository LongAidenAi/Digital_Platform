#Digital_Platform

### 生成密钥和公钥的方式

```
openssl genrsa -out private.key 4096 //密钥


openssl rsa -in private.key -pubout -out public.key //公钥
```

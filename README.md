# Nodejs Backend

HEALTH API: http://localhost:8000/v1/health
Google Login URL: http://localhost:8000/v1/auth/google/login

APIs:

```sh
health:
/v1/health

auth:
/v1/auth/google/login
```

```sh
openssl genrsa -out private_key.pem 2048
openssl rsa -in private_key.pem -pubout -out public_key.pem
```

### To run workflow locally:

- [Install Act Docs](https://nektosact.com/usage/index.html)

```bash
act -W '.github/workflows/test.yml' --container-architecture=linux/amd64
```

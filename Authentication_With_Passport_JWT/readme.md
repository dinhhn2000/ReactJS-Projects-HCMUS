# Authentication API with passport - jwt
## Some significant packages
* express
* hbs
* mysql
* passport
* passport-jwt
* passport-local
* jsonwebtoken
### Run project
#### Requirements
* Must setup mysql server in the system
* Setup node & npm
#### Run steps
* Step 1: Download project from git
* Step 2: Download necessary packages
* Step 3: Run the following commands
```
npm install
```
```
npm start
```
### Test methods
Using postman to test the API
* Use POST method with the urls:
  * https://localhost/users/register (register the account)
  * https://localhost/auth/login?username=...&password=... (login with username & password)
### Problems
Still cannot setup how to continue checking token for the next request after login
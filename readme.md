# Contacts manager API project

- Video inspo: https://www.youtube.com/watch?v=H9M02of22z4
- Memo for .env: PORT, CONNECTION_STRING, ACCESS_TOKEN_SECRET.

## Details

- express for server
- mongoDB for db
- nodemon to reload server on files saving
- dotenv to use .env file
- express-async-handler to wrap async functions and use try/catch block without writing it
- mongoose for data schemas
- bcrypt for password encoding (before saving in db)
- jsonwebtoken to use jwt (JWT = HEADER.PAYLOAD.VERIFY_SIGNATURE)
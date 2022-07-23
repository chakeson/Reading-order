# Backend server for storing accounts and their reading progress.

Serves as the server backend for the site. 

# TODO

- findOneAndUpdate all must check if something was actually returned like else if (book)

- Add login with Apple.

- Consider storing 10 last IP address from user.

# Installation
Once you have cloned the repository you can install the dependencies with npm.

```
npm install
```
Then open the .env file and fill in the correct values for the database and port. Per the [JWS token libraries](https://github.com/dwyl/hapi-auth-jwt2#generating-your-secret-key) instructions for secret generation use:
``` 
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
For format look at [.env.example](.env.example).

Then to start the server.
```
npm start
```

# API documentation

## Introduction

API for storing and retrieving reading progress associated with a specific account. Allows for account creation and deletion.

On authenticaded endpoints when authentication fails, a redirect is issued. This is so passport-js doesn't send a 401 triggering the browsers built in authentication prompt.

## Endpoints
### /users

### `POST`
This is the endpoint intended for users to register. In the body of the request you need to include the email and password. 
This is the only endpoint that lacks authentication.

The password must be at least 6 characters and no longer then 70 characters, it must contain one uppercase, one lowercase character, one number and one special character (like !"#¤%&).
Emails are normalised and checked for validity and must be unique.

Example:
```
POST http://localhost:3000/api/users HTTP/1.1
content-type: application/x-www-form-urlencoded

email=test@test.com
&password=password1
``` 

### `PUT`
This is the endpoint intended for users to update their password. In the body of the request you need to include the new password. Account selected by authentication, basic used to check if the provided password is correct.

```
PUT http://localhost:3000/api/users HTTP/1.1
content-type: application/x-www-form-urlencoded
Authorization: Basic username password

password=Password2!
```

### `GET`
This endpoint is used to validate the user's credentials. It is intended for the login process. If succesful it returns a JWT token. Username and passport have to be send in the format of base64, this is easily done with javascripts function btoa().

```
GET http://localhost:3100/api/users HTTP/1.1
content-type: application/x-www-form-urlencoded
Authorization: Basic username password
```

### `DELETE`
This is the endpoint intended for users to delete their account and assocated saved information, currently reading progress ony. Requst must contain a bearer token for authentication of account that is intended to be deleted.

Example:
```
DELETE http://localhost:3000/api/users HTTP/1.1
content-type: application/x-www-form-urlencoded
Authorization: Bearer <token>
``` 

### /books

### `POST`
This is the endpoint intended for users to saved reading progress after creating their account. In the body of the request you need to include the book paramater containing the reading progress. The data is then validated to contain only legal characters and of correct length. Requst must contain a bearer token for authentication of account.

Example:
```
POST http://localhost:3000/api/books  HTTP/1.1
content-type: application/x-www-form-urlencoded
Authorization: Bearer <token>

book=[reading progress]
``` 
### `PUT`
This is the endpoint intended for users to update reading progress. If no previous book data was saved it created and saved. In the body of the request you need to include the book paramater containing the reading progress. The data is then validated to contain only legal characters and of correct length. Requst must contain a bearer token for authentication of account.

Example:
```
PUT http://localhost:3000/api/books HTTP/1.1
content-type: application/x-www-form-urlencoded
Authorization: Bearer <token>

book=[reading progress]
``` 
### `GET`
This is the endpoint intended for users to fetch their saved reading progress. Requst must contain a bearer token for authentication of account.

Example:
```
GET http://localhost:3000/api/books HTTP/1.1
content-type: application/x-www-form-urlencoded
Authorization: Bearer <token>
``` 

### /requestdata

### `GET`
Fetch all saved data. Requst must contain a bearer token for authentication of account.

Example:
```
GET http://localhost:3100/api/requestdata HTTP/1.1
content-type: application/x-www-form-urlencoded
Authorization: Bearer <token>
```

# Program flow and structure

The start entry file is server.js. Here we have our library imports and database connection. The library [body parser](https://github.com/expressjs/body-parser) is used to parse the body of the request. [Passport](https://www.passportjs.org/docs/) is then used as middleware to authenticate the user. [Mongoose](https://mongoosejs.com/docs/) for the mongoDB connection.

The folder models contains the schema for the database. The folder routes contains the code that the diffrent routes call to. In the [auth.js](routes/auth.js) is the folder handling the authentication using passports basic http strategy aswell as the JWT token authentication strategy. 

Validation is the folder that controlls api input validation. [validation.js](validation/validation.js) is the function that processes the checks and halts the chain and sends back any failures.

[routes.rest](route.rest) is the file for testing the api and degugging it. It's most easily used, using the vscode pluggin [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to test the api.

## Rate limiting
The server uses the express rate limit package for rate limiting. The global rate limit is set to 10 requests per 10 seconds. For account registration it's set to 3 request per 1 hour.

# Dependencies

[request-ip](https://www.npmjs.com/package/request-ip) for advanced dermination of the user's IP address. Used for saving ip addresses.

# OAUTH2 providers

Used google because it's the most popular and easy to work with.
Abandoned using twitter because libraries are not updated for oauth2. Twitter itself is not easy or smooth to work with. Alot of extra steps and premissions for everything big and small.
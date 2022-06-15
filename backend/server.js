// Imports of libraries
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var cors = require('cors');
var { default: mongoose } = require("mongoose");
const rateLimit = require("express-rate-limit");

var bookRouter = require("./routes/books");
var userRouter = require("./routes/user");
var requestDataRouter = require("./routes/requestdata");
var authRouter = require("./routes/auth");

const { validateUsersPost , validateUsersPut } = require("./validation/users");
const { validateBooksData } = require("./validation/books");
const { validator } = require("./validation/validation");


var port = process.env.PORT || 3100;

// Start/Create express server
const app = express();

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// use the passport package in our applications
app.use(passport.initialize());

// Database connection.
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (error)=>console.error(error))
db.once("open", ()=>console.log("Connected to database."))

// Set up rate limiter. Applied on all routes.
const limiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 10, // limit each IP to 10 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

// Rate limiter for account creation
const createAccountPOSTLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Created to many accounts for now, please try again later.",
    skipFailedRequests: true
});

app.use(limiter);



//'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
// Set up cors
app.use(cors({
    origin: JSON.parse(process.env.CORS_ORIGIN),
    methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS", "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Origin', "Access-Control-Request-Method", "Access-Control-Allow-Credentials",'Access-Control-Allow-Headers', "Access-Control-Request-Headers", "Access-Control-Allow-Methods"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


/*
app.use(function(req, res, callback) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT,HEAD");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    callback();
});
*/

// Create our Express router
const router = express.Router();

// Books routes
router.route("/books")
    .post(validateBooksData, validator, authRouter.isAuthenticatedJWT, bookRouter.postBooks)
    .get(authRouter.isAuthenticatedJWT, bookRouter.getBooks)
    .put(validateBooksData, validator, authRouter.isAuthenticatedJWT, bookRouter.putBooks);

// Users routes
router.route("/users")
    .post(createAccountPOSTLimiter, validateUsersPost, validator, userRouter.postUser)
    .put(validateUsersPut, validator, authRouter.isAuthenticatedJWT, userRouter.putUser)
    .get(authRouter.isAuthenticated, userRouter.getUser)
    .delete(authRouter.isAuthenticatedJWT, userRouter.deleteUser)
    .patch(authRouter.isAuthenticatedJWT, userRouter.patchUser);

// Reqeust for data
router.route("/requestdata")
    .get(authRouter.isAuthenticatedJWT, requestDataRouter.getData);


// Register all our routes with /api
app.use("/api", router)

// Starts the express server
app.listen(port, () => console.log("Server started."));
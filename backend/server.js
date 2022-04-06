// Imports of libraries
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var { default: mongoose } = require("mongoose");

var bookRouter = require("./routes/books");
var userRouter = require("./routes/user");
var authRouter = require("./routes/auth");

const { validateUsersPost } = require("./validation/users");
const { validateBooksData } = require("./validation/books");
const { validator } = require("./validation/validation");


var port = process.env.PORT || 3000;

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


// Create our Express router
const router = express.Router();

// Books routes
router.route("/books")
    .post(validateBooksData, validator, authRouter.isAuthenticated, bookRouter.postBooks)
    .get(authRouter.isAuthenticated, bookRouter.getBooks)
    .put(validateBooksData, validator, authRouter.isAuthenticated, bookRouter.putBooks);

// Users routes
router.route("/users")
    .post(validateUsersPost, validator, userRouter.postUser)
    .delete(authRouter.isAuthenticated, userRouter.deleteUser);

// Register all our routes with /api
app.use("/api", router)

// Starts the express server
app.listen(port, () => console.log("Server started."));
// Imports of libraries
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var { default: mongoose } = require("mongoose");

var bookRouter = require("./routes/books");
var userRouter = require("./routes/user");
var authRouter = require("./routes/auth");

var port = process.env.PORT || 3000;

// Start/Create express server
const app = express();

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection.
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (error)=>console.error(error))
db.once("open", ()=>console.log("Connected to database."))


// Create our Express router
const router = express.Router();

// Books routes
router.route("/books").post(authRouter.isAuthenticated, bookRouter.postBooks).get(authRouter.isAuthenticated, bookRouter.getBooks).put(authRouter.isAuthenticated, bookRouter.putBooks);

// Users routes
router.route("/users").post(userRouter.postUser).delete(authRouter.isAuthenticated, userRouter.deleteUser);


// Starts the express server
app.listen(port, () => console.log("Server started."));
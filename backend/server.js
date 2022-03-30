// Imports of libraries
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser"); 
var { default: mongoose } = require("mongoose");

var bookRouter = require("./routes/books");

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
router.route("/books").post(bookRouter.postBooks).get(bookRouter.getBooks).put(bookRouter.putBooks);

/*
// Create our Express router
const bookRouter = require("./routes/books")

app.use("/books", bookRouter)
*/

// Starts the express server
app.listen(port, () => console.log("Server started."));
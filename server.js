// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const test = require("./routes/test");
const homepage = require("./routes/homepage");
const getLogin = require("./routes/getLogin");
const postLogin = require("./routes/postLogin");
const getFeeds = require("./routes/getFeeds");
const getMyResources = require("./routes/getMyResources");
const getProfile = require("./routes/getProfile");
const getRegister = require("./routes/getRegister");
const getResourceBuilder = require("./routes/getResourceBuilder");
const postLogout = require("./routes/postLogout");
// const postMyResources = require("./routes/postMyResources");
const postProfile = require("./routes/postProfile");
const postRegister = require("./routes/postRegister");
const postResourceBuilder = require("./routes/postResourceBuilder");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/homepage", homepage(db));
app.use("/", getLogin(db));
app.use("/", postLogin(db));
app.use("/", getFeeds(db));
app.use("/", getMyResources(db));
app.use("/", getProfile(db));
app.use("/", getRegister(db));
app.use("/", getResourceBuilder(db));
app.use("/", postLogout(db));
app.use("/", postRegister(db));
app.use("/", postProfile(db));
app.use("/", postResourceBuilder(db));
// app.use("/", postMyResources(db));
app.use("/test", test(db));
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

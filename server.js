// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup






//        in case we need extra dependencies!!!!!!!!!!!!!!!!!!!!!!!!!!!

const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcryptjs = require('bcryptjs');
const generateRandomString = () => {
  return Math.random().toString(36).substring(6);
};










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

//redirect index to homepage
app.get("/", (req, res) => {
  res.redirect("/homepage");
});

//route register submit button to feed, if no user_id refresh register
app.get("/register", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/feeds");
  } else {
    res.redirect("/register");
  }
});

//route login submit button to feed, if no user_id refresh login
app.get("/login", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/feeds");
  } else {
    res.redirect("/login");
  }
});










//trying to add functions from tiny app to recreate the user/password db !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const getUserByEmail = (email, database) => {
  return Object.values(database).find(user => user.email === email);
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

const addUser = (email, password) => {
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const id = generateRandomString();
  users[id] = {
    id,
    email,
    password: hashedPassword
  };
  return id;
};


// in case we need to parse middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  cookieSession({
    name: 'session',
    keys: [' '],
  })
);

app.post("/login", (req,res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email, users);
  if (!user) {
    let templateVars = {
      status: 401,
      message: "Can't find email.... where is it?",
      user: users[req.session.user_id]
    };
    res.status(401);
    res.render("urls_error", templateVars);
  } else if (!bcryptjs.compareSync(password, user.password)) {
    let templateVars = {
      status: 401,
      message: "BRRR Password Incorrecto",
      user: users[req.session.user_id]
    };
    res.status(401);
    res.render("urls_error", templateVars);
  } else {
    // eslint-disable-next-line camelcase
    req.session.user_id = user.id;
    res.redirect("/urls");
  }
});



app.post("/register", (req, res) => {
  const { email, password } = req.body;
  let user = {email: 'undefined'};
  if (!email || !password) {
    let templateVars = {
      status: 400,
      message: "so... your email and/or password is missing...",
      user
    };
    res.status(401);
    res.render("urls_error", templateVars);
    ("so... your email and/or password is missing...");
  } else if (getUserByEmail(email, users)) {
    let templateVars = {
      status: 409,
      message: "Uh... that email is already registered sooo.....",
      user: users[req.session.user_id]
    };
    res.status(409);
    res.render("urls_error", templateVars);
  } else {
    const user_id = addUser(email, password, users);
    req.session.user_id = user_id;
    res.redirect("/urls");
  }
});









// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

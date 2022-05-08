// Post calls
app.get("/", (req, res) => {
  const userID = req.session.user_id;
  const user = users[userID]; // modify to go into SQL database
  if (user) {
    res.redirect("/feeds");
  }
});

app.get("/login", (req, res) => {
  const userId = req.session.user_id;
  const user = users[userId]; // modify to go into SQL database
  if (user) {
    return res.redirect("/feeds");
  }
  const templateVars = {
    user
  };
  res.render("login", templateVars);
})

app.post("/login", (req, res) => {

  if (!emailCheck(req.body.email, users)) { // modify to go into SQL database
    res.statusCode = 403;
    res.send('<h2>403 This email is not registered. Please try again or resgister a new account!</h2>')
  } else {
    let user = emailCheck(req.body.email, users); // modify to go into SQL database
    let userPassword = user.password;
    let userID = user.id;
    const comparePassword = bcrypt.compareSync(req.body.password, user.password);
    if (!comparePassword) {
      res.statusCode = 403;
      return res.send('<h2>403 You entered the wrong password, please try again.</h2>')
    } else {
      req.session.user_id = userID;
      res.redirect("/feeds")
    }
  }
});

//post call that checks if email is already registered during registration.. generates encrypted passwords.. error messages if user already exists

app.get("/register", (req, res) => {
  const userId = req.session.user_id;
  const user = users[userId]; // modify to go into SQL database
  if (user) {
    return res.redirect("/feeds");
  }
  const templateVars = {
    user
  };
  res.render('user-registration', templateVars);
})

app.post("/register", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  if (email && password && username) {
    if (!emailCheck(email, users)) {
      req.session.user_id = username;
      res.redirect('/feeds')
    } else {
      res.statusCode = 400;
      res.send('<h2>400 Email already exists. Please try again.</h2>')
    }
  } else {
    res.statusCode = 400;
    res.send('<h2>400 Please try again.</h2>')
  }
});


app.post("/logout", (req, res) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect("/");
})

app.get("/feeds", (req, res) => {
  const userId = req.session.user_id; // modify to go into SQL database
  const user = users[userId];

  if (!user) {
    res.status(401);
    res.redirect("/");
  }
  res.render("feeds", templateVars);
});

app.get("/resource-builder", (req, res) => {
  const userId = req.session.user_id;
  const user = users[userId]; // modify to go into SQL database
  if (!user) {
    return res.redirect("/");
  }
  // const templateVars = {
  //   user
  // };
  res.render("resource-builder" /*, templateVars */);
});

app.post("/resource-builder", (req, res) => {
  // receive value for title, URL, description.
  // create a query that inserts values for title url description into table resources
  //receive value for categories
  //create a query that inserts values for categories into categories table
  //update feeds table with new resource post
  // redirect to feeds
  res.redirect("/feeds");
});

app.get("/my-resources", (req, res) => {
  const userId = req.session.user_id; //modify to go into SQL database
  const user = users[userId];

  if (!user) {
    res.status(401);
    res.redirect("/");
  }
  // const userDB = urlsForUser(userId, urlDatabase);
  // const templateVars = {
  //   user,
  //   urls: userDB
  // };

  res.render("my-resources", templateVars);
});

// app.post("/my-resources", (req, res) => {

// });

app.get("/profile", (req, res) => {
  // get the cookie value associated to the user id (username)
  const userId = req.session.user_id;
  const user = users[userId]; // modify to go into SQL database
  if (!user) {
    return res.redirect("/");
  }
  const templateVars = {
    user
  };
  res.render('profile', templateVars);
});

app.post("/profile", (req, res) => {
  // get the cookie value associated to the user id (username)
  let username = req.body.username;
  // create a query to update username
  res.redirect('/profile')
  //popup that says "profile updated"
});


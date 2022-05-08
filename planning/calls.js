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





const { database } = require("pg/lib/defaults");

app.get("/", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.send({message: "not logged in"});
    return;
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.send({error: "no user with that id"});
        return;
      }

      // res.redirect("/feeds");
      res.send({user: {username: user.username, email: user.email, id: userId}});
    })
    .catch(e => res.send(e));

  // const userID = req.session.user_id;
  // const user = users[userID]; // modify to go into SQL database
  // if (user) {
  //   res.redirect("/feeds");
  // }
});

app.get("/login", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.send({message: "not logged in"});
    return;
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.send({error: "no user with that id"});
        return;
      }

      res.send({user: {username: user.username, email: user.email, id: userId}});
    })
    .catch(e => res.send(e));
  // const userId = req.session.user_id;
  // const user = users[userId]; // modify to go into SQL database
  // if (user) {
  //   return res.redirect("/feeds");
  // }
  const templateVars = {
    user
  };
  res.render("login", templateVars);
})

app.post("/login", (req, res) => {
  const providedEmail = req.body.email;
  const providedPw = req.body.password;

  login(providedEmail, providedPw)
    .then(user => {
      if (!user) {
        // res.statusCode = 403;
        // res.send('<h2>403 Incorrect username/password. Please try again or resgister a new account!</h2>')
        res.send({error: "error"});
        return;
      }
      // req.session.user_id = userID;
      // res.redirect("/feeds")
      req.session.userId = user.id;
      res.send({user: {username: user.username, email: user.email, id: user.id}});
    })
    .catch(e => res.send(e));

  res.redirect("/feeds");

  // if (!emailCheck(req.body.email, users)) { // modify to go into SQL database
  //   res.statusCode = 403;
  //   res.send('<h2>403 This email is not registered. Please try again or resgister a new account!</h2>')
  // } else {
  //   let user = emailCheck(req.body.email, users); // modify to go into SQL database
  //   let userPassword = user.password;
  //   let userID = user.id;
  //   const comparePassword = bcrypt.compareSync(req.body.password, user.password);
  //   if (!comparePassword) {
  //     res.statusCode = 403;
  //     return res.send('<h2>403 You entered the wrong password, please try again.</h2>')
  //   } else {
  //     req.session.user_id = userID;
  //     res.redirect("/feeds")
  //   }
  // }
});

//post call that checks if email is already registered during registration.. generates encrypted passwords.. error messages if user already exists

app.get("/register", (req, res) => {
  const userId = req.session.userId;
  // if (!userId) {
  //   res.send({message: "not logged in"});
  //   return;
  // }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        //res.render('user-registration');
        // return;
        res.send({error: "no user with that id"});
        return null;
      }
      // res.redirect("/feeds");
      res.send({user: {username: user.username, email: user.email, id: userId}});
    })
    .catch(e => res.send(e));

  // const userId = req.session.user_id;
  // const user = users[userId]; // modify to go into SQL database
  // if (user) {
  //   return res.redirect("/feeds");
  // }
  // const templateVars = {
  //   user
  // };
  // res.render('user-registration');
})

app.post("/register", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  registrationAuthentication(email, password, username)
    .then(user => {
      if (!user) {
        // res.redirect('/feeds');
        res.send({error: 'error'});
        return;
      }
      //res.statusCode = 400;
      //res.send('<h2>400 Email or Password already exists. Please try again.</h2>')
      req.session.userId = user.id;
      res.send({user: {username: user.username, email: user.email, id: user.id}});
    })
    .catch(e => res.send(e));

  // if (email && password && username) {
  //   if (!emailCheck(email, users)) {
  //     req.session.user_id = username;
  //     res.redirect('/feeds')
  //   } else {
  //     res.statusCode = 400;
  //     res.send('<h2>400 Email already exists. Please try again.</h2>')
  //   }
  // } else {
  //   res.statusCode = 400;
  //   res.send('<h2>400 Please try again.</h2>')
  // }
});


app.post("/logout", (req, res) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect("/");
})

app.get("/feeds", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    // res.status(401);
    // res.redirect("/");
    res.send({message: "not logged in"});
    return;
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        // res.status(401);
        // res.redirect("/");
        res.send({error: "no user with that id"});
        return;
      }

      // res.render("feeds", templateVars);
      res.send({user: {username: user.username, email: user.email, id: userId}});
    })
    .catch(e => res.send(e));


  // const userId = req.session.user_id; // modify to go into SQL database
  // const user = users[userId];

  // if (!user) {
  //   res.status(401);
  //   res.redirect("/");
  // }
  // res.render("feeds", templateVars);
});

app.get("/resource-builder", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    // return res.redirect("/");
    res.send({message: "not logged in"});
    return;
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        // res.status(401);
        // res.redirect("/");
        res.send({error: "no user with that id"});
        return;
      }

      // res.render("resource-builder" /*, templateVars */);
      res.send({user: {username: user.username, email: user.email, id: userId}});
    })
    .catch(e => res.send(e));


  // const userId = req.session.user_id;
  // const user = users[userId]; // modify to go into SQL database
  // if (!user) {
  //   return res.redirect("/");
  // }
  // const templateVars = {
  //   user
  // };
  // res.render("resource-builder" /*, templateVars */);
});

app.post("/resource-builder", (req, res) => {
  let url = req.body.url;
  let title = req.body.title;
  let description = req.body.description;
  let categories = req.body.categories

  createNewResource(url, title, description)
    .then(resource => {

    })
  // receive value for title, URL, description.
  // create a query that inserts values for title url description into table resources
  //receive value for categories
  //create a query that inserts values for categories into categories table
  //update feeds table with new resource post
  // redirect to feeds
  res.redirect("/feeds");
});

app.get("/my-resources", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    // res.status(401);
    // res.redirect("/");
    res.send({message: "not logged in"});
    return;
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        // res.status(401);
        // res.redirect("/");
        res.send({error: "no user with that id"});
        return;
      }

      // res.render("my-resources", templateVars);
      res.send({user: {username: user.username, email: user.email, id: userId}});
    })
    .catch(e => res.send(e));


  // const userId = req.session.user_id; //modify to go into SQL database
  // const user = users[userId];

  // if (!user) {
  //   res.status(401);
  //   res.redirect("/");
  // }
  // const userDB = urlsForUser(userId, urlDatabase);
  // const templateVars = {
  //   user,
  //   urls: userDB
  // };

  // res.render("my-resources", templateVars);
});

// app.post("/my-resources", (req, res) => {

// });

app.get("/profile", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    // return res.redirect("/");
    res.send({message: "not logged in"});
    return;
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        // res.status(401);
        // res.redirect("/");
        res.send({error: "no user with that id"});
        return;
      }

      // res.render("profile", templateVars);
      res.send({user: {username: user.username, email: user.email, id: userId}});
    })
    .catch(e => res.send(e));


  // get the cookie value associated to the user id (username)
  // const userId = req.session.user_id;
  // const user = users[userId]; // modify to go into SQL database
  // if (!user) {
  //   return res.redirect("/");
  // }
  // const templateVars = {
  //   user
  // };
  // res.render('profile', templateVars);
});

app.post("/profile", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    // return res.redirect("/");
    res.send({message: "not logged in"});
    return;
  }

  let newUsername = req.body.username;

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        // res.status(401);
        // res.redirect("/");
        res.send({error: "no user with that id"});
        return;
      }
      if (user.id === userId) {
        updateUsername(newUsername, userId)
      }

      // res.redirect('/profile')
      // popup that says "profile updated"
      res.send({user: {username: user.username, email: user.email, id: userId}});
    })
    .catch(e => res.send(e));


  // get the cookie value associated to the user id (username)
  // call function to get user by username(which is the cookie)
  // let userID = id of the user returned
  // let newUsername = req.body.username;
  // create a query to update username
  // set cookie value to be value of new username
  // res.redirect('/profile')
  // popup that says "profile updated"
});


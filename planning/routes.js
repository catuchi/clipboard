const { redirect } = require("express/lib/response");
const { database } = require("pg/lib/defaults");

app.get("/", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.render("homepage");
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.render("homepage");
      }

      res.redirect("/feeds");
    })
    .catch(e => res.send(e));

});

app.get("/login", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.render('login');
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.render('login');
      }

      res.redirect("/feeds");
    })
    .catch(e => res.send(e));

})

app.post("/login", (req, res) => {
  const providedEmail = req.body.email;
  const providedPw = req.body.password;

  login(providedEmail, providedPw)
    .then(user => {
      if (!user) {
        const templateVars = { error: "Incorrect username/password. Please try again or resgister a new account!"};
        res.render("login", templateVars);
      }
      req.session.user_id = userID;
      res.redirect("/feeds")
    })
    .catch(e => res.send(e));
});


app.get("/register", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.render('register');
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.render('register');
      }

      res.redirect("/feeds");
    })

})

app.post("/register", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  getUserByEmail(email)
    .then(user => {
      if (user) {
        res.redirect('/feeds');
        // const templateVars = { error: "Email already exists, please provide valid input"};
        // res.render("/register", templateVars);
        // return;
      }
      addUser(username, password, email)
        .then(user => {
          req.session.userId = user.id;
          res.redirect("/feeds");
        })
        .catch(e => res.send(e));
    })
    .catch(e => res.send(e));

});


app.post("/logout", (req, res) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect("/");
})

app.get("/feeds", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect("/");
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.redirect("/");
      }
      // function to get all resources from db
      // assign values to templateVars
      const templateVars = getAllResources(limit);
      res.render("feeds", templateVars);
    })
    .catch(e => res.send(e));
});

app.get("/resource-builder", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect("/");
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.redirect("/");
      }

      res.render("resource-builder");
    })
    .catch(e => res.send(e));
});

app.post("/resource-builder", (req, res) => {
  let url = req.body.url;
  let title = req.body.title;
  let description = req.body.description;
  let categories = req.body.categories
  let userId = req.session.userId;

  // call function to insert category and return categoryid
  createNewCategory(categories)
    .then(category => {
      const categoryId = category.id;
    })
    .catch(e => res.send(e));

  createNewResource(url, title, description, categoryId, userId)
    .then(resource => {
      res.redirect("/feeds");
    })
});

app.get("/my-resources", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect("/");
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.redirect("/");
      }
      // call function to get resources by this user
      // pass that value as templateVars
      const templateVars = getResourcesByUserId(userId, limit);
      res.render("my-resources", templateVars);
    })
    .catch(e => res.send(e));
});

// app.post("/my-resources", (req, res) => {

// });

app.get("/profile", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect("/");
  }

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.redirect("/");
      }
      // get username info from db and pass as templateVars
      const templateVars = getUserById(userId);
      res.render("profile", templateVars);
    })
    .catch(e => res.send(e));

});

app.post("/profile", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect("/");
  }

  let newUsername = req.body.username;

  database.getUserById(userId)
    .then(user => {
      if (!user) {
        res.redirect("/");
      }
      if (user.id === userId) {
        updateUsername(newUsername, userId)
        const templateVars = { message: "Profile updated"};
        res.render("/profile", templateVars);
      }
    })
    .catch(e => res.send(e));

});


/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/home", (req, res) => {
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

  router.get("/login", (req, res) => {
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

  });

  const login =  function(email, password) {
    return database.getUserByEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }

  router.post("/login", (req, res) => {
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

  router.get("/register", (req, res) => {
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

  });

  router.post("/register", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    database.getUserByEmail(email)
      .then(user => {
        if (user) {
          res.redirect('/feeds');
          // const templateVars = { error: "Email already exists, please provide valid input"};
          // res.render("/register", templateVars);
          // return;
        }
        database.addUser(username, password, email)
          .then(user => {
            req.session.userId = user.id;
            res.redirect("/feeds");
          })
          .catch(e => res.send(e));
      })
      .catch(e => res.send(e));

  });

  router.post("/logout", (req, res) => {
    res.clearCookie('session');
    res.clearCookie('session.sig');
    res.redirect("/");
  });

  return router;
}

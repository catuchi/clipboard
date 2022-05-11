/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  const login =  function(email, password) {
    return database.getUserByEmail(email)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  };

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
        res.redirect("/feeds");
      })
      .catch(e => res.send(e));
  });

  return router;
};

const express = require('express');
const router  = express.Router();

module.exports = (database) => {
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

  return router;
}

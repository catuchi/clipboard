const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/login", (req, res) => {
    console.log("hello");
    return res.render("login");
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

  return router;
}

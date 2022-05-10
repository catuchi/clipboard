const express = require('express');
const router  = express.Router();

module.exports = (database) => {
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

  return router;
}

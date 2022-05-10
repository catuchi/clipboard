const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/", (req, res) => {
    console.log("hello");
    return res.render("homepage");
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

  return router;

}

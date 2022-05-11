const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/resource-builder", (req, res) => {
    return res.render("resourceBuilder")
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

  return router;
}

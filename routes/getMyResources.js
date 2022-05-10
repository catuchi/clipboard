const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/my-resources", (req, res) => {
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
        const templateVars = database.getResourcesByUserId(userId, limit);
        res.render("my-resources", templateVars);
      })
      .catch(e => res.send(e));
  });

  return router;
}

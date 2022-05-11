const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/feeds", (req, res) => {
    return res.render("feeds");
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
        const templateVars = database.getAllResources(limit);
        res.render("feeds", templateVars);
      })
      .catch(e => res.send(e));
  });

  return router;
}

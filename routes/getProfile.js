const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/profile", (req, res) => {
    return res.render("profilePage");
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
        const templateVars = database.getUserById(userId);
        res.render("profile", templateVars);
      })
      .catch(e => res.send(e));

  });

  return router;
}

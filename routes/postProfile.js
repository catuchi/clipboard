const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.post("/profile", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.redirect("/");
    }

    let newUsername = req.body.username;

    database.getUserById(userId)
      .then(user => {
        if (!user) {
          res.redirect("/");
        }
        if (user.id === userId) {
          database.updateUsername(newUsername, userId)
          const templateVars = { message: "Profile updated"};
          res.render("/profile", templateVars);
        }
      })
      .catch(e => res.send(e));

  });

  return router;
}

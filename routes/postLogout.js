const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.post("/logout", (req, res) => {
    res.clearCookie('session');
    res.clearCookie('session.sig');
    res.redirect("/");
  });

  return router;
}

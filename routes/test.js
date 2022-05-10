const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/", (req, res) => {
    res.send('Im in');

  });
  return router;
}

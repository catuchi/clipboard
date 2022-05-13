const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query('SELECT * FROM resources')
      .then(resources => {
        const templateVars = {resources: resources.rows};
        console.log(templateVars);
        res.render("feeds", templateVars);
      });

  });
  return router;

};

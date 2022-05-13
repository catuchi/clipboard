const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.post("/resource-builder", (req, res) => {
    let url = req.body.url;
    let title = req.body.title;
    let description = req.body.description;
    let categories = req.body.categories;

    // call function to insert category and return categoryid
    database.query('insertQuery!!!!!!!!!')
      .then(category => {
        res.redirect("/feeds");
        // })
      })
      .catch(e => res.send(e));

  });

  return router;
};

const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.post("/resource-builder", (req, res) => {
    let url = req.body.url;
    let title = req.body.title;
    let description = req.body.description;
    let categories = req.body.categories
    let userId = req.session.userId;

    // call function to insert category and return categoryid
    database.createNewCategory(categories)
      .then(category => {
        const categoryId = category.id;
        // return categoryId;
        database.createNewResource(url, title, description, categoryId, userId)
        // .then(resource => {
          res.redirect("/feeds");
        // })
      })
      .catch(e => res.send(e));

  });

  return router;
}

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// * GET /resource-builder
// * POST /resource-builder (redirect to /feeds)
// * GET /profile
// * POST /profile (to update/edit user profile)

module.exports = (db) => {
  router.get("/resource-builder", (req, res) => {
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

  router.get("/profile", (req, res) => {
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

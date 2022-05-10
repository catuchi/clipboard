/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// * GEt /feeds
// * GET /my-resources
// * POST /my-resources (for any button interaction)

module.exports = (database) => {
  router.get("/feeds", (req, res) => {
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

  // create (post, /my-resources)

  return router;
}

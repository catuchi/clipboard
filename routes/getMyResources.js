// const express = require('express');
// const router  = express.Router();

// module.exports = (database) => {
//   router.get("/my-resources", (req, res) => {
//     // return res.render("myResources")
//     // const userId = req.session.userId;
//     // if (!userId) {
//     //   res.redirect("/");
//     // }

//     // database.getUserById(userId)
//     //   .then(user => {
//     //     if (!user) {
//     //       res.redirect("/");
//     //     }
//     // call function to get resources by this user
//     // pass that value as templateVars

//     const templateVars = database.getAllLikedResources(limit = 10);
//     res.render("my-resources", templateVars);
//   });
//   //     .catch(e => res.send(e));
//   // };

//   return router;
// };

const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/my-resources", (req, res) => {

    db.query('SELECT * FROM resources')
      .then(resources => {
        const values = [resources.rows[0], resources.rows[2]];
        const templateVars = {resources: values};
        console.log(templateVars);
        res.render("myResources", templateVars);
      });

  });
  return router;

};

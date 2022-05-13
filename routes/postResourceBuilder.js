const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.post("/resource-builder", (req, res) => {
    console.log(req.body);
    let Title = req.body.Title;
    let URL = req.body.URL;
    let Description = req.body.Description;
    let categories = req.body.categories;
    const values = [URL, Title, Description, categories];
    const queryString = `INSERT INTO resources (url, title, description, category) VALUES ($1, $2, $3, $4)`;


    // call function to insert category and return categoryid
    database.query(queryString, values)
      .then(results => {
        console.log(results.rows);
        res.redirect("/feeds");
        // })
      })
      .catch(e => res.send(e));
  //   database.query('SELECT * FROM resources')
  //     .then(results => {
  //       // const templateVars = {resources: resources.rows};
  //       console.log(results.rows);
  //       res.redirect("/feeds");
  //     });
  });

  return router;
};

// console.log(req.body);
// const {Title, URL, categories, Description} = req.body;
// console.log(req.body);
// db.query(`INSERT INTO resources (url, title, description, category) VALUES (URL, Title, Description, categories)`);
// db.query('SELECT * FROM resources')
// .then(resources => {
//   const templateVars = {resources: resources.rows};
//   console.log(templateVars);
//   res.render("feeds", templateVars);
// });
// res.redirect(`/feeds`);

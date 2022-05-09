## getUserById
```js
const getUserById = function (id) {
  const queryString = `SELECT * FROM users WHERE users.id = $1;`;
  const values = [id];

  return pool
    .query(queryString, values)
    .then(result => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => console.log(err.message));
}
exports.getUserByUsername = getUserByUsername;
```

## getUserByUsername
```js
const getUserByUsername = function (username) {
  const queryString = `SELECT * FROM users WHERE users.username = $1;`;
  const values = [username];

  return pool
    .query(queryString, values)
    .then(result => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => console.log(err.message));
}
exports.getUserByUsername = getUserByUsername;
```

### getUserByEmail
```js
const getUserByEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE users.email = $1;`;
  const values = [email];

  return pool
    .query(queryString, values)
    .then(result => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => console.log(err.message));
}
exports.getUserByEmail = getUserByEmail;
```

### passwordcheck
```js
bcrypt.compareSync(password, user.password)
```

### updateUsername
```js
const updateUsername = function (newUsername, userID) {

  const values = [newUsername, userID];
  const queryString = `UPDATE users SET username = $1 WHERE users.id = $2;`;

  return pool
    .query(queryString, values)
    .then(result => {
      console.log(result.rows);
      return result.rows;
    })
    .catch(err => console.log(err.message));
}
exports.updateUsername = updateUsername;
```

```js
const login =  function(email, password) {
    return database.getUserByEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }
  exports.login = login;
```

```js
const registrationAuthentication = function(email, password, username) {
  return database.getUserByEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        if (username === user.username) {
          return user;
        }
      }
      return null;
    });
}
exports.registrationAuthentication = registrationAuthentication;
```

```js
const createNewResource = function(url, title, description, userID) {
  if (!URL) {
    let values = [title, description];
    let queryString = `INSERT INTO users (title, description) VALUES ($1, $2) RETURNING *;`;
  }
  if (URL) {
    let values = [url, title, description];
    let queryString = `INSERT INTO users (url, title, description) VALUES ($1, $2, $3) RETURNING *;`;
  }
  return pool
    .query(queryString, values)
    .then(result => {
      console.log(result.rows);
      return result.rows;
    })
    .catch(err => console.log(err.message));
}
exports.createNewResource = createNewResource;
```

```js
const createNewCategory = function(categories) {
  let values = [categories];
  let queryString = `INSERT INTO categories (name) VALUES ($1) RETURNING *;`;
  return pool
    .query(queryString, values)
    .then(result => {
      console.log(result.rows);
      return result.rows;
    })
    .catch(err => console.log(err.message));
}
```

```js
const createNewCategories = function (categories) {
  
}
```

```js
const addUser = function (username, email, password) {
  const values = [username, email, password];
  const queryString = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;`;

  return pool
    .query(queryString, values)
    .then(result => {
      console.log(result.rows);
      return result.rows;
    })
    .catch(err => console.log(err.message));
}
exports.addUser = addUser;
```

```js
const getAllResources = function (limit = 10) {
  const values = [limit];
  const queryString = `SELECT resources.*, categories.*
  FROM resources
  JOIN categories ON resources.category_id = categories.id
  GROUP BY resources.id, categories.id
  ORDER BY resources.created_at
  LIMIT $1;`;

  return pool
    .query(queryString, values)
    .then(result => {
      console.log(result);
      return result.rows;
    })
    .catch(err => console.log(err.message))
exports.getAllResources = getAllResources;
}
```

```js
const getResourcesByUserId = function (userId, limit = 10) {
  const values = [userId, limit];
  const queryString = `SELECT resources.*, categories.*
  FROM resources
  JOIN categories ON resources.category_id = categories.id
  WHERE resources.user_id = $1
  GROUP BY resources.id, categories.id
  ORDER BY resources.created_at
  LIMIT $2;`;

  return pool
    .query(queryString, values)
    .then(result => {
      console.log(result);
      return result.rows;
    })
    .catch(err => console.log(err.message))
exports.getAllResources = getAllResources;
}
```

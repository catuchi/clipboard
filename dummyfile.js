<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>InfoWall</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="/vendor/normalize-4.1.1.css" type="text/css" />
  <link rel="stylesheet" href="/vendor/border-box.css" type="text/css" />
  <!-- <link rel="stylesheet" href="/styles/main.css" type="text/css" /> -->
  <link rel="stylesheet" href="/styles/layout.css" type="text/css" />

  <script type="text/javascript" src="/vendor/jquery-3.0.0.js"></script>
  <script type="text/javascript" src="/scripts/app.js"></script>
</head>
<body>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="#" class="nav-link px-2 text-secondary">Home</a>
          </li>
          <li>
            <a href="#" class="nav-link px-2 text-white">Features</a>
          </li>
          <li>
            <a href="#" class="nav-link px-2 text-white">Pricing</a>
          </li>
          <li>
            <a href="#" class="nav-link px-2 text-white">FAQs</a>
          </li>
          <li>
            <a href="#" class="nav-link px-2 text-white">About</a>
          </li>
        </ul>
        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2">Login</button>
          <button type="button" class="btn btn-warning">Login</button>
        </div>
      </div>
    </div>
  </header>

  <section>
      <article class="post">
        <header class="post-header">
          <div id ="username">
            <h2 id='username'></h2>
          </div>
            <h2 id="title"></h2>
        </header>
        <p>
        Post Description
        </p>
      <footer>
        <p><small></small></p>
        <div id="user-interaction">
          <button class="button" class="btn btn-primary">Comment</button>
          <button class="button" class="btn btn-light">Like</button>
          <button class="button" class="btn btn-danger">Rate</button>
        </div>
      </footer>
      </article>



      </section>


</body>

</html>

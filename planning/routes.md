### Pages
* homepage (/) - this is where the user will land once they visit our app
* login page - this is where the user will land to login
* register page - this is where the user will land to register
* feed page - once the user logs in or registers they land here first. This is where all resources are shown based on how recent they were created
* profile page - where the user can update their profile
* "My resources" page - where a users' own resources and liked resources are. THis should be on one page
* "resource-builder" page - this is where user will create a resource/post

### Routes
* GET / (get homepage)
* (Post /login)
* GET /login
* Post /register
* GET /register
* POST /logout
* GEt /feeds
* GET /resource-builder
* POST /resource-builder (redirect to /feeds)
* GET /my-resources
* POST /my-resources (for any button interaction)
* GET /profile
* POST /profile (to update/edit user profile)

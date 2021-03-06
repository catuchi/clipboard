## User Stories
* describe how a user will interact with our app (why) 
* create user stories that will detail everything that a user can do on our app
* as a ___, I can ___, because ___
* example: as a logged in user, I want to be able to favorite a resource, because I want to be able to read it later AND the heart turns red
* turn the project requirements into user stories, it might not be one to one some might be overlapping
* at the end we should have about 6 - 10 user stories that define what a user can do
* as a user, I can see my resources and all my liked resources on one page called "My resources"
* as a non-logged in user, I cannot favorite a resource or like a resource

### Identify the Nouns
* nouns === entity
* figure out the relationships about our data, shape of the data, what data do we have access to
* Build out ERD, what are the relationships, is it one to one, or one to many?
* use diagram.net
* once we are done with the ERD snap a photo of it and upload to github

planning/erd.png

### Set up routes
* BREAD operations on each resource
* RESTful routes

what do I want to do to every resource?
Browse - GET
* Browse is saying give me all the resource. if I wanted to create a new user, I use a GET /users
Read - GET
* Read is saying give me a particular resource. if I wanted to get a particular user, I will use GET /users/:id
Edit - POST
* edit is saying the resource already exists, so we have to identify the particulare one we want to edit. POST /users/:id
Add - POST
* here the resource does not yet exist. so we just post to the end point. POST /users
Delete - POST
* identify the particular resource that you want to remove POST /users/:id/delete

These usually stays the same, all we have to do is change the nouns e.g instead of users we can put liked_resource

If we are doing a single page app the EDIT will be PUT/PATCH, and the delete resource would be DELETE instead of POST
here, PUT will completely replace the record, everything except the primary key
PATCH will update a piece of the record.

now we would have something like this:
B GET /users
R GET /users/:id
E PUT/PATCH /users/:id
A POST /users
D DELETE /users/:id

if we are going to filter out just what we need to complete our demo, we might not need to program the Add and Delete end points

planning/api-routes.md

### MVP
* minimum viable product
* minimum viable demo (MVD)
* focus on your MVD. what is the minimum feature set that we can put together that will take up 5 mins next Friday to show off
* if you are not going to demo it, dont build it

### User Login/Registration
* focus on other features first
* have a users table in the database with already generated users

```js
app.get('/login/:id', (req, res) => {
	// set the cookie
	req.session.user_id = req.params.id;
	
	// send the user somewhere
	res.redirect('/');
})
```

### Wireframes/Mockups
* how are we going to show these information to the user
* we could use diagrams.net, we can use figma (if has a steep learning curve but it is very interactive and shows visible the user journey), moqups, balsamiq, pen and paper
* pick tool that is time economical too
* create these pdfs them and add them to your planning file

### Tech Choices
* Front End: HTML, CSS, JS, if single page(JQuery, booststrap)
* Back End: Postgres, Node, Express
* go through the skeleton with your team

### SPA vs Multi-page
* these are not mutually exclusive
* you can do a mix of both or exclusive one of each

### Git
* do not code on main/master
* if you have any issues, contact a mentor
* merging in the cloud - pull requests
* merge conflicts occurs when two or more developers touch the same part of the code

### Splitting up the work
* vertical - every dev is working on a diff piece of the stack
* horizontal - all devs working on the same layer
* pair programming

### Communication
* Plan


### Mission statement
* Pinterest for learners
* like pinterest but instead of pictures and videos, it is learning
* find the target users, we have to define resources
* What resources do we want to share?

### Resources??
* Articles
* tutorials
* blogs
* videos
* Link

### How to post resources
* post links like the tweeter app

```
#This is a resource for html
```
### decision 1
* do we want to force the user to put a hashtag or do we want to do a an open posting

### decision 2
* what do we want the user to see once they login/register
	* could it be to their profile page to update their profile (possible to add a picture? or a bio?)
	* could it be to the general news feed (which would have the resources sorted out based on most recent post)

### decision 3
* how can we show that a user save a particular resource. (is it going to be a post request? are we going to reflect that in the resource table?)

### Search feature
* find a way search all the post

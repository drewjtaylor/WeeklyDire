"WeeklyDire" is a fictional news site themed around finding the silver lining in tragedy.

The ultimate purpose is to show what I am capable of as a developer, but hopefully a secondary effect will be your inspiration at some of these stories.

This app is comprised of a front end built with React, a back end using node/express, and a database using MongoDB.

## Front end (React)

Routing: react-router-dom
Styling and responsive layout: Bootstrap/Rectstrap
Forms: Formik

### Home page
The home page displays all articles from an asynchronous request to the server.

Clicking one of the cards displaying articles leads to a full page

Each article has an array of "tags" indicating the subject matter of the article. By clicking one of the tags and using "useParam", the user is taken to a list of all articles that have that specific tag.

Clicking to "Log In" or "Register" at the top right opens an appropriate modal with a form.

### Variable Header

The Header component changes depending on whether or not a user is logged in, and whether or not they are designated as a "creator" or "admin."

When no user is logged in, there will be buttons for "Register" or "Login"
When any user is logged in, they will see a welcome message and a "Logout" button
If the user is a creator, they will see a "Write" button that takes them to a form to write an article.
If the user is an admin, they will see an "Admin" button that takes them to the admin page where various tasks can be performed.

### "Write" form (Formik, form validation)

When a user is logged in who is designated as a "creator", a link to write an article appears at the top right. This leads to the "write" form. (If a user attempts to manually go to the '/write' address, the Express server authenticates the user first so it can't be circumvented.)

I considered two ways to implement "tags" for articles:
Option 1: Create a regular expression to separate a single submission into separate tags
Pros: Theoretically simpler for the user to just separate tags with a semicolon or comma
Cons: Relies on the user to separate tags correctly or more complicated regular expression. Then if the user wants specific punctuation for some reason it would be difficult/impossible.

Option 2: Create a way to enforce the user entering one tag at a time
Pros: It is clear before submitting exactly what the tags will be, since they get separated into boxes
      The user can inclue any punctuation they want
Cons: Programmatically more complicated to figure out
      Could be considered less convenient for the user than entering tags separated by puncutation



## Back end (Node/Express)

### Routes

For the purpose of clarity, invalid methods sent to valid routes have all been given an appropriate error message. (i.e., "PUT operation not supported on /users")

In the following documentation, only valid routes are listed.

#### /users

GET /users
(This route is not utilized anywhere on the front end yet.)
First checks if the user exists, then checks if that user is an admin.

If the user is an admin, returns a list of all users in the database.

POST /users
This route accepts a user object as a JSON payload. Because "passportLocalMongoose" is included in the User Schema, the password that is submitted will automatically he hashed and salted before being saved in the database.

This route requires an email, username, and password.
If user object submitted also has a firstName and/or lastName attribute, those will be saved as well. 



#### /articles



#### /comments

### Authentication

Authentication is the very definition of a necessary evil. It's purpose is necessary. It's implementation is evil.

The express server uses a local strategy with Passport to provide a jwt to the user. The jwt is stored as a cookie with a 24 hour life, and the server is set up for a jwt to only be valid 24 hours anyway, even if someone were to save it from the cookie.

When accessing an endpoint that needs authentication or needs to verify if the user is a creator or admin, the React application provides the jwt as a Bearer token.

Passport-local-mongoose is used mainly to simplify hashing and saving passwords. 





## Database (MongoDB)

Will connect to database and node/Express server later


## Developement steps

Once I decided on making a fake news site (and not a "fake news" site), I started by researching existing news sites to get ideas.

### Conceptualize

Before starting on actually coding anything, I made a draw.io diagram/draft of how the database would be laid out. I also made a basic wireframe of how I wanted my pages and forms to look.

### Strategy for development

Then my "big-picture" plan was to get the front-end pages 80-90% done, then get the back-end and database 80-90% done. Then the last 10-20% in each section and bugs. Lastly, I would deploy it using AWS to stay online. Once the minimum viable product is working, this last phase would also involve setting up some kind of CD/CI system. (at the time of writing, this has not been done yet, so I don't know what I'm going to do. Probably some kind of update everytime the main branch of the github repo is updated.)



During all steps, I keep a "to-do" file. Basically this served the purpose of a Kanban board for a group. I have found this greatly helps me stay on track with current tasks. Instead of getting distrcted with wanting to fix bugs or add features, instead I add a note to "to-dos", and continue working on my main goal for that session/day. Then occasionally I go back through my to-do list and go back through the issues I would have forgotten without it.

Big picture the minimum viable product would be a website that allows users to read articles stored in a database. Users with a "creator" status can access a page to write new articles.

## Specific challenges/solutions (rename this)

Changing from original models (combining creators/subscribers into users with a "creator" boolean attribute)
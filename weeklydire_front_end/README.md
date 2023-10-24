"WeeklyDire" is a fictional news site themed around finding the silver lining in tragedy.

The ultimate purpose is to show what I am capable of as a developer, but hopefully a secondary effect will be your inspiration at some of these stories.

This app is comprised of a front end built with React, a back end using node/express, and a database using MongoDB.

## Front end (React)

Routing: react-router-dom
Styling and responsive layout: Bootstrap/Rectstrap
Forms: Formik
Iconography: fontawesome

### Home page
The home page displays all articles from an asynchronous request to the server.

Clicking one of the cards displaying articles leads to a full page

Each article has an array of "tags" indicating the subject matter of the article. By clicking one of the tags and using "useParam", the user is taken to a list of all articles that have that specific tag.

Clicking to "Log In" or "Register" at the top right opens an appropriate modal with a form.


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

Routes

Authentication




## Database (MongoDB)

Will connect to database and node/Express server later


## Developement steps

Once I decided on making a fake news site (and not a "fake news" site), I started by researching existing news sites to get ideas.

Before starting on actually coding anything, I made a draw.io diagram/draft of how the database would be laid out. I also made a basic wireframe of how I wanted my pages and forms to look.

Then my "big-picture" plan was to get the front-end pages 80-90% done, then get the back-end and database 80-90% done. Then the last 10-20% in each section and bugs. Lastly, I would deploy it using AWS to stay online. Once the minimum viable product is working, this last phase would also involve setting up some kind of CD/CI system. (at the time of writing, this has not been done yet, so I don't know what I'm going to do. Probably some kind of update everytime the main branch of the github repo is updated.)



During all steps, I keep a "to-do" file. I have found this greatly helps me stay on track with current tasks. Instead of getting distrcted with wanting to fix bugs or add features, instead I add a note to "to-dos", and continue working on my main goal for that session/day. Then occasionally I go back through my to-do list and go back through the issues I would have forgotten without it.

Big picture the minimum viable product 

## Specific challenges/solutions (rename this)

Changing from original models (combining creators/subscribers into users with a "creator" boolean attribute)
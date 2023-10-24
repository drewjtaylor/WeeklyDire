"WeeklyDire" is a fictional news site themed around finding the silver lining in tragedy.

The ultimate purpose is to show what I am capable of as a developer, but hopefully a secondary effect will be your inspiration at some of these stories.

This app is comprised of a front end built with React, a back end using node/express, and a database using MongoDB.

## Front end (React)

Routing: react-router-dom
Styling and layout: Bootstrap/Rectstrap
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




## Database (MongoDB)

Will connect to database and node/Express server later
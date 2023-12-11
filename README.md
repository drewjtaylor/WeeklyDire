# WeeklyDire

"WeeklyDire" is a fictional news site themed around finding the silver lining in tragedy and generally reporting good news.

The ultimate purpose is to show what I am capable of as a developer, but hopefully a secondary effect will be your inspiration or encouragement at some of these stories.

This app is comprised of the following:
1. The [front end](#front-end-react) is built with React
2. The [back end](#back-end-nodeexpress) server is built with node/express
3. [Mongoose is used](#database-mongodbmongoose) to deal with a the database set up with MongoDB in their cloud, Atlas.

Notable features:
1. [User authentication](#authentication)
2. An Admin page
3. A "Write" page for users designated as creators to add articles.
4. A "Comments" section on each article page where any user with an account can add comments
5. A "Search by Tag" feature where a user can search by keyword to bring up a list of articles with that tag


## Front end (React)

### Libraries and tools

1. Routing: react-router-dom
2. Styling and responsive layout: Bootstrap/Rectstrap
3. Forms: Formik
4. Deployment: Netlify. Any pushes to the main branch on github will trigger a redploy of the front end.

### Home page
The home page displays all articles from an asynchronous request to the server, loading 4 articles at a time.

Clicking one of the cards displaying articles leads to a full page.

Each article has an array of "tags" indicating the subject matter of the article. By clicking one of the tags and using "useParam", the user is taken to a list of all articles that have that specific tag.

### Variable Header

The Header component changes depending on whether or not a user is logged in and whether or not they have "creator" or "admin" privelages.

* When no user is logged in, there will be buttons for "Register" and "Login."
* When any user is logged in, they will see a welcome message and a "Logout" button.
* If the user is a creator, they will also see a "Write" button that takes them to a form to write an article.
* If the user is an admin, they will also see an "Admin" button that takes them to the admin page.

### "Write" form (Formik, form validation)

When a user is logged in who is designated as a "creator", a link to write an article appears at the top right. This leads to the "write" form. (If a user attempts to manually go to the '/write' route, the Express server authenticates the user first so it can't be circumvented.)

The form to enter new articles uses a combination of Formik for handling the form, and Reactstrap/Bootstrap to style it.

The Title and Body are required and will show an error message if blank.

The thumbnail field currently uses a link to any image url, or if left blank it will default to the logo file.

Finally, the author can attribute keywords, also known as tags, to their article. This allows users to later search for articles by tag, showing all articles about "Thanksgiving," "Charity," or whatever.

I considered two ways to implement "tags" for articles:
1. Option 1: Create a regular expression to separate a single submission into separate tags.
Pros: Theoretically simpler for the user to just separate tags with a semicolon or comma
Cons: Relies on the author to separate tags correctly or the developer to contrive a more complicated regular expression. Then if the user wants specific punctuation for some reason it may turn out to be difficult.

2. Option 2: Create a way to enforce the user entering one tag at a time.
- Pros: 
    - It is clear before submitting exactly what the tags will be since they get separated into boxes.
    - The user can inclue any punctuation they want (i.e., "S.O.S." or "feel-good").
- Cons: 
    - Programmatically more complicated to figure out.
    - Could be considered less convenient for the user than entering tags separated by specific puncutation.

I ended up going with option 2, mostly out of personal preference. I liked being able to see the tags as they get entered and felt like that was more clear to the author on submission.

### Admin Page

If a user is designated as an admin, a button shows up for them linking to the "/admin" route. As long as the user is authenticated and authorized as an admin, the page will display options to perform some basic admin tasks. 

Clicking a user brings up an "edit user" page, where the admin can change the email associated with the account or reset their password.

Radio buttons control whether or not the user is a creator and/or admin.

In addition to users, the admin page currently allows the admin to delete articles.

### Comments

If a user is signed in, they will see a botton at the end of full articles to add a comment.

Comments automatically detect the author using the jwt stored as a cookie and validating it against the database. Then the comments are shown in reverse order (4 at a time), including information about the author and when it was posted.

## Back end (Node/Express)

- Deployed using Google Cloud Functions
- Provides and Authenticates by 24-hour jwt
- Uses Mongoose to enforce defined data structure

### Routes

All routes are set up to hit one of three main endpoints or one of their subroutes:
1. /users
2. /articles
3. /comments

Details on how these routes work is documented [here](weeklydire_back_end/express_scaffold_with_user_auth/routes/README.md).

### Authentication

The express server uses a combination of passport-local, passport-jwt, and mongoose-passport-local to handle user registration and authentication.

When a user clicks the "register" button in the header, they can provide a username, email, and password. (The user may enter an optional first and last name as well.)

This creates a new document in the "Users" collection that looks something like this:
```json
        {
            "_id": "65650a17b0efaf38a14c8f4f",
            "firstName": "George",
            "lastName": "Washington",
            "creator": false,
            "admin": false,
            "email": "test@mailinator.com",
            "username": "silver",
            "salt": "ce6wef...",
            "hash": "32z5ab...",
            "createdAt": "2023-11-17T17:45:53.101+00:00",
            "updatedAt": "2023-11-17T17:45:53.101+00:00",
            "__v": 0
        }
```

If a user logs in successfully with a correct username and password, a 24-hour jwt is provided in the response and stored as a 24-hour cookie with the client.

When accessing an endpoint that needs authentication or needs to verify if the user is a creator or admin, the React application provides the jwt in the request as `Authorization: Bearer [jwt token]`. The authenticate.verifyUser middleware checks the jwt token and adds the user to the request as `req.user` if it validates, or rejects the request.

Once a user is validated, it becomes much easier to perform operations such as checking if the user is a creator or admin, retrieving their _id or name, etc.

## Database (MongoDB/Mongoose)

The site uses a MongoDB database deployed using the free version of Atlas, MongoDB's cloud service.

I won't go into an exhaustive explanation of MongoDB here except to say I used MongoDB because I find it convenient to use the JSON-friendly format throughout my application.

Mongoose is a library used to create and enforce Schemas in an easy way. It is also used with passport-local-mongoose for password creation and validation, abstracting away the process of salting and hashing passwords and dealing with password updates and resets.

## Developement steps

Once I decided on making a fake news site (and not a "fake news" site), I started by researching existing news sites to get ideas.

### Conceptualize

Before starting on actually coding anything, I made a draw.io diagram/draft of how the database would be laid out. I also made a basic wireframe of how I wanted my pages and forms to look on pencil and paper.

The minimum viable product I envisioned would be a MERN-based website that allows users to read articles, provides some admin operations to admin users, and allows creators to write new articles.

### Strategy for development

Then my "big-picture" plan was to get the front-end pages 80-90% done, then get the back-end and database 80-90% done. Then the last 10-20% in each section, and bugs. Lastly, I would deploy it to cloud services so it can live "on its own two feet." In reality, once I got a basic version running locally, I went ahead and got it living "in the cloud". 

Once I had something living out in the wild, I formalized how I went about working on the codebase. Instead of just updating "main" all the time, I create a new branch titled something like "admin-page". Then when I'm done with that feature, I would merge it back into main, (also causing an automatic redeploy to any of the front end).

During all steps, I keep a "to-do" file. This was essentially a personal Kanban board, and I found this helps me stay on track with current tasks. Instead of getting distrcted with fixing bugs or add features I add a note to "to-dos", and continue working on my main goal for that session. Then occasionally I go back through my to-do list and address the issues I would have forgotten without it.

## Challenges, solutions, and work-arounds (under construction)

-   <strong>Users, Creators, and Admins, oh my!</strong>
Originally I anticipated "Users" being a separate group from "Creators" & "Admin". However, the more I thought about this, the more it sounded unnecessary for them to be seperate. Instead, I ended up using one MongoDB collection: `Users`, with boolean properties of `creator` and `admin`.

-   <strong>Google Cloud Deployment.</strong> There was a lot of trial & error getting the Express server deployed on Google Cloud. In particular, I had trouble with how Google set up the port for their end. It would deploy successfully, but the logs would indicate an error saying "Port 8080 already in use." Something about the Google Cloud process was filling in the environment variable for PORT as 8080 and it was interacting with something in my code in a strange way. I suspect that the port used here really doesn't matter that much since Google sets up so many things in on their side, and the link they provide just works regardless of the port selected. I eventually eliminated the call to the environment variable and it overcame the issue. I changed code from this:

    ```
    var port = normalizePort( process.env.PORT || '3001' );
    ```

    to this:

    ```
    var port = normalizePort( '3001' );
    ```

-   

<!-- -   <strong>Down footer, Down!</strong> Getting the footer to stay at the bottom on short pages (like Unauthorized.js)

![Peter fighting window blinds](https://i.giphy.com/media/yYSSBtDgbbRzq/giphy.webp) -->
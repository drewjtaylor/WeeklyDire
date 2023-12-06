# Routes

For the purpose of clarity, invalid methods sent to valid routes have all been given an appropriate error message. (i.e., "PUT operation not supported on /users")

In the following documentation, only valid routes are listed.

Any time a route needs to verify the user sending the request, the request header must include a jwt:

```json
{
  "Authorization": "Bearer [jwt]"
}
```

There are three main "branches" of routes:

1. [Users](#users)
2. [Articles](#articles)
3. [Comments](#comments)

## USERS

### /users

- GET:
  - Verifies user exists
  - Verifies if user is an admin
  - Sends back all users in JSON format
  - Used on the Admin page to retrieve all users
- POST:
  - Requires the body of the request to contain an email, username, and password. The password is saved as salt/hash
  - The body may optionally include firstName and lastName
  - This is the endpoint to use when registering a new user

### /users/login

- POST:
  - Requires the body to contain a username and password. If they match up to a real user, provides a JSON response including "token: [their token here]"
  - Used to log in the front end, then the client saves the token as a cookie titled, "jwt".

### /users/current

- GET:
  - Requires a valid jwt bearer token [(see above)](#routes)
  - Sends back the associated user's information
  - See Header.js in the front end for an example. This file hits this route to determine which buttons to display depending on the current user.

### /users/[userId]/publiclookup

- GET:
  - For the user with the given [_id], displays the users username, first name, and last name
  - Does NOT show email or if the user is an admin or creator
  - Example: Getting the username for the author of comments

### /users/finduser/[username]

- GET:
  - For the username, retrieves all user information.
  - Requires a valid jwt bearer token for an admin account [(see above)](#routes)

### /users/[userId]

- GET:
  - For the user [_id] from MongoDB, retrieves all user information
  - Requires a valid jwt bearer token for an admin account [(see above)](#routes)
- PUT:

  - Updates the user with the given [_id]
  - The body of the request must be JSON including any of the following properties and updated values and data types:

  ```json
  {
    "email": "email string",
    "username": "username string",
    "firstName": "firstName string",
    "lastName": "lastName string",
    "admin": "true or false",
    "creator": "true or false"
  }
  ```

- DELETE:
  - Deletes the user with the given [_id] from the database
  - Requires a valid jwt bearer token for an admin account [(see above)](#routes)

### /users/[userId]/passwordupdate

- PUT

  - Requires a valid jwt bearer token for either an admin account or an account matching the [_id] provided in the route [(see above)](#routes)
  - The body of the request must contain the following JSON:

  ```json
  {
    "oldpassword": "User's old password",
    "newpassword": "User's new password"
  }
  ```

### /users/[userId]/passwordreset

- PUT

  - Requires a valid jwt bearer token for either an admin account or an account matching the [_id] provided in the route [(see above)](#routes)
  - Unlike the "passwordupdate" route above, "passwordreset" does not require the old password.
  - Used by admins who should not know the user's password anyway, or by users who have forgotten their password
  - The body of the request must contain the following JSON:

  ```json
  {
    "newpassword": "User's new password"
  }
  ```

## ARTICLES

### /articles

- GET:

  - Provides all articles

- POST:

  - Creates a new article
  - The user must be designated as a creator
  -
  - The body of the request must contain the following JSON:

  ```json
  {
    "body": "A string (required)",
    "title": "A string (required)",
    "thumbnail": "A string (optional URL of an image)",
    "tags": "An optional array. Each item in the array must be a string."
  }
  ```

### /articles/[articleId]

- GET:
  - Returns the article with the given [_id] in JSON format
- DELETE:
  - Requires a valid jwt bearer token for an admin account [(see above)](#routes)
  - Deletes the article with the given [_id]

## COMMENTS

### /comments/[articleId]

- GET:
  - Returns an array of comments for the article with the provided [articleId]
- POST:
  - Requires a valid jwt bearer token [(see above)](#routes)
  - Requires a body with the following JSON:
  ```json
  {
    "body": "Some comment"
  }
  ```
  - Creates a "Comment" document, AND adds to an array of commentIds stored on the Article document.
- PUT:
  - Currently unavailable. May be developed at a later time, allowing users to edit their comments.
- DELETE:
  - Currently unavailable. WHEN developed...
  - Requires a valid jwt bearer token for either the author or an admin [(see above)](#routes)

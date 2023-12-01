import { dbUrl } from './utils/dbUrl';

// Returns all comments (not sure if there's a use-case for this)
export const selectAllComments = async () => {
    const response = await fetch(dbUrl + '/comments');
    if (!response.ok) {
        return Promise.reject('Unable to fetch comments, status: ' + response.status);
    };
    const data = await response.json();
    return data
};

//Returns all comments associated to given articleId
export const selectCommentsByArticle = async (articleId) => {
    const response = await fetch(dbUrl + `/comments/${articleId}`);
    if (!response.ok) {
        return Promise.reject('Unable to fetch comments, status: ' + response.status)
    };
    const data = await response.json();
    return data
};

//Returns a single article matching the given articleId
export const selectArticleById = async (articleId) => {
    const response = await fetch(dbUrl + `/articles/${articleId}`);
    if (!response.ok) {
        return Promise.reject('Unable to fetch, status: ' + response.status)
    };
    const data = await response.json();
    return data
}

// Delete an article with the given articleId
export const deleteArticleById = async (articleId, jwt) => {
    const response = await fetch(
        dbUrl + `/articles/${articleId}`,
        {
            method: "DELETE",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: null, // body data type must match "Content-Type" header
          }
    );

    if (!response.ok) {
        return Promise.reject('Unable to delete article, status: ' + response.status)
    };
    const data = await response.json();
    return data
}

//Returns all articles
export const selectAllDbArticles = async () => {
    const response = await fetch(dbUrl + '/articles');
    if (!response.ok) {
        return Promise.reject('Unable to fetch, status: ' + response.status)
    };
    const data = await response.json();
    return data
}

// Returns all users
export const selectAllUsers = async (jwt) => {
    const response = await fetch(dbUrl + '/users', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    });
    if (!response.ok) {
        return Promise.reject('Unable to fetch, status: ' + response.status)
    };
    const data = await response.json();
    return data
}

// Updates a user
// Paramaters require the _id of the user, data in the form of an object, and the jwt from
export const updateUser = async (userId, userObject, jwt) => {
    const putData = async () => {
        // Default options are marked with *
        const response = await fetch(dbUrl + `/users/${userId}`, {
          method: "PUT",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(userObject), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      };
    putData();
}

// Looks up full info about a user by _id
export const selectUser = async (userId, jwt) => {
    // Default options are marked with *
    const response = await fetch(dbUrl + `/users/${userId}`, {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: null, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// Looks up public info about a user by _id
export const selectUserPublic = async (userId) => {
    // Default options are marked with *
    const response = await fetch(dbUrl + `/users/${userId}/publiclookup`, {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: null, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

//  Updates a user's password using the oldpassword and new password
export const updatePassword = async (userId, oldpassword, newpassword, jwt) => {
    const passwordData = {
        oldpassword,
        newpassword
    };
    const response = await fetch(dbUrl + `/users/${userId}/passwordupdate`, {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(passwordData)
      });
      if (!response.ok) {
        return Promise.reject('Unable to update password: ' + response.status)
      };
      return response.json(); // parses JSON response into native JavaScript objects
}

// Updates a user's password when the old password isn't known.
export const resetPassword = async (userId, newpassword, jwt) => {
    const response = await fetch(dbUrl + `/users/${userId}/passwordreset`, {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({password: newpassword})
      });
      if (!response.ok) {
        return Promise.reject('Unable to reset password: ' + response.status)
      };
      return response.json(); // parses JSON response into native JavaScript objects
}

// Returns articles with matching tag
export const selectArticlesByTag = async (tag) => {
    const response = await fetch(dbUrl + '/articles');
    if (!response.ok) {
        return Promise.reject('Unable to fetch, status: ' + response.status)
    };
    const data = await response.json();
    const articles = data.filter((article) => article.tags.includes(tag));
    return articles
}
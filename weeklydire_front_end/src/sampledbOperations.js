// import { comments, creators, subscribers, articles } from "./sampledb";
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

//Returns a single article matching the given articleId
export const selectArticleById = async (articleId) => {
    const response = await fetch(dbUrl + `/articles/${articleId}`);
    if (!response.ok) {
        return Promise.reject('Unable to fetch, status: ' + response.status)
    };
    const data = await response.json();
    return data
}

//Returns all comments associated to given articleId
export const selectCommentByArticle = async (articleId) => {
    const response = await fetch(dbUrl + '/comments');
    if (!response.ok) {
        return Promise.reject('Unable to fetch comments, status: ' + response.status)
    };
    const data = await response.json();
    const comments = data.filter((comment) => parseInt(articleId)===comment.articleId)
    return comments
};

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
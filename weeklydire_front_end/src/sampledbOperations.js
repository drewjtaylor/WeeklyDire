import { comments, creators, subscribers, articles } from "./sampledb";
import { dbUrl } from './utils/dbUrl';

export const selectAllComments = () => {
    return comments
};




export const selectArticleById = async (articleId) => {
    const response = await fetch(dbUrl + 'articles');
    if (!response.ok) {
        return Promise.reject('Unable to fetch, status: ' + response.status)
    };
    const data = await response.json();
    return data[parseInt(articleId)]
}


export const selectCommentByArticle = (articleId) => {
    return comments.find((comment) => parseInt(articleId)===comment.articleId)
};

export const selectAllDbArticles = async () => {
    const response = await fetch(dbUrl + 'articles');
    if (!response.ok) {
        return Promise.reject('Unable to fetch, status: ' + response.status)
    };
    const data = await response.json();
    return data
}

export const selectAllArticles = () => {
    return articles
};

// export const selectArticleById = (id) => {
//     return articles.find((article) => article.id===parseInt(id))
// }

export const selectArticlesByTag = (tag) => {
    return articles.filter((article) => article.tags.includes(tag))
}
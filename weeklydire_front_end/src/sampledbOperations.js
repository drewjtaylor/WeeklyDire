import { comments, creators, subscribers, articles } from "./sampledb";

export const selectAllComments = () => {
    return comments
};

export const selectCommentByArticle = (articleId) => {
    return comments.find((comment) => parseInt(articleId)===comment.articleId)
};

export const selectAllArticles = () => {
    return articles
};

export const selectArticleById = (id) => {
    return articles.find((article) => article.id===parseInt(id))
}
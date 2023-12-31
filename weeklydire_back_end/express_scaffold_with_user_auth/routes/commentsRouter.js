const express = require('express');
const commentRouter = express.Router();
const authenticate = require('../authenticate');
const Comment = require ('../models/Comment');
const Article = require ('../models/Article');


commentRouter.route('/')
.all((req, res) => {
    res.statusCode = 403;
    res.end('This operation is not supported for /comments. Please use comments/[articleid]')
})

commentRouter.route('/:articleId')
// For getting all comments on a specific article with articleId
.get((req, res, next) => {
    Comment.find({article: req.params.articleId})
    .populate('authorId')
    .then(comments => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments)
    })
    .catch(err => next(err))
})


// For posting a new comment to article with articleId
// Must be a user. User posting is the 'author' for new comment
.post(
    authenticate.verifyUser, 
    (req, res, next) => {
        Comment.create({
            body: req.body.commentBody,
            authorId: req.user._id,
            article: req.params.articleId
        })
        .then(comment => {
            Article.findByIdAndUpdate(
                req.params.articleId, 
                { $push: {
                    comments: comment._id
                }}
            )
            .then(article => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment)
            })
        })
        .catch(err => next(err))
})
.put(
    (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments/[articleId]. If you want to edit a specific comment, Please use comments/[articleId]/[commentId]')
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /comments/[articleId]. Please use comments/[articleId]/[commentId]')
})


commentRouter.route('/:articleId/:commentId')
.get((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /comments/[articleId]. Please use comments/[articleId]/[commentId]')
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /comments/[articleId]. Please use comments/[articleId]/[commentId]')
})
// For editing an existing comment
// Must be a user. User must match author
// .put()
// .delete()

module.exports = commentRouter;
const express = require('express');
const articleRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('../authenticate');
const Article = require('../models/Article');

// Retrieve all articles
articleRouter.route('/')
.get((req, res, next) => {
    Article.find()
    .then(articles => {
        if (!articles) {
            res.statusCode = 200;
            res.end('There were no articles in the database')
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(articles)
    })
    .catch(err => next(err))
})
// Create a new article. Requires user to be a creator
.post(
    authenticate.verifyUser, 
    authenticate.verifyCreator,
    (req, res, next) => {
        const creatorId = req.user._id;
        const {body, title, thumbnail, tags} = req.body;
        console.log(req.body);
        if (body && title) {
            Article.create({body, title, thumbnail, tags, creator: creatorId})
            .then(article => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(article)
            })
            .catch(err => next(err))
        } else {
            const err = new Error('The body of the request must at least contain a "body" and "title".')
            err.statusCode = 400;
            return next(err)
        }
    })
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on articles. If you would like to edit an article, use "/articles/[articleId]" with a PUT request.')
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /articles.');
})


articleRouter.route('/:articleId')
.get((req, res, next) => {
    Article.findById(req.params.articleId)
    .populate('creator')
    .then(article => {
        if (!article) {
            res.statusCode = 200;
            res.end('No article found with this _id')
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(article)
    })
    .catch(err => next(err))
    })
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /articles/${articleId}.`);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /articles/${articleId}.`);
})
// Deletes article at "articleId". Requires user to be an admin or the author
.delete(
    authenticate.verifyUser,
    (req, res, next) => {
        Article.findById(req.params.articleId)
        .then(article => {
            if (req.user.admin || article.creator.equals(req.user._id)) {
                Article.findByIdAndDelete(req.params.articleId)
                .then(article => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/json');
                    res.json(article)
                })
                .catch(err => next(err))
            } else {
                const err = new Error('You must be an admin or the creator of this article to delete it.');
                return next(err)
            }
        })
        .catch(err => {
            res.statusCode = 403;
            res.end(`There was an error performing DELETE at /articles/${req.params.articleId}`)
        })
    }
)

module.exports = articleRouter;
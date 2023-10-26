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
            return
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(articles)
    })
    .catch(err => next(err))
})
// Create a new article. Requires user to be a creator
.post(authenticate.verifyUser, authenticate.verifyCreator, (req, res, next) => {
    const {body, title, thumbnail, tags} = req.body;
    if (body && title && thumbnail && tags) {
        Article.create({body, title, thumbnail, tags, creator: req.user._id})
        then(article => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(article)
        })
        .catch(err => next(err))
    } else {
        const err = new Error('This error came from "articlesRouter" in the back end')
        err.statusCode = 400;
        return next(err)
    }
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on articles. If you would like to edit an article, use "/articles/[articleId]" with a PUT request.')
})
// Deletes article at "articleId". Requires user to be an admin.



articleRouter.route('/:articleId')
.get()
.post()
.put()
.delete(
    // authenticate.verifyAdmin,
    (req, res) => {
        Article.findById(req.params.articleId)
        .then(article => {
            if (article.creator.equals(req.user._id) || req.user.admin) {
                Article.findByIdAndDelete(req.params.articleId)
            .then(article => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/json')
                res.json(article)
            })
            .catch(err => next(err))
        } else {
            const err = new Error('You must be an admin or the creator of this article to delete it.');
            return next(err)
        }
    })
    res.statusCode = 403;
    res.end(``)
})

module.exports = articleRouter;
const express = require('express');
const articleRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('../authenticate');
const Article = require('../models/Article');

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
.post(authenticate.verifyUser, authenticate.verifyCreator, (req, res, next) => {
    //Write logic to post article here
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not (yet) supported on /articles.')
})

.delete('/:articleId', (req, res) => {
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
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
.put()
.delete()
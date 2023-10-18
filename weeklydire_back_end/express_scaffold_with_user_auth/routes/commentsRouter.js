const express = require('express');
const commentRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('../authenticate');
const Comment = require ('../models/Comment');
const Article = require ('../models/Article');
const User = require ('../models/User');



commentRouter.route('/')
.get()
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /comments. Please use /comments/[articleid]')
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /comments. If you want to edit a specific comment, Please use /comments/[articleid]')
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /comments')
})


commentRouter.route('/:articleId')
// For getting all comments on a specific article
// Should work for anyone
.get((req, res, next) => {
    
})

// For posting a new comment to an article
//  Must be a user. User posting is the 'author' for new comment
.post(authenticate.verifyUser, (req, res, next) => {
    
})

// For editing an existing comment
// Must be a user. User must match author
.put(authenticate.verifyUser, (req, res, next) => {
    
})
// Must be a user. User must match author or be admin
.delete((req, res, next) => {
    
})
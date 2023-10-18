const express = require('express');
const commentRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('../authenticate');
const Comment = require ('../models/Comment');

commentRouter.route('/')
.get()
.post()
.put()
.delete()
const express = require('express');
const articleRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('../authenticate');
const Article = require('../models/Article');

articleRouter.route('/')
.get()
.post()
.put()
.delete()
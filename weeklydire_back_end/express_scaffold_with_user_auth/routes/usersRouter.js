const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('../authenticate');
const User = require('../models/User');
const cookieParser = require('cookie-parser');

// Returns the current logged in user object
userRouter.route('/current')
.get(authenticate.verifyUser, (req, res, next) => {
    res.end(JSON.stringify(req.user))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /users/current');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users/current');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /users/current');
})

userRouter.route('/')
.get(
    authenticate.verifyUser, 
    authenticate.verifyAdmin, 
    (req, res, next) => {
    User.find()
    .then(users => {
        if (!users) {
            return
        };
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(users)
    })
    .catch(err => next(err))
})
.post((req, res, next) => {
    User.register(
        new User({email: req.body.email, username: req.body.username}),
        req.body.password,
        (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
                console.log('There was an error registering a new user');
                return next(err)
            } else {
                if (req.body.firstName) {
                    user.firstName = req.body.firstName
                };
                if (req.body.lastName) {
                    user.lastName = req.body.lastName
                };
                user.save(err => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({err: err});
                        return next(err)
                    };
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: true, status: 'Registration successful'});
                    })
                })
            }
        }
    )
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users')
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /users');
});

// Route to log in
userRouter.route('/login')
.get((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users')
})
.post(passport.authenticate('local'), (req, res, next) => {
    cookieParser.JSONCookie()
    const token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'})
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users/login')
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /users/login')
})

// Route searches for user by username
userRouter.route('/finduser/:username')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    User.findOne({username: req.params.username})
    .then(user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    })
    .catch(err => next(err))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /users/finduser/[username].');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users/finduser/[username].');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /users/finduser/[username].');
})

// Route to update a user's password.
userRouter.route('/:userId/passwordupdate')
.get((req, res, next) => {
    res.statusCode = 404;
    res.end('GET not supported for this endpoint. Use PUT instead, and make sure you are signed in to an account with access.')
})
.post((req, res, next) => {
    res.statusCode = 404;
    res.end('POST not supported for this endpoint. Use PUT instead, and make sure you are signed in to an account with access.')
})
.put(
    authenticate.verifyUser,
    (req, res, next) => {
        User.findById(req.params.userId)
        .then(user => {
            if (req.user._id.equals(req.params.userId) || req.user.admin) {
                user.changePassword(req.body.oldpassword, req.body.newpassword)
                .then(() => {
                    res.statusCode = 200;
                    res.json(`The password for ${req.user.username} has been updated successfully.`)
                })
                .catch(err => next(err));
            } else {
                res.statusCode = 403;
                res.end('You cannot change a password unless you are the user or you are an admin.')
            }
        })
        .catch(err => next(err))
    }
)
.delete((req, res, next) => {
    res.statusCode = 404;
    res.end('DELETE not supported for this endpoint. Use PUT instead, and make sure you are signed in to an account with access.')
})

// Route to reset a user's password.
userRouter.route('/:userId/passwordreset')
.get((req, res, next) => {
    res.statusCode = 404;
    res.end('GET not supported for this endpoint. Use PUT instead, and make sure you are signed in to an account with access.')
})
.post((req, res, next) => {
    res.statusCode = 404;
    res.end('POST not supported for this endpoint. Use PUT instead, and make sure you are signed in to an account with access.')
})
.put(
    authenticate.verifyUser,
    (req, res, next) => {
        User.findById(req.params.userId)
        .then(user => {
            if (req.user._id.equals(req.params.userId) || req.user.admin) {
                user.setPassword(req.body.password)
                .then(() => {
                    user.save();
                    res.statusCode = 200;
                    res.json(`The password for ${req.user.username} has been updated successfully.`)
                })
                .catch(err => next(err));
            } else {
                res.statusCode = 403;
                res.end('You cannot change a password unless you are the user or you are an admin.')
            }
        })
        .catch(err => next(err))
    }
)
.delete((req, res, next) => {
    res.statusCode = 404;
    res.end('DELETE not supported for this endpoint. Use PUT instead, and make sure you are signed in to an account with access.')
})

// Routes for dealing with single user
userRouter.route('/:userId')
.get(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => {
        console.log('user found');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    })
    .catch(err => next(err))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /users/${req.params.userId}\nUsers must be adding by sending a POST request to /users`)
})
.put(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, 
        {
            $set: req.body
        },
    {
        new: true
    })
    .then(user => {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    })
    .catch(err => next(err))
})
.delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
});

// Returns the current logged in user
userRouter.route('/current')
.get(authenticate.verifyUser, (req, res, next) => {
    res.end(JSON.stringify(req.user))
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /users/current. Use "GET" to check current user.')
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users/current. Use "GET" to check current user.')
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /users/current. Use "GET" to check current user.')
})

module.exports = userRouter;
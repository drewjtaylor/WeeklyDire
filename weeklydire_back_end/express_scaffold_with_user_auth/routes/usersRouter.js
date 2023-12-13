const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('../authenticate');
const User = require('../models/User');
const cookieParser = require('cookie-parser');


userRouter.route('/')
// Gets all users. Must be admin
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
// Register a new user. Requires at least an email, uesrname, and password
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
// Delete a user. Must be an admin
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

// Route for looking up non-sensitive information using a userId
userRouter.route('/:userId/publiclookup')
.get(
    (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => {
        const limitedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(limitedUser);
    })
    .catch(err => next(err))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /users/${req.params.userId}/publiclookup.`)
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /users/${req.params.userId}/publiclookup.`)
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /users/${req.params.userId}/publiclookup.`)
})


// Route searches for user by username. Returns all details. Must be admin.
userRouter.route('/finduser/:username')
.get(
    authenticate.verifyUser, 
    authenticate.verifyAdmin, 
    (req, res, next) => {
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

// Routes for dealing with single user
userRouter.route('/:userId')
.get(
    authenticate.verifyUser,
    (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => {
        if (req.user.admin || req.user.username === user.username) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user)
        } else {
            res.status(403)
            res.setHeader('Content-Type', 'application/json');
            res.json({
                errorMessage: "You were not authorized for this action",
                loggedInAs: req.user
            });
            
        }
    })
    .catch(err => next(err))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /users/${req.params.userId}\nUsers must be adding by sending a POST request to /users`)
})
.put(
    authenticate.verifyUser,
    (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => {
        if (req.user.admin || req.user.username === user.username) {
            User.findByIdAndUpdate(req.params.userId, 
                {
                    $set: req.body
                },
            {
                new: true
            })
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user)
        }
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

// Route to update a user's password. Requires old password.
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

// Route to reset a user's password. Does not require old password.
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

module.exports = userRouter;
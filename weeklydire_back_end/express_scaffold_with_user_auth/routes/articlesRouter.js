const express = require("express");
const articleRouter = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const authenticate = require("../authenticate");
const Article = require("../models/Article");

// Retrieve all non-deleted articles
articleRouter
  .route("/")
  .get((req, res, next) => {
    Article.find()
      .then((articles) => {
        if (!articles) {
          res.statusCode = 200;
          res.end("There were no articles in the database");
        };
        const activeArticles = articles.filter(
          (article) => article.deleted === false
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(activeArticles);
      })
      .catch((err) => next(err));
  })
  // Create a new article. Requires user to be a creator
  .post(
    authenticate.verifyUser,
    authenticate.verifyCreator,
    (req, res, next) => {
      const creatorId = req.user._id;
      const { body, title, thumbnail, tags } = req.body;
      if (body && title) {
        Article.create({ body, title, thumbnail, tags, creator: creatorId })
          .then((article) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(article);
          })
          .catch((err) => next(err));
      } else {
        const err = new Error(
          'The body of the request must at least contain a "body" and "title".'
        );
        err.statusCode = 400;
        return next(err);
      }
    }
  )
  .put((req, res) => {
    res.statusCode = 403;
    res.end(
      'PUT operation not supported on articles. If you would like to edit an article, use "/articles/[articleId]" with a PUT request.'
    );
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /articles.");
  });

// Retrieve deleted articles
articleRouter
  .route("/deleted")
  .get((req, res, next) => {
    Article.find()
      .then((articles) => {
        if (!articles) {
          res.statusCode = 200;
          res.end("There were no deleted articles in the database");
        };
        const activeArticles = articles.filter(
          (article) => article.deleted
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(activeArticles);
      })
      .catch((err) => next(err));
  })


articleRouter
  .route("/:articleId")
  .get((req, res, next) => {
    Article.findById(req.params.articleId)
      .populate("creator")
      .then((article) => {
        if (!article) {
          res.statusCode = 200;
          res.end("No article found with this _id");
        }
        if (article.deleted) {
          res.statusCode = 404;
          res.end("This article has been removed.");
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(article);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /articles/${req.params.articleId}.`
    );
  })
.put(
    authenticate.verifyUser,
    (req, res, next) => {
      const { body, title, thumbnail, tags } = req.body;
      if (body && title) {
        Article.findById(req.params.articleId)
        .then(article => {
            if (article.creator.equals(req.user._id)) {
                Article.findByIdAndUpdate(req.params.articleId, { body, title, thumbnail, tags})
                .then((article) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(article);
                })
                .catch((err) => next(err));
            } else {
                res.statusCode = 403;
                res.end(`You must be the author to edit the article with ID: ${req.params.articleId}`)
            }
        })
      } else {
        const err = new Error(
          'The body of the request must at least contain a "body" and "title".'
        );
        err.statusCode = 400;
        return next(err);
      }
    }
  )


//   .put(authenticate.verifyUser, (req, res, next) => {
//     // If the user is the author, update the existing document with this article ID
    
//     // If the user is not the author, reject with an error message

//     // Default error otherwise

//     res.statusCode = 403;
//     res.end(
//       `PUT operation not supported on /articles/${req.params.articleId}.`
//     );
//   })









  // Fully deletes article at "articleId". Requires user to be an admin or the author
  // "soft" delete can be achieved using /articles/softDelete/:articleId
  .delete(authenticate.verifyUser, (req, res, next) => {
    Article.findById(req.params.articleId)
      .then((article) => {
        if (req.user.admin || article.creator.equals(req.user._id)) {
          Article.findByIdAndDelete(req.params.articleId)
            .then((article) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/json");
              res.json(article);
            })
            .catch((err) => next(err));
        } else {
          const err = new Error(
            "You must be an admin or the creator of this article to delete it."
          );
          return next(err);
        }
      })
      .catch((err) => {
        res.statusCode = 400;
        res.end(
          `There was an error performing DELETE at /articles/${req.params.articleId}`
        );
      });
  })
  .patch(authenticate.verifyUser, (req, res, next) => {
    Article.findById(req.params.articleId)
      .then((article) => {
        if (req.user.admin || article.creator.equals(req.user._id)) {
          Article.findByIdAndUpdate(req.params.articleId, {
            deleted: true,
          })
            .then((article) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/json");
              res.json(article);
            })
            .catch((err) => next(err));
        } else {
          const err = new Error(
            "You must be an admin or the creator of this article to delete it."
          );
          return next(err);
        }
      })
      .catch((err) => {
        res.statusCode = 403;
        res.end(
          `There was an error performing DELETE at /articles/${req.params.articleId}`
        );
      });
  });

articleRouter
  .route("/softDelete/:articleId")
  .get((req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported at this route.");
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported at this route.");
  })
  // Used to restore a "soft" deleted article by changing "deleted" to false
  .patch(authenticate.verifyUser, (req, res, next) => {
    Article.findById(req.params.articleId)
      .then((article) => {
        if (req.user.admin || article.creator.equals(req.user._id)) {
          Article.findByIdAndUpdate(req.params.articleId, {
            deleted: false,
          })
            .then((article) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/json");
              res.json(article);
            })
            .catch((err) => next(err));
        } else {
          const err = new Error(
            "You must be an admin or the creator of this article to restore it."
          );
          return next(err);
        }
      })
      .catch((err) => {
        res.statusCode = 403;
        res.end(
          `There was an error performing PATCH at /articles/softDelete/${req.params.articleId}`
        );
      });
  })
  // Soft deletes article at "articleId". Requires user to be an admin or the author
  // Full delete can be achieved by just using /articles/:articleId
  .delete(authenticate.verifyUser, (req, res, next) => {
    Article.findById(req.params.articleId)
      .then((article) => {
        if (req.user.admin || article.creator.equals(req.user._id)) {
          Article.findByIdAndUpdate(req.params.articleId, {
            deleted: true,
          })
            .then((article) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/json");
              res.json(article);
            })
            .catch((err) => next(err));
        } else {
          const err = new Error(
            "You must be an admin or the creator of this article to delete it."
          );
          return next(err);
        }
      })
      .catch((err) => {
        res.statusCode = 403;
        res.end(
          `There was an error performing DELETE at /articles/softDelete/${req.params.articleId}`
        );
      });
  });

module.exports = articleRouter;

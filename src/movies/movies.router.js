const express = require("express");

const moviesRouter = express.Router();
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const cors = require("cors");

moviesRouter.use(cors())

moviesRouter.route("/").get(controller.list).all(methodNotAllowed);

moviesRouter.route("/:movieId").get(controller.read).all(methodNotAllowed);

moviesRouter.use("/:movieId/theaters", controller.validateMovieExists, theatersRouter);
moviesRouter.use("/:movieId/reviews", controller.validateMovieExists, reviewsRouter);

module.exports = moviesRouter;

const express = require("express");

const reviewsRouter = express.Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const cors = require("cors");

reviewsRouter.use(cors())

reviewsRouter
  .route("/:reviewId")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

reviewsRouter.route("/").get(controller.readReviewCritic).all(methodNotAllowed);

module.exports = reviewsRouter;

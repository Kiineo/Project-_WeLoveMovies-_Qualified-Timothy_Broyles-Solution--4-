const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function validateReviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  } else {
    return next({
      status: 404,
      message: `cannot be found`,
    });
  }
}

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  await service.update(updatedReview);

  updatedReview.critic = await service.readCritic(updatedReview.critic_id);
  console.log(updatedReview);
  res.json({ data: updatedReview });
}

async function destroy(req, res, next) {
  await service.delete(res.locals.review.review_id);
  res.status(204).send();
}

async function readReviewCritic(req, res) {
  const reviews = await service.readReview(res.locals.movie.movie_id);
  for (let review of reviews) {
    const critic = await service.readCritic(review.critic_id);
    review["critic"] = critic;
  }
  res.json({ data: reviews });
}

module.exports = {
  delete: [
    asyncErrorBoundary(validateReviewExists),
    asyncErrorBoundary(destroy),
  ],
  update: [
    asyncErrorBoundary(validateReviewExists),
    asyncErrorBoundary(update),
  ],
  readReviewCritic: [asyncErrorBoundary(readReviewCritic)],
};

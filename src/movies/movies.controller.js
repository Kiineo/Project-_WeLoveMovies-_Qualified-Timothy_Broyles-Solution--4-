const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function validateMovieExists(req, res, next) {
  const movie = await service.read(Number(req.params.movieId));
  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
    next({
      status: 404,
      message: `could not find movie`,
    });
  }
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function list(req, res, next) {
  const { is_showing} = req.query;
  res.json({ data: await service.list(is_showing) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(validateMovieExists), asyncErrorBoundary(read)],
  validateMovieExists
};

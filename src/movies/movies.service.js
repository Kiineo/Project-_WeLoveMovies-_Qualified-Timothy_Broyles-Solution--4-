const knex = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function list(isShowing) {
  if (isShowing="true") {
    return knex("movies")
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .distinct("movies_theaters.movie_id")
      .select("movies.*")
      .where({ is_showing: true });
  }

  return knex("movies").select("*");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = {
  list,
  read,
};

const knex = require("../db/connection");

function list() {
  return knex("theaters")
    .select("*")  
}

function listMovies(theaterId) {
  return knex("movies_theaters")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .where({ theater_id: theaterId })
    .select(
      "movies.*",
      "movies_theaters.created_at",
      "movies_theaters.updated_at",
      "movies_theaters.is_showing",
      "movies_theaters.theater_id"
    );
}

function listTheaters(movieId) {
  return knex("theaters")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "movies_theaters.theater_id"
    )
    .where({ movie_id: movieId })
    .select(
      "theaters.*",
      "movies_theaters.is_showing",
      "movies_theaters.movie_id"
    );
}

module.exports = {
  list,
  listMovies,
  listTheaters,
};

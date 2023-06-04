const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  let theaters = await service.list();
  console.log(theaters)
  	for(let theater of theaters) {
		const movies = await service.listMovies(theater.theater_id);
		theater["movies"] = movies;
    }
  console.log(theaters)
  res.json({ data: theaters });
}

async function listMovieTheater(req, res, next) {
	if(res.locals.movie) {
		return res.json({ data: await service.listTheaters(res.locals.movie.movie_id) });
	}
	next();
}


module.exports = {
	list: [asyncErrorBoundary(listMovieTheater), asyncErrorBoundary(list)],
};

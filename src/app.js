if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const moviesRouter = require('./movies/movies.router');
const theatersRouter = require('./theaters/theaters.router');
const reviewsRouter = require("./reviews/reviews.router");

const router = express.Router();
const PORT = process.env.PORT || 5001;

router.get('/', cors(), (req, res) => {
  res.json({ message: 'Hello Render!' });
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} `);
});

app.use(express.json())
app.use(cors());
app.use("/movies", moviesRouter)
app.use("/theaters", theatersRouter)
app.use("/reviews", reviewsRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app;
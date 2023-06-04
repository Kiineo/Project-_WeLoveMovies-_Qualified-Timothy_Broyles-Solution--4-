const express = require("express");

const theatersRouter = express.Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const cors = require("cors");

theatersRouter.use(cors())

theatersRouter.route("/").get(controller.list).all(methodNotAllowed);

module.exports = theatersRouter;

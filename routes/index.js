const route = require("express").Router();
const Controller = require("../controller");

route.get("/images", Controller.getImageList);

module.exports = route;

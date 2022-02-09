const route = require("express").Router();
const Controller = require("../controller");

route.post("/images", Controller.getImageList);

module.exports = route;

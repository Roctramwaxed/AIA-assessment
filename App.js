const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  // cors({
  //   origin: ["http://localhost:3001"],
  // })
  cors()
);
app.use(routes);

app.listen(port, () => console.log("Listening on port", port));

module.exports = app;

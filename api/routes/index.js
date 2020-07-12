const bodyParser = require("body-parser");
const routes = require("./routes");

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(routes);
};

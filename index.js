const express = require("express");
const routes = require("./routes");
const database = require("./models");
var cors = require("cors");


const app = express();
const port = 3000;

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

routes(app);
database.sequelize.sync({ alter: false, force: false });

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;

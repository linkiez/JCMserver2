const express = require('express')
const routes = require('./routes')
const database = require('./models');


const app = express()
const port = 3000

routes(app)
database.sequelize.sync({alter: false, force: false})
app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app

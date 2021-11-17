
module.exports = app => {
    app.use(
      express.json(),
      express.urlencoded({ extended: true }),
        //Rotas aqui

      )
    }

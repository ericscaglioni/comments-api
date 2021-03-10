const { cors, bodyParser } = require('../middlewares')

module.exports = app => {
    app.use(cors)
    app.use(bodyParser)
}

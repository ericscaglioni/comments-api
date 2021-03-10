const { Router } = require('express')
const { readdirSync } = require('fs')

module.exports = app => {
    const router = Router()
    app.use('/api', router)

    const routesPath = `${__dirname}/../routes/`
    readdirSync(routesPath).forEach(file => {
        if (!file.includes('.test.')) {
            const module = require(`../routes/${file}`)
            module(router)
        }
    })
}
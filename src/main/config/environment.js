const envConfig = {
    env: process.env.NODE_ENV,
    app: {
        name: 'Comments API',
        port: parseInt(process.env.API_PORT) || 8002
    },
    dbStrategyURL: {
        file: process.env.FILEDB_URL || 'database/tests/posts.json'
    }
}

module.exports = {
    envConfig
}

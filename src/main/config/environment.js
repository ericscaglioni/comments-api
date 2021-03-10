const envConfig = {
    env: process.env.NODE_ENV,
    app: {
        name: 'Comments API',
        port: parseInt(process.env.API_PORT) || 8002
    },
    dbStrategyURL: {
        file: {
            comments: process.env.FILEDB_COMMENTS_URL || 'database/tests/comments.json',
            logs: process.env.FILEDB_LOGS_URL || 'database/tests/logs.json'
        }
    }
}

module.exports = {
    envConfig
}

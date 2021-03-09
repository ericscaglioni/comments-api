module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.js',
        '!<rootDir>/src/**/I**.js',
        '!**/protocols/**',
        '!<rootDir>/src/main/**',
        '!<rootDir>/src/utils/errors/**',
        '!<rootDir>/src/domain/usecases/**'
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node'
}
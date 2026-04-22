import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
    })
    const config = {
        testEnvironment: 'jsdom',
        modulePaths: ["<rootDir>/src/"],
        collectCoverage: true,
        collectCoverageFrom: [
            '**/*.{ts,tsx}',
            '**/*.d.ts',
            '!**/node_modules/**',
            '!**/.next/**',
            '!**/coverage/**',
            '!**/jest.config.js',
            '!**/next.config.js',
            '!**/types/**',
            '!**/views/**',
            '!**/pages/api/**'
        ],

    }
export default createJestConfig(config)
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jquery: true,
    },
    extends: ['eslint:recommended', 'plugin:jest/recommended', 'prettier', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'jest/no-mocks-import': 'warn',
        'no-console': 'error',
        'no-unused-vars': 'off',
    },
    settings: {
        jest: {
            version: require('jest/package.json').version,
        },
    },
};

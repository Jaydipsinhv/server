module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: 'airbnb-base',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        "no-console": 0,
        "no-underscore-dangle": 0,
        "no-param-reassign": 0,
        "prefer-destructuring": 0,
        "object-property-newline": 0,
        "import/no-extraneous-dependencies": 0,
        "no-await-in-loop": 0,
        "global-require": 0,
        "radix": 0,
        "consistent-return": 0,
        "no-async-promise-executor": 0,
        "no-nested-ternary": 0,
        "func-names": 0,
        "no-plusplus": 0,
        "no-tabs": 0
    }
};

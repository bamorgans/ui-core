let config = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "jest": true,
        "es6": true,
        "commonjs": true,
    },
    plugins: [
        'react'
    ],
    "rules": {
        "react/jsx-closing-tag-location": 0,
        "import/no-unresolved": 0,
        "class-methods-use-this": 0,
        "comma-dangle": ["warn", "only-multiline"],
        "func-names": ["error", "never"],
        "function-paren-newline": 0,
        "indent": ["error", 4],
        "no-tabs": 0,
        "no-console": 0,
        "no-plusplus": 0,
        "no-shadow": 0,
        "no-trailing-spaces": 0,
        "no-use-before-define": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-quotes": ["error", "prefer-single"],
        "object-curly-newline": 0,
        "padded-blocks": 0,
        "prefer-destructuring": 0,
        "react/forbid-prop-types":0,
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/no-array-index-key": 0,
        "react/no-unescaped-entities": 0,
        "react/sort-comp": [1,{
            order: [
                'lifecycle',
                'everything-else',
                'render'
            ],
            groups: {
                lifecycle: [
                    'constructor',
                    'componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'componentDidUpdate',
                    'componentWillUnmount'
                ]
            }
        }],
    }
};

// Adjusting linting rules for production builds
if (process.env.NODE_ENV === "production") {
    let productionRules = {
        "no-console": 1,
    };

    config.rules = {...config.rules, ...productionRules};

}

module.exports = config;

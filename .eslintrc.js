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
        "array-callback-return": 0,
        "array-bracket-spacing": 0,
        "arrow-body-style": 0,
        "arrow-parens": 0,
        "class-methods-use-this": 0,
        "comma-dangle": ["warn", "only-multiline"],
        "func-names": ["error", "never"],
        "function-paren-newline": 0,
        "indent": [2, 4, {"SwitchCase": 1}],
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-quotes": ["error", "prefer-single"],
        "import/no-unresolved": 0,
        "linebreak-style": 0,
        "max-len": 0,
        "no-console": 0,
        "no-named-as-default": 0,
        "no-plusplus": 0,
        "no-shadow": 0,
        "no-return-assign": 0,
        "no-tabs": 0,
        "no-trailing-spaces": 0,
        "no-unused-vars": 1,
        "no-use-before-define": 0,
        "object-curly-newline": 0,
        "object-curly-spacing": 0,
        "padded-blocks": 0,
        "prefer-destructuring": 0,
        "quotes": 0,
        "react/forbid-prop-types":0,
        "react/jsx-closing-bracket-location": 0,
        "react/jsx-curly-spacing": 0,
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
        "react/jsx-first-prop-new-line": 0,
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-max-props-per-line": 0,
        "react/jsx-tag-spacing": 0,
        "react/no-array-index-key": 0,
        "react/no-typos": 0,
        "react/no-unescaped-entities": 0,
        "react/no-unused-state": 1,
        "react/no-unused-prop-types": 0,
        "react/require-default-props": 0,
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
        "semi": 1,
        "spaced-comment": 0,
        "space-in-parens": 0
    }
};

module.exports = config;

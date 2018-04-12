const path = require('path');
const webpack = require('webpack');
const merge = require ('webpack-merge');


const common = require('./webpack.common.config.js');


const APP_SRC = path.resolve(__dirname, 'src');
const APP_LIB = path.resolve(__dirname, 'lib');

module.exports = merge (common, {
    output: {
        path: APP_LIB,
        filename: 'ui-core.min.js',
        library: 'uiCore',
        libraryTarget: 'umd'
    },
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            uglifyOptions: {
                ecma: 6,
                safari10: true,
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true
                },
                mangle: true

            },
            output: {
                comments: false
            },
            sourceMap: false,
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
});

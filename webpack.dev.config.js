const path = require('path');
const webpack = require('webpack');
const merge = require ('webpack-merge');

const common = require('./webpack.common.config.js');

const APP_SRC = path.resolve(__dirname, 'src');
const APP_LIB = path.resolve(__dirname, 'lib');

module.exports = merge (common, {
    output: {
        path: APP_LIB,
        filename: 'ui-core.js',
        library: 'uiCore',
        libraryTarget: 'umd'
    },
    devtool: 'cheap-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
});

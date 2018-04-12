const webpack = require('webpack');
const merge = require ('webpack-merge');

const common = require('./webpack.common.config.js');

module.exports = merge (common, {
    devtool: 'cheap-eval-source-map'
});

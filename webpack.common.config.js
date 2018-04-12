const path = require('path');
const webpack = require('webpack');

const APP_SRC = path.resolve(__dirname, 'src');
const APP_LIB = path.resolve(__dirname, 'lib');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: [
        path.join(APP_SRC, 'ui-core.js')
    ],
    output: {
        path: APP_LIB,
        filename: 'ui-core.js',
        library: 'uiCore',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        options: {
                            eslintPath: require.resolve('eslint'),
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: APP_SRC,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                query: {
                    cacheDirectory: true,
                },

            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: 'url-loader'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin(['lib'])
    ]
};

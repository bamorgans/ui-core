const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_SRC = path.resolve(__dirname, 'src');
const APP_LIB = path.resolve(__dirname, 'lib');

module.exports = {
    entry: [
        path.join(APP_SRC, 'index.js')
    ],
    output: {
        path: APP_LIB,
        filename: 'index.js'
    },
    devtool: 'cheap-eval-source-map',
    module: {
        rules: [
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
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
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            /* {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    'file-loader',
                ],
            }, */
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin('ui-core-style.css'),
        new CopyWebpackPlugin([{ from: 'src/assets/js/**', to: 'assets/js', toType: 'dir', flatten: true }]),
        new CopyWebpackPlugin([{ from: 'src/assets/css/**', to: 'assets/css', toType: 'dir', flatten: true }]),
        new CopyWebpackPlugin([{ from: 'src/assets/images/**', to: 'assets/images', toType: 'dir', flatten: true }]),
    ]
};

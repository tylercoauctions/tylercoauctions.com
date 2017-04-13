'use strict';

const webpack = require('webpack');
const env = process.env.NODE_ENV || 'production';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildPath = path.resolve(__dirname, 'docs', 'dist');
const assetsPath = path.resolve(__dirname, 'app', 'assets');

const babelOptions = {
    presets: [
        [ "es2015", { modules: false } ]
    ]
};

module.exports = {
    entry: {
        'scripts/app': path.resolve(assetsPath, 'scripts', 'app.js'),
        'styles/app': path.resolve(assetsPath, 'styles', 'app.scss')
    },
    output: {
        path: buildPath,
        filename: '[name].bundle.js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions
                }
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.(jpg|eot|png|gif|svg|ttf|woff|woff2|oft)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env) }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ].concat(env === 'production' ? [] : [
        new webpack.optimize.UglifyJsPlugin(),
    ]),
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
};

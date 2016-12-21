'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/main.js'
    },

    output: {
        path:     __dirname + '/dist/js',
        filename: "[name].js"
    },

    watch: NODE_ENV === 'dev',

    plugins: [
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.ts', '.js']
    },


    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};


if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:     false,
                drop_console: true,
                unsafe:       true
            }
        })
    );
}

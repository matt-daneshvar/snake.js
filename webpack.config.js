var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/js/Game.js',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'snake.js',
        library: ['SnakeJs', 'Game']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
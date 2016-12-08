let webpack = require('webpack');
let path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'public');
let APP_DIR = path.resolve(__dirname, 'src');

let config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: '/index.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?$/,
                include : APP_DIR,
                loader : 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.png$|\.gif$|\.jpeg$|\.jpg$/,
                loader: "url-loader?mimetype=image/png"
            },
        ]
    }
};

module.exports = config;
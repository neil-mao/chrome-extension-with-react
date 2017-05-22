import path from 'path';
import webpack from 'webpack';

const extensionPath = path.join(__dirname, '../chrome/');
const buildPath = path.join(__dirname, '../build/');

var config = {
    entry: {
        background: extensionPath+'background.js',
        content: extensionPath+'content.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: buildPath+'static/js',
        chunkFilename: '[id].chunk.js',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        alias: {
            app: path.join(__dirname, '../src/app'),
            tmp: path.join(__dirname, '../build/tmp')
        },
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules|tmp\/page\.bundle)/
        },
        {
            test: /\.css?$/,
            loaders: ['style', 'raw']
        }
        ]
    }
};

config.watch = true;

export default config;
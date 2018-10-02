import { join, resolve } from 'path';

// tslint:disable-next-line no-var-requires
const importFresh = require('import-fresh');

process.env.NODE_CONFIG_DIR = resolve(__dirname, 'config');
process.env.NODE_CONFIG_STRICT_MODE = 'true';

const config = importFresh('config');

import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import { Configuration, DefinePlugin } from 'webpack';


const webpackConfig: Configuration = {
    context: __dirname,
    name: 'app',
    mode: 'production',

    entry: {
        // Required to support async/await
        vendor: ['@babel/polyfill'],
        main: ['./index.tsx']
    },

    output: {
        path: join(__dirname, '..', '..', 'dist', 'assets'),
        filename: '[name].js'
    },

    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            { targets: { browsers: 'last 2 versions' } }
                        ],
                        '@babel/preset-typescript',
                        '@babel/preset-react'
                    ],
                    plugins: ['@babel/proposal-class-properties']
                }
            }
        }]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    plugins: [
        new DefinePlugin({ CONFIG: JSON.stringify(config) }),
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ]
};


export default webpackConfig;

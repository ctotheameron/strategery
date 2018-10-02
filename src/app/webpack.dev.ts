import { join, resolve } from 'path';

process.env.NODE_CONFIG_DIR = resolve(__dirname, 'config');
process.env.NODE_CONFIG_STRICT_MODE = 'true';

import * as config from 'config';

import forkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration, DefinePlugin, NamedModulesPlugin } from 'webpack';


const webpackConfig: Configuration = {
    name: 'app',
    mode: 'development',
    context: __dirname,

    entry: {
        // Required to support async/await
        vendor: ['@babel/polyfill'],
        main: ['./index.tsx']
    },

    output: {
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
                    plugins: [
                        '@babel/proposal-class-properties',
                        'react-hot-loader/babel'
                    ]
                }
            }
        }]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: resolve(join(__dirname), 'tsconfig.json')
            })
        ]
    },

    plugins: [
        new DefinePlugin({ CONFIG: JSON.stringify(config) }),
        new NamedModulesPlugin(),
        new HtmlWebpackPlugin({ template: './public/index.html' }),

        new forkTsCheckerWebpackPlugin({
            tslint: true,
            checkSyntacticErrors: true,
            watch: ['./']
        })
    ]
};


export default webpackConfig;

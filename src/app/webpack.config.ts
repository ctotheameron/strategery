import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { join } from 'path';
import { Configuration } from 'webpack';


const config: Configuration = {
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
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ]
};


export default config;

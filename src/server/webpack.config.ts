import { join, resolve } from 'path';

// tslint:disable-next-line no-var-requires
const importFresh = require('import-fresh');

process.env.NODE_CONFIG_DIR = resolve(__dirname, 'config');
process.env.NODE_CONFIG_STRICT_MODE = 'true';

const config = importFresh('config');

import { Configuration, DefinePlugin } from 'webpack';
import webpackNodeExternals = require('webpack-node-externals');


const webpackConfig: Configuration = {
    context: __dirname,
    name: 'server',
    target: 'node',
    mode: 'production',
    entry: './index.ts',

    output: {
        path: resolve(join(__dirname, '..', '..'), 'dist'),
        filename: 'server.js'
    },

    module: {
        rules: [{
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }]
        }]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    externals: [webpackNodeExternals()],

    plugins: [
        new DefinePlugin({ CONFIG: JSON.stringify(config) })
    ],

    node: {
        __dirname: false
    }
};


export default webpackConfig;

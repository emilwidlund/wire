const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React'
        },
        mobx: 'mobx',
        'wire-core': 'wire-core'
    },
    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};

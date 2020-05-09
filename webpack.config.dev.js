const path = require('path');
const base = require('./webpack.config.base');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(base,{
    plugins: [
        new CleanWebpackPlugin(),
    ],
    mode: 'development',
    devtool: false,
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname,'dist'),
        compress: true,
        port: 9000,
        overlay: {
            wranings: true,
            errors: true
        },
        proxy: {
            '/data': {
                'target': 'http://www.bjlink32.com/data.php',
                // secure: false,// 如果是https接口，需要配置这个参数,
                'changeOrigin': true,
                'pathRewrite': {
                    '^/data': ''
                }
            }
        }
    }
});
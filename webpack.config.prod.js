const base = require('./webpack.config.base');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(base,{
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[hash].css',
            chunkFilename: '[id].css'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    }
});
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const development = process.env.NODE_ENV === 'development';

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: ['./index.js', './index.html'],

    output: {
        filename: 'js/bundle.min.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: process.env.NODE_ENV === 'gh-pages' ? '/estimator-v1/' : '/'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(png|gif|jpe?g|eot|svg|ttf|otf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name][ext]'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.json', '.js', '.scss', '.html'],
        alias: {
            vendors: path.resolve(__dirname, 'src/vendors'),
            actions: path.resolve(__dirname, 'src/actions'),
            reducers: path.resolve(__dirname, 'src/reducers'),
            models: path.resolve(__dirname, 'src/models'),
            mixins: path.resolve(__dirname, 'src/mixins'),
            services: path.resolve(__dirname, 'src/services'),
            widgets: path.resolve(__dirname, 'src/assets/scripts/widgets')
        },
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/")
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: development ? 'css/[name].css' : 'css/[name].[contenthash].css'
        }),
    ],

    optimization: {
        minimize: !development,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src')
        },
        compress: false,
        port: 3000
    }
};
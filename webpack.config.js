const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

const vendorPackages = Object.keys(package.dependencies);
vendorPackages.splice(vendorPackages.indexOf('lodash'), 1);

// Naming and path settings
var entryPoint = {
    frontend: './assets/src/frontend/main.js',
    admin: './assets/src/admin/main.js',
    vendor: vendorPackages,
    bootstrap: './assets/src/utils/Bootstrap.js',
    wphook: './assets/vendors/wp-hook/index.js',
    style: './assets/less/style.less',
};

var exportPath = path.resolve(__dirname, './assets/js');

module.exports = ( env, argv ) => {
    let appName = argv.mode === 'development' ? '[name].js' : '[name].min.js';
    let appNameCss = argv.mode === 'development' ? '../css/[name].css' : '../css/[name].min.css';

    return {
        entry: entryPoint,
        output: {
            path: exportPath,
            filename: appName,
            chunkFilename: 'chunks/[chunkhash].js',
        },

        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('./assets/src/'),
                'frontend': path.resolve('./assets/src/frontend/'),
                'admin': path.resolve('./assets/src/admin/'),
            },
            modules: [
                path.resolve('./node_modules'),
                path.resolve(path.join(__dirname, 'assets/src/')),
            ]
        },

        externals: {
            _: 'window.wepos._'
        },

        plugins: [
            new MiniCssExtractPlugin(
                {
                    filename: ( { chunk } ) => {
                        return appNameCss;
                    },
                }
            ),
            new VueLoaderPlugin(),
            new webpack.ProvidePlugin({
                _: '_'
            })
        ],
        module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.less$/,
                use: [
                    // compiles Less to CSS
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts',
                    },
                  },
                ],
            }
        ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false
                }),
                new CssMinimizerPlugin()
            ],
        },
    }
}

const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

const vendorPackages = Object.keys(package.dependencies);
vendorPackages.splice(vendorPackages.indexOf('lodash'), 1);

// Naming and path settings
var appName = 'app';
var entryPoint = {
    frontend: './assets/src/frontend/main.js',
    admin: './assets/src/admin/main.js',
    vendor: vendorPackages,
    bootstrap: './assets/src/utils/Bootstrap.js',
    wphook: './assets/vendors/wp-hook/index.js',
    style: './assets/less/style.less',
};

var exportPath = path.resolve(__dirname, './assets/js');

// Enviroment flag
var plugins = [];
var env = process.env.WEBPACK_ENV;

function isProduction() {
    return process.env.WEBPACK_ENV === 'production';
}

plugins.push( new MiniCssExtractPlugin(
    {
        filename: ( { chunk } ) => {
            return '../css/[name].css';
        },
    }
) );
plugins.push( new VueLoaderPlugin() );

// Differ settings based on production flag
if ( isProduction() ) {
    // plugins.push(new webpack.DefinePlugin({
    //     'process.env': {
    //         NODE_ENV: JSON.stringify(env)
    //     }
    // }));

    appName = '[name].min.js';
} else {
    appName = '[name].js';
}

plugins.push(new webpack.ProvidePlugin({
    _: '_'
}));

module.exports = {
    entry: entryPoint,
    output: {
        path: exportPath,
        filename: appName,
        chunkFilename: 'chunks/[chunkhash].js',
        // jsonpFunction: 'pluginWebpack'
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('./assets/src/'),
            'frontend': path.resolve('./assets/src/frontend/'),
            'admin': path.resolve('./assets/src/admin/'),
        },
        // modules: [
        //     path.resolve('./node_modules'),
        //     path.resolve(path.join(__dirname, 'assets/src/')),
        // ]
    },

    externals: {
        _: 'window.wepos._'
    },

    plugins,
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
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
    },
}

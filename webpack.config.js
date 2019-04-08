const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );

const config = require( './config.json' );

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

// extract css into its own file
const extractCss = new ExtractTextPlugin({
    filename: "../css/[name].css",
});

plugins.push( extractCss );

// Extract all 3rd party modules into a separate 'vendor' chunk
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: ({ resource }) => /node_modules/.test(resource),
}));

// plugins.push(new BrowserSyncPlugin( {
//     proxy: {
//         target: config.proxyURL
//     },
//     files: [
//         '**/*.php'
//     ],
//     cors: true,
//     reloadDelay: 0
// } ));

// Generate a 'manifest' chunk to be inlined in the HTML template
// plugins.push(new webpack.optimize.CommonsChunkPlugin('manifest'));

// Compress extracted CSS. We are using this plugin so that possible
// duplicated CSS from different components can be deduped.
plugins.push(new OptimizeCSSPlugin({
    cssProcessorOptions: {
        safe: true,
        map: {
            inline: false
        }
    }
}));

// Differ settings based on production flag
if ( isProduction() ) {

    plugins.push(new UglifyJsPlugin({
        sourceMap: true,
    }));

    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(env)
        }
    }));

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
        jsonpFunction: 'pluginWebpack'
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

    plugins,
    module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
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
            use: extractCss.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            })
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
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
}

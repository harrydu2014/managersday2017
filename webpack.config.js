var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        home: "dev/js/home"
    },
    output: {
        path: "public/assets",
        publicPath: "public/assets",
        //filename: "[name]-[chunkhash].js"
        filename: "[name].js"
    },
    resolve: {
        modulesDirectories: ['.']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
            // { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader!css-loader') },
            // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            // { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
        //new ExtractTextPlugin("[name]-[contenthash].css")
        // new webpack.ProvidePlugin({   
        //     jQuery: 'jquery',
        //     $: 'jquery',
        //     jquery: 'jquery'
        // }),
        //new webpack.optimize.UglifyJsPlugin()
    ]
};
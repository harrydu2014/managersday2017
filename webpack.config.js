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
            },
            { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "file-loader" },
            { test: /\.eot$/, loader: "file-loader" },
            { test: /\.svg$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        //new ExtractTextPlugin("[name]-[contenthash].css")
        new webpack.ProvidePlugin({   
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
        //new webpack.optimize.UglifyJsPlugin()
    ]
};
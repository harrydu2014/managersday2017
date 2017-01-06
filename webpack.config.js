var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        home: "dev/js/home"
    },
    output: {
        path: "public/assets",
        publicPath: "static/build/",
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
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        //new ExtractTextPlugin("[name]-[contenthash].css")
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
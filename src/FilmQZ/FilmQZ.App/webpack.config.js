var webpack = require("webpack");
var LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");


var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"

});

module.exports = {
    devtool: "inline-source-map",
    entry: {
        app: [
            "./Scripts/App.ts"
        ],
        vendor: [
            "angular/angular.js",
            "@uirouter/angularjs/release/angular-ui-router.js",
            "angular-sanitize"
        ],
        css: ["font-awesome-sass-loader!./Config/font-awesome.config.js",
            "./Content/Custom/Site.scss"]
    },
    context: __dirname + "",
    output: {
        filename: "[name].js",
        path: __dirname + "/assets/",
        sourceMapFilename: "bundle.map"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /(\.scss|\.css)$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.tsx?$/,
                use: [{ loader: "ts-loader" }]
            },
            {
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint-loader",
                options: {}
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        minimize: false,
                        name: "../assets/views/[name].[ext]"
                    }
                },
                {
                    loader: "extract-loader",
                    options: {
                        publicPath: "../",
                    }
                },
                {
                    loader: "html-loader"
                }
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$/,
                loader: require.resolve("file-loader") + "?name=../assets/[path][name].[ext]"
            },

            /*
             * Font loaders, required for font-awesome-sass-loader and bootstrap-loader
             */
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=../assets/[path][name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: require.resolve("file-loader") + "?name=../assets/[path][name].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendors.js"
        }),

        extractSass
    ]
};
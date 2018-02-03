var webpack = require("webpack");
var LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");



var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: false

});


module.exports = {
    entry: {
        app: [
            "./Scripts/App.ts",
            "jquery",
            "bootstrap",
            "angular/angular.js",
            "@uirouter/angularjs/release/angular-ui-router.js",
            "angular-sanitize",
            "./Content/Custom/Site.scss"]
    },
    context: __dirname + "",
    output: {
        filename: "[name].js",
        path: __dirname + "/assets/",
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
                            loader: 'postcss-loader'
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
                use: [{ loader: 'ts-loader' }]
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
                        minimize: true,
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
                ],
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
        extractSass,
        new webpack.optimize.CommonsChunkPlugin({
            name: "app",
            filename: "app.js"
        }),
        new webpack.ProvidePlugin({    // <added>
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'Popper': 'popper.js'   // </added>
        }),

        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false,
            },
            //exclude: [/\.min\.js$/gi] // skip pre-minified libs
        })
    ]
};
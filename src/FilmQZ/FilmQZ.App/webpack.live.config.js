var webpack = require("webpack");
var glob = require("glob");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
    filename: "./assets/[name].css",
    disable: false

});


module.exports = {
    entry: {
        js: glob.sync("./Scripts/Custom/**/*.ts", { "ignore": ["./Scripts/Custom/**/*.d.ts"] }),
        css: ["./Content/Custom/Site.scss"]
    },
    output: {
        filename: "./assets/[name].js",
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
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.wav$|\.mp3$|\.eot$/,
                loader: require.resolve("file-loader") + "?name=../[path][name].[ext]"
            }
        ]
    },
    plugins: [
        extractSass,
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
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        })
    ]
};
var webpack = require("webpack");
var glob = require("glob");


var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
    filename: "./assets/[name].css",
    disable: process.env.NODE_ENV === "development"

});

module.exports = {
    devtool: 'inline-source-map',
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
        extractSass
    ]
};
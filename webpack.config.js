module.exports = {
    entry: "./src/Main.ts",
    output: {
        filename: "./Bundle.js"
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", "json"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.json$/, loader: "json-loader" }
        ],
    },
    externals: {}
}

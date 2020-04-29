const path = require("path");

module.exports = {
    entry: {
        sidebar: "./sidebar/sidebar.js"
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js"
    },
    module: {
        rules: [
            { test: /\.handlebars$/, loader: "handlebars-loader" }
        ]
    }
};

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  devServer: {
    hot: true,
    port: 3000,
  },
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
  ],
}

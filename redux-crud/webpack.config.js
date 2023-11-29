const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  devServer: {
    hot: true,
    port: 3000,
  },
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "index.html"), //模板路径
      filename: "index.html", //自动生成的HTML文件的名称
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
}

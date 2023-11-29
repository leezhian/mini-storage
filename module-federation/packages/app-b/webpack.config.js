/*
 * @Author: kim
 * @Date: 2022-07-10 17:21:11
 * @Description: 
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const { dependencies } = require('./package.json')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_b',
      // 将 模块以 UMD 方式打包，name 为 使用的模块名，类似 jquery 的 $
      library: {
        type: 'var',
        name: 'app_b',
      },
      // 另外一个应用html中引入的模块联邦入口文件
      filename: 'remoteEntry.js',
      // 选择暴露当前应用需要给外部使用的组件，供其他应用使用
      exposes: {
        './Example': './src/components/Example',
        './Example2': './src/components/Example2',
      },
      // 这里是选择关联其他应用的组件
      remotes: {
        app_a: 'app_a@http://localhost:8081/remoteEntry.js',
      },
      // react react-dom会独立分包加载
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // 热加载
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
  },
}

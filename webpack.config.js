const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'public/index.html'
  })
];

const config = {
  entry: ['./src/index.js'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: process.env.PORT | 3000,
    static: path.resolve(__dirname, 'public')
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};

module.exports = config;

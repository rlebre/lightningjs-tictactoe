const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'public/index.html'
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: path.resolve(__dirname, './public/images'), to: 'images' },
      { from: path.resolve(__dirname, './public/fonts'), to: 'fonts' },
      { from: path.resolve(__dirname, './public/logo.png'), to: 'logo.png' }
    ]
  })
];

const config = {
  entry: ['./src/index.js'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};

module.exports = config;

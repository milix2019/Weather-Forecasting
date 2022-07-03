const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/template.html'),
    }),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

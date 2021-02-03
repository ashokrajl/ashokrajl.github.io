const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    mode: 'production',
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    plugins: [new MiniCssExtractPlugin()],
    externals: {
        "jquery": "jQuery"
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
          {
            test: /\.(svg|gif|jpg|png|eot|woff|ttf)$/,
            use: [
              'url-loader',
            ],
          }
        ],
      },
      optimization: {
        minimize: true,
        minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
  };
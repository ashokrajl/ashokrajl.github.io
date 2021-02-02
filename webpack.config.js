module.exports = {
    entry: './src/js/main.js',
    mode: 'development',
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    externals: {
        "jquery": "jQuery"
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
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
  };
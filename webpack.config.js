const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/main.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
};
module.exports = {
  entry: __dirname + '/index.js',
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/build'
  }
};

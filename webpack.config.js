module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    path: './dist',
    filename: 'bundle.js',
    libraryTarget: 'commonjs'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: [
          'babel'
        ],
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
          ]
        }
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  }
};
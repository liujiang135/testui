var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: './ecitizen/main.js',
  module: {
      rules: [
          {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                  loaders: {
                      // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                      // the "scss" and "sass" values for the lang attribute to the right configs here.
                      // other preprocessors should work out of the box, no loader config like this necessary.
                      // 'scss': 'vue-style-loader!css-loader!sass-loader',
                      // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                  }
                  // other vue-loader options go here
              }
          },
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
          },
          {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]?[hash]'
              }
          },
          {
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: 'file-loader'
          },
          {
              test: /\.json$/,
              loader: 'json-loader'
          },
          {
              test: /\.css$/,
              loader: 'style-loader!css-loader'
          }
      ]
  },
  resolve: {
      // require时省略的扩展名
      extensions: ['.js', '.vue'],
      // 别名，可以直接使用别名来代表设定的路径以及其他
      alias: {
          'vue$': 'vue/dist/vue.common.js',
          'wingconn': path.resolve(__dirname, './src/main.js'),
          'axios': 'axios/dist/axios.min.js',
          'http-utils': path.resolve(__dirname, './ecitizen/assets/js/utils/http-utils.js')
      }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'ecitizen-dev'){
  module.exports.output = {
    publicPath: '/dist/',
    filename: 'build.js'
  };
}else if(process.env.NODE_ENV === 'ecitizen-build'){
  module.exports.output = {
    path: path.resolve(__dirname, './ecitizen/dist'),
    filename: 'app.min.js'
  }
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"ecitizen-build"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}

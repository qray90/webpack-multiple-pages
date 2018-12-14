const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=http://127.0.0.1:9527/__webpack_hmr&reload=true&hot=true'

module.exports = {
  mode: 'development',
  entry: {
    index: [hotMiddlewareScript, './src/pages/index/index.js'],
    contact: [hotMiddlewareScript, './src/pages/contact/contact.js']
  },
  output: {
    filename: './js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        use: [{
            loader: 'underscore-template-loader'                    
        }]               
      },
      {
        test: /\.css$/,
        exclude: /node_module/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            }
          ]
        })
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: '/images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.SplitChunksPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/[name].[hash:8].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index/index.ejs',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: './contact.html',
      template: './src/pages/contact/contact.ejs',
      chunks: ['contact']
    }),
  ],
}
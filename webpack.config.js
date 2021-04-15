const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');

// Variables
let mode = 'development';
let target = 'web';

// Production mode condition
if(process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
}

module.exports = {
  mode: mode,
  target: target,
  devtool: 'eval-cheap-source-map',
  
// Set DevServer
devServer: {
  contentBase: './src',
},

// Output Path
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: "main.[fullhash].js",
  assetModuleFilename: 'images/[name][hash][ext]',
},

// Plugins
plugins: [
new CleanWebpackPlugin(),
new MiniCssExtractPlugin({ filename: "main.[fullhash].css"}),
new HtmlWebpackPlugin({
  template: './src/index.html'
}),
new WebpackManifestPlugin()
],

// Set Module
module: {

  rules:[

  // 1. javascript rule object
  {
    test:/\.js$/,
    exclude: /node_modules/,
    use:{
      loader: 'babel-loader',
    }
  },

  // 2. style rule object
  {
    test: /\.scss$/i,
    use:[
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader'
    ]
  },

  {
    test: /\.html$/i,
    loader: 'html-loader',
  },
  // 3. Images rule object
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    type: 'asset',
  },

  // 4. Font rule object
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },


  ]

}

} 
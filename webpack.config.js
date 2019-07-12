const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  context: path.resolve('./src/public'),
  devtool: "source-map",
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    //path: path.resolve( './dist'),
    //filename: 'bundle.js', 
     filename:'bundle.js',
    publicPath: '/dist/',
   // sourceMapFilename: 'map',
     //sourceMapFilename: '[name].map',
    devtoolModuleFilenameTemplate: function (info) {
      return "file:///" + info.absoluteResourcePath;
    }
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve('./dist/'), 'node_modules']
  },
  module: {
    // loaders:[
    //   {test: /\.tsx?$/, loader:'ts-loader'}, 
    //   {test: /\.html$/, loader:"html"},
    // ]
    
    rules: [{
       // test: /\.tsx?$/,
       test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: "babel-loader",
          options: {
            configFile: "./babel.config.js",
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: "ts-loader"
        }]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html"
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Typescript Webpack Starter",
      template: '!!ejs-loader!src/views/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    inline: true
  },
}
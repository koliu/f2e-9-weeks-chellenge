const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// the path(s) that should be cleaned
const pathsToClean = [
  'public', // removes 'public' folder
];

const cleanOptions = {
  // Absolute path to your webpack root folder (paths appended to this)
  // Default: root of your package
  root: __dirname,

  // exclude: ['shared.js'],

  // Write logs to console.
  verbose: true,

  // Use boolean "true" to test/emulate delete. (will not remove files).
  // Default: false - remove files
  dry: false,

  // If true, remove files on recompile. 
  // Default: false
  watch: false,

  // allow the plugin to clean folders outside of the webpack root.
  // Default: false - don't allow clean folder outside of the webpack root
  allowExternal: false,

  // perform clean just before files are emitted to the output dir
  // Default: false
  beforeEmit: false,
};

module.exports = {
  // __dirname 是 webpack 的全域變數：當前檔案的所在目錄
  // entry: 進入點檔案
  // output: 輸出的目標檔案
  entry: `${__dirname}/src/main.js`,
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js"
  },
  devtool: "eval-source-map",
  devServer: {
    // root path of server, default is root of project
    contentBase: "./learn-1/public",
    // 對於 SPA，瀏覽器的 History 可以設成 HTML5 History API/Hash
    // 若設成 HTML5 History API，重整時會出現 404，因為它是以其它路徑來訪問後台
    // 此處設成 true，代表 404 都指向 index.html
    historyApiFallback: true,
    // watch & auto reload page (default: true)
    // inline: false,
    port: 28080,
  },
  module: {
    rules: [{
      test: /(\.js)$/,
      use: {
        loader: "babel-loader"
      },
      exclude: "/node_modules/"
    }, {
      test: /(\.scss|\.css)$/,
      // 同時使用多個 loader 來解析 css
      // 順序：下(先用) -> 上(後用)
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: {
            // 啟用 css modules
            modules: true,
            // 指定 css 的類別名稱，預設為 import { className } from "./style.css" 的 className
            localIdentName: '[name]__[local]--[hash:base64:5]',
            url: false,
            minimize: true,
            sourceMap: true
          }
        }, {
          loader: "postcss-loader",
          options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }]
      })
    },
    {
      test: /(\.pug|\.jade)$/,
      use: {
        loader: "pug-loader"
      },
      exclude: "/node_modules/"
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      /** Required **/
      // Inject style, script
      inject: true,
      template: `${__dirname}/src/index.pug`,

    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new ExtractTextPlugin("styles.css"),
  ],
}

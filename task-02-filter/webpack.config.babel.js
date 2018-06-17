import path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

// the path(s) that should be cleaned
const pathsToClean = [
  "dist", // removes 'dist' folder
  "build/*.*" // removes all files in 'build' folder
  // 'web/*.js'      // removes all JavaScript files in 'web' folder
];

// the clean options to use
const cleanOptions = {
  root: "",
  exclude: [],
  verbose: true,
  dry: false
};

export default (module = {
  entry: "./src/js/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader" // npm install babel-loader
      },
      {
        test: /(\.scss|\.css)$/,
        // 同時使用多個 loader 來解析 css
        // 順序：下(先用) -> 上(後用)
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              // 啟用 css modules
              modules: false,
              // 指定 css 的類別名稱，預設為 import { className } from "./style.css" 的 className
              // localIdentName: '[name]__[local]--[hash:base64:5]',
              url: false,
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
        exclude: "/node_modules/"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.pug",
      filename: "./index.html"
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
});

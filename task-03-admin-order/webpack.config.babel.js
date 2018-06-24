import path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import VueLoaderPlugin from "vue-loader/lib/plugin";
import webpack from "webpack";

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
        test: /\.vue$/,
        loader: "vue-loader"
      },
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
        // use: ["pug-loader"],
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ["pug-plain-loader"]
          },
          // this applies to pug imports inside JavaScript
          {
            use: ["raw-loader", "pug-plain-loader"]
          }
        ],
        exclude: "/node_modules/"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.pug",
      filename: "./index.html"
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new VueLoaderPlugin(),

    // for installed from npm
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    // for built-in moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /js$/)
  ],
  devServer: {
    // Display only errors to reduce the amount of output.
    stats: "errors-only",

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT || 28080, // Defaults to 8080
    // open: true // Open the page in browser,
    overlay: true // capturing compilation related warnings and errors
  }
});

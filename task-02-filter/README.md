# No.2 filter

---

## spec

- https://hexschool.github.io/THE_F2E_Design/week2-filter

## Initial Project

### Initial Webpack

```shell
npm install --save-dev webpack

-- If you're using webpack v4 or later, you'll need to install a CLI.
npm install --save-dev webpack-cli
-- or
npm install --save-dev webpack-command
```

- Add script to package.json

```json
"scripts": {
    "start": "webpack --mode development"
  },
```

- Create config to root

```js
const path = require("path");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

- Test

```sh
npm start
```

### Install Babel

```shell
npm install --save-dev babel-core babel-preset-es2015
```

- Create .babelrc in project root

```js
// .babelrc
{
  "presets": ["es2015"]
}
```

- Rename webpack.config.js to webpack.config.babel.js

- Adjust config to use ES6

```js
import path from "path";

export default (module = {
  entry: "./src/js/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
});
```

- Test

```sh
npm start
```

### Install clean-webpack-plugin to remove /dist folder

```sh
npm i clean-webpack-plugin --save-dev
```

- Setup config

```js
// webpack.config
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
  //...
  plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)]
});
```

### Setup for pug

- install:
  - pug-loader: for webpack to resolve pug file
  - html-webpack-plugin: to generate HTML file

```sh
npm i -D pug pug-loader html-webpack-plugin
```

- Set config

```js
// webpack.config.babel.js
import HtmlWebpackPlugin from "html-webpack-plugin";

module: {
    rules: [{
        test: /\.pug$/,
        use: ['pug-loader']
    }]
},
plugins: [
  new HtmlWebpackPlugin({
    template: "./index.pug",
    filename: "./index.html"
  }),
  new CleanWebpackPlugin(pathsToClean, cleanOptions)
]
```

### Setup for SCSS & ES6

- Install

```sh
npm i -D sass node-sass sass-loader postcss-loader css-loader style-loader babel-loader
```

- Set config

```js
// webpack.config.babel.js
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
  ]
},
```

- Import main.css to main.js

```js
// main.js
import style from "../css/main.scss";
```

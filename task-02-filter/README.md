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

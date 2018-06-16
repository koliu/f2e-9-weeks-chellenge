import path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";

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
  plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)]
});

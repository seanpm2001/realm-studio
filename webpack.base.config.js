const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require('webpack');
const { CheckerPlugin } = require("awesome-typescript-loader");

const isProduction = process.env.NODE_ENV === "production";
console.log("Running in", isProduction ? "production" : "development", "mode");

const BUILD_PATH = path.resolve(__dirname, "build");

const devDependencies = Object.keys(require("./package.json").devDependencies);
const devDependenciesWhitelist = devDependencies.map((module) => {
  // The the base "module" or "module/..", not "module something else"
  return new RegExp(`^${module}(?:$|\/.*)`);
});

const externals = [
  nodeExternals({
    // Anyting related to webpack, we want to keep in the bundle
    whitelist: devDependenciesWhitelist/*[
      "webpack/hot/dev-server",
      /^webpack-dev-server\/client/
    ]*/
  })
];

const node = {
  // This will make __dirname equal the bundles path
  __dirname: false
};

const resolve = {
  alias: {
    "realm-studio-styles": path.resolve(__dirname, "styles")
  },
  extensions: [".ts", ".tsx", ".js", ".jsx", ".html", ".scss"],
};

const baseConfig = {
  devtool: !isProduction ? "inline-source-map" : false,
  externals,
  module: {
    rules: []
  },
  node,
  output: {
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    // @see https://github.com/s-panferov/awesome-typescript-loader#configuration on why CheckerPlugin is needed
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ].concat(isProduction ? [
    // Plugins for production
  ] : [
    // Plugins for development
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]),
  resolve
};

module.exports = baseConfig;
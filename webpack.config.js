module.exports = {
  entry: {
    filename: "./src/index.js",
  },
  output: {
    filename: "./public/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, loader: "babel-loader" }
    ]
  }
};

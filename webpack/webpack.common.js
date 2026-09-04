const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const SRC_DIR = path.resolve("src");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: SRC_DIR,
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: isDevelopment ? [require.resolve("react-refresh/babel")] : [],
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        include: SRC_DIR,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // favicon: "./public/favicon.ico",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

const webpack = require("webpack")
const path = require("path")

const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "index.tsx"),
  output: {
    filename: "[name].[contentHash].js",
    chunkFilename: "[name].[contentHash].js",
    path: path.resolve(__dirname, "../docs"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: "file-loader",
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.mdx$/,
        use: ["babel-loader", "@mdx-js/loader"],
      },
    ],
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".ts", ".tsx"],
    alias: {
      "@cs125/semantic-ui": path.resolve(__dirname, ".."),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin(["GIT_COMMIT", "npm_package_version", "npm_package_description"]),
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "index.html"), inlineSource: ".js" }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: path.resolve(__dirname, "../docs/report.html"),
      openAnalyzer: false,
    }),
  ],
}

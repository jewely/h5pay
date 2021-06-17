var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

var isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    vendor: ["vue", "mint-ui"],
    app: "./src/main.js"
  },
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ["vue-style-loader", "css-loader", "sass-loader"],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax"
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 8000,
          name: "img/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) //'"development"' // process.env.NODE_ENV.toString()
      }
    }),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunksSortMode: "dependency",
      inject: true,
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        removeAttributeQuotes: isProd
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    progress: true,
    overlay: true,
    host: "0.0.0.0",
    hot: true
  },
  performance: {
    hints: false
  },
  devtool: isProd ? "#source-map" : "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.output.path = path.resolve(__dirname, "./dist");
  module.exports.output.filename = "js/[name].[chunkhash:8].js";

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin("dist"),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: path.resolve(__dirname, "css/[name].[contenthash:8].css")
    }),
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: true
    //     ? { safe: true, map: { inline: false } }
    //     : { safe: true }
    // }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: false,
        drop_debugger: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}

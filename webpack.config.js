const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[hash].js",
    publicPath:"/",
    clean: true
  },
  devServer: {
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.ts', '.json', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
          baseUrl: path.resolve(__dirname, '.'),
          configFile: "./tsconfig.json",
          extensions: [".js", ".ts", ".tsx"],
        })
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({template: "./src/index.html"})
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ["style-loader","css-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|svg)/,
        use: ['file-loader']
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules|\.d\.ts$/
      }
    ]
  }
}

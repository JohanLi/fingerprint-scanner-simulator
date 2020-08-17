/* eslint @typescript-eslint/no-var-requires: 0 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminWebp = require('imagemin-webp');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let cssHmr = false;
let cssFilename = 'styles-[contenthash].css';
let imageFilename = '[name]-[contenthash].webp';

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    favicon: './src/favicon-7b2b909ae59ca59d32fae4656050a4bc.ico',
    inject: 'body',
  }),
];

let additionalClientConfig = {};

module.exports = (env = {}) => {
  const { development } = env;

  if (development) {
    cssHmr = true;
    cssFilename = 'styles.css';
    imageFilename = '[name].[ext]';

    additionalClientConfig = {
      mode: 'development',
      devtool: 'eval-cheap-module-source-map',
      watch: true,
      devServer: {
        hot: true,
        historyApiFallback: true,
      },
    };
  } else {
    plugins.push(
      new ImageminPlugin({
        test: /\.(jpg|png)$/,
        plugins: [
          imageminWebp({
            quality: 100,
          }),
        ],
      }),
    );
  }

  plugins.push(new MiniCssExtractPlugin({ filename: cssFilename }));

  return {
    entry: ['@babel/polyfill', './src'],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: cssHmr,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets',
                name: imageFilename,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle-[hash].js',
      path: path.join(__dirname, 'build'),
      publicPath: development ? '/' : './fingerprint-scanner-simulator/',
    },
    plugins,
    ...additionalClientConfig,
  };
};

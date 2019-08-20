const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
console.log('NODE_ENV:', mode)

module.exports = {
  mode: mode,
  entry: {
    'scripts/theme': ['./scripts/theme.js'],
    'styles/theme': ['./styles/theme.less'],
  },
  output: {
    filename: '[name].min.js',
    path: __dirname,
  },
  resolve: {
    alias: {
      'xtend-library': path.resolve(__dirname, 'node_modules/xtend-library'),
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'less-loader',
            options: {sourceMap: true},
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({
      sourceMap: true,
    }), new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true,
        },
      },
    })],
  },
  devtool: 'source-map',
  watch: true,
};
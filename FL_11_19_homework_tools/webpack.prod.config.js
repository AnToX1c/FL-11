const path = require(`path`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  mode: `production`,
  entry: [`./src/js/index.js`, `./src/scss/style.scss`],
  output: {
    filename: `js/app.js`,
    path: path.join(__dirname, `dist`)
  },
  devtool: `source-map`,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '95-100'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
						loader: 'file-loader',
						options: {
							name: './css/[name].css',
						}
					},
          {
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
        ]
      }
    ]
  }
};

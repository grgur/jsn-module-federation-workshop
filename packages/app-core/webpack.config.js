const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkgJson = require('./package.json');

module.exports = () => {
  return {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      publicPath: 'auto',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
      new ModuleFederationPlugin({
        name: 'core',
        remotes: {
          hero: 'hero@https://grgur-jsn-module-federation-workshop-jjxwwpq3qq57-8081.githubpreview.dev/hero.js',
        },
        shared: {
          ...pkgJson.dependencies,
          react: {
            requiredVersion: '^18.1.0',
          },
          'react-dom': {
            requiredVersion: '^18.1.0',
          },
        },
      }),
    ],
  };
};

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';
import common from './common';

const config: Configuration = {
  ...common,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  plugins: [...common.plugins!, new CleanWebpackPlugin()],
};

export default config;

import 'dotenv/config';
import path from 'path';
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import common from './common';

const WEBPACK_DEV_SERVER_PORT = 3000;

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  ...common,
  mode: 'development',
  output: {
    publicPath: '',
  },
  plugins: [...common.plugins!, new HotModuleReplacementPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, '..', 'build'),
    historyApiFallback: true,
    port: WEBPACK_DEV_SERVER_PORT,
    open: true,
  },
};

export default config;

import { merge } from 'webpack-merge'
import common from './webpack.common.js'

export default merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
})

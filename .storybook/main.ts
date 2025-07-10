import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    // Remove default .css rule if it exists
    config.module.rules = config.module.rules.filter(
      (rule) => !(rule && typeof rule === 'object' && 'test' in rule && rule.test?.toString().includes('.css'))
    );

    config.module.rules.push({
      test: /\.css$/,
      include: path.resolve(__dirname, '../'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
        'postcss-loader',
      ],
    });

    return config;
  },
};

export default config;

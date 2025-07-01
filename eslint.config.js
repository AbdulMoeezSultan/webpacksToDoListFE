import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { default as pluginPrettierRecommended } from 'eslint-plugin-prettier/recommended'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  ...tseslint.configs.recommended,

  pluginPrettierRecommended,
])

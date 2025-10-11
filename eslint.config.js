// Use ESLint flat config with React + TypeScript + Prettier integration
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Ignore build output
  globalIgnores(['dist', 'node_modules']),
  // Base for TS/React files
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    // Base recommended sets that are flat-config compatible
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      // React Hooks recommended rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // React Refresh rule similar to recommended config for Vite
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Prettier integration
      'prettier/prettier': 'error',
      // Example TS tweak
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Optional: turn off rule that conflicts with React 17+ JSX transform
      'react/react-in-jsx-scope': 'off',
    },
  },
  // Disable stylistic rules that might conflict with Prettier
  eslintConfigPrettier,
]);

import react from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tsParser,
    },
    plugins: {
      react,
      '@typescript-eslint': tsPlugin,
      prettier,
    },
    rules: {
      'no-var': 'warn',
      eqeqeq: 'warn',
      'dot-notation': 'warn',
      'no-unused-vars': 'warn',
      'react/destructuring-assignment': 'warn',
      'react/jsx-pascal-case': 'warn',
      'react/no-direct-mutation-state': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-unused-state': 'warn',
      'react/jsx-key': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': 'warn',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];

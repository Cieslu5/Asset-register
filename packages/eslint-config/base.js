import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { noDashSelectors } from './copy-rules.js';

export { noDashSelectors };

export const base = tseslint.config(
  { ignores: ['**/.next/**', '**/dist/**', '**/.turbo/**', '**/coverage/**', '**/drizzle/**'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'no-console': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-restricted-syntax': ['error', ...noDashSelectors],
    },
  },
);

export default base;

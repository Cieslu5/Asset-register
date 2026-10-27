import { base, noDashSelectors } from '@repo/eslint-config/base';

export default [
  ...base,
  {
    files: ['src/domain/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^[^.]',
              message: 'domain/ to czyste funkcje: importuje tylko inne pliki z domain/.',
            },
          ],
        },
      ],
      'no-restricted-syntax': ['error', ...noDashSelectors],
    },
  },
];

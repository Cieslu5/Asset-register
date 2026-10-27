import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import { base, noDashSelectors } from './base.js';

const UI_ONLY_MESSAGE =
  'Komponenty i ikony tylko z @repo/ui. Brakuje komponentu? Dodaj go do packages/ui.';
const STYLING_MESSAGE =
  'Kolor, typografia i obramowanie należą do komponentów z @repo/ui. W module tylko układ (Stack, Cluster, Grid).';

// Plan, sekcja 5.3: aplikacja składa widoki wyłącznie z komponentów z packages/ui.
const uiOnly = {
  files: ['src/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [
              '@radix-ui/*',
              'radix-ui',
              'lucide-react',
              '@icons-pack/*',
              'class-variance-authority',
              'clsx',
              'tailwind-merge',
            ],
            message: UI_ONLY_MESSAGE,
          },
        ],
      },
    ],
    'react/forbid-elements': [
      'error',
      {
        forbid: ['button', 'input', 'select', 'textarea', 'table', 'dialog'].map((element) => ({
          element,
          message: UI_ONLY_MESSAGE,
        })),
      },
    ],
    'no-restricted-syntax': [
      'error',
      ...noDashSelectors,
      {
        selector:
          "JSXAttribute[name.name='className'] Literal[value=/(^|\\s)(bg|text|border|font)-/]",
        message: STYLING_MESSAGE,
      },
      {
        selector:
          "JSXAttribute[name.name='className'] TemplateElement[value.raw=/(^|\\s)(bg|text|border|font)-/]",
        message: STYLING_MESSAGE,
      },
    ],
  },
};

export const nextConfig = [...base, ...nextVitals, ...nextTypescript, uiOnly];

export default nextConfig;

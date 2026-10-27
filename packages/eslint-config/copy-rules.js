const DASH_MESSAGE = 'Bez pauz i półpauz w tekstach. Użyj przecinka, dwukropka albo nawiasu.';

export const noDashSelectors = [
  { selector: 'Literal[value=/[–—]/]', message: DASH_MESSAGE },
  { selector: 'TemplateElement[value.raw=/[–—]/]', message: DASH_MESSAGE },
  { selector: 'JSXText[value=/[–—]/]', message: DASH_MESSAGE },
];

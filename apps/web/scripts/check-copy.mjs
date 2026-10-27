import { readdirSync, readFileSync } from 'node:fs';

const DASHES = /[–—]/;
const messagesDir = new URL('../messages/', import.meta.url);

const offenders = readdirSync(messagesDir)
  .filter((file) => file.endsWith('.json'))
  .flatMap((file) =>
    readFileSync(new URL(file, messagesDir), 'utf8')
      .split('\n')
      .map((text, index) => ({ file, line: index + 1, text }))
      .filter(({ text }) => DASHES.test(text)),
  );

for (const { file, line, text } of offenders) {
  process.stderr.write(`messages/${file}:${line} pauza lub półpauza: ${text.trim()}\n`);
}

process.exitCode = offenders.length > 0 ? 1 : 0;

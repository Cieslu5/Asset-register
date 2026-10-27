import { existsSync } from 'node:fs';
import { defineConfig } from 'drizzle-kit';

const LOCAL_ENV = '../../apps/web/.env';
if (existsSync(LOCAL_ENV)) process.loadEnvFile(LOCAL_ENV);

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  out: './drizzle',
  casing: 'snake_case',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  strict: true,
  verbose: true,
});

import { createDb, type Database } from '@repo/db';
import { env } from './env';

declare global {
  var database: Database | undefined;
}

// W trybie dev każdy hot reload tworzyłby nową pulę połączeń.
export const db = (globalThis.database ??= createDb(env.DATABASE_URL));

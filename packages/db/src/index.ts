import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export function createDb(connectionString: string) {
  return drizzle({ client: new Pool({ connectionString }), schema, casing: 'snake_case' });
}

export type Database = ReturnType<typeof createDb>;
export type Transaction = Parameters<Parameters<Database['transaction']>[0]>[0];

// Druga linia izolacji firm: polityki RLS czytają app.organization_id ustawione na czas transakcji.
export function withOrganization<T>(
  db: Database,
  organizationId: string,
  work: (tx: Transaction) => Promise<T>,
): Promise<T> {
  return db.transaction(async (tx) => {
    await tx.execute(sql`select set_config('app.organization_id', ${organizationId}, true)`);
    return work(tx);
  });
}

export { schema };

import { DomainError, ValidationError, type ErrorCode, type Role } from './domain';

export interface Context {
  userId: string;
  organizationId: string;
  role: Role;
  locale: string;
}

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: ErrorCode; fieldErrors?: Record<string, string[]> } };

// Jedyne miejsce, w którym błąd domenowy zamienia się w wynik dla UI.
// Pozostałe wyjątki to błędy programu, więc lecą dalej do granicy błędów Next.js.
export async function toResult<T>(work: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, data: await work() };
  } catch (error) {
    if (!(error instanceof DomainError)) throw error;
    return {
      ok: false,
      error:
        error instanceof ValidationError
          ? { code: error.code, fieldErrors: error.fieldErrors }
          : { code: error.code },
    };
  }
}

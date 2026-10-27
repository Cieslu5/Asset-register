export type ErrorCode = 'FORBIDDEN' | 'VALIDATION' | 'NOT_FOUND' | 'CONFLICT';

export abstract class DomainError extends Error {
  abstract readonly code: ErrorCode;
}

export class ForbiddenError extends DomainError {
  readonly code = 'FORBIDDEN';
}

export class ValidationError extends DomainError {
  readonly code = 'VALIDATION';

  constructor(readonly fieldErrors: Record<string, string[]>) {
    super('Validation failed');
  }
}

export class NotFoundError extends DomainError {
  readonly code = 'NOT_FOUND';
}

export class ConflictError extends DomainError {
  readonly code = 'CONFLICT';
}

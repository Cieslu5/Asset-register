import { ForbiddenError } from './errors';

export const ROLES = ['owner', 'admin', 'manager', 'viewer'] as const;
export type Role = (typeof ROLES)[number];

export const PERMISSIONS = [
  'organization.manage',
  'members.invite',
  'equipment.read',
  'equipment.write',
  'equipment.handover',
] as const;
export type Permission = (typeof PERMISSIONS)[number];

const MATRIX: Record<Role, readonly Permission[]> = {
  owner: PERMISSIONS,
  admin: ['members.invite', 'equipment.read', 'equipment.write', 'equipment.handover'],
  manager: ['equipment.read', 'equipment.write', 'equipment.handover'],
  viewer: ['equipment.read'],
};

export function can(role: Role, permission: Permission): boolean {
  return MATRIX[role].includes(permission);
}

export function assertCan(role: Role, permission: Permission): void {
  if (!can(role, permission)) {
    throw new ForbiddenError(`Role ${role} lacks ${permission}`);
  }
}

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

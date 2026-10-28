import type { StatusTone } from './StatusBadge';

export interface EquipmentRow {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  holder: string | null;
  status: 'available' | 'issued' | 'repair' | 'retired';
  price: `${number}`;
  purchasedOn: string;
}

export const STATUS_BADGE: Record<EquipmentRow['status'], { label: string; tone: StatusTone }> = {
  available: { label: 'Available', tone: 'success' },
  issued: { label: 'Issued', tone: 'info' },
  repair: { label: 'In repair', tone: 'warning' },
  retired: { label: 'Retired', tone: 'neutral' },
};

const MODELS = [
  ['ThinkPad T14 Gen 5', 'Laptop', '5899.00'],
  ['MacBook Air 13 M3', 'Laptop', '5299.00'],
  ['iPhone 15, 128 GB', 'Phone', '3899.00'],
  ['Galaxy S24', 'Phone', '3499.00'],
  ['Dell U2723QE', 'Monitor', '2399.00'],
  ['Toyota Proace City', 'Vehicle', '119900.00'],
  ['Makita DHP485', 'Tool', '749.00'],
] as const;

const PEOPLE = [
  'Anna Nowak',
  'Piotr Wiśniewski',
  'Katarzyna Zielińska',
  'Tomasz Lewandowski',
  null,
];
const STATUSES: EquipmentRow['status'][] = ['issued', 'issued', 'available', 'repair', 'retired'];

export function makeEquipment(count: number): EquipmentRow[] {
  return Array.from({ length: count }, (_, index) => {
    const [name, category, price] = MODELS[index % MODELS.length] ?? MODELS[0];
    const status = STATUSES[index % STATUSES.length] ?? 'available';
    const month = String((index % 12) + 1).padStart(2, '0');
    return {
      id: `eq-${index + 1}`,
      name,
      serialNumber: `PF${(4_100_000 + index * 7919).toString(36).toUpperCase()}`,
      category,
      holder: status === 'issued' ? (PEOPLE[index % PEOPLE.length] ?? null) : null,
      status,
      price,
      purchasedOn: `202${4 + (index % 3)}-${month}-14`,
    };
  });
}

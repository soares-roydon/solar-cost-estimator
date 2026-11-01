export interface WalkwayMaterial {
  id: string;
  name: string;
  qtyPerWalkway: number;
  unitPrice: number;
}

// Real FRP walkway & mounting rates from Maharudra Solar invoice (INV-68)
export const defaultWalkwayMaterials: WalkwayMaterial[] = [
  {
    id: 'frp-panel',
    name: 'FRP Walkway Panel (3.66m x 310mm x 30mm)',
    qtyPerWalkway: 1,
    unitPrice: 1940,
  },
  { id: 'clamps', name: 'Walkway Clamps', qtyPerWalkway: 4, unitPrice: 23.1 },
  { id: 'self-tapping-bolts', name: 'Self-tapping Screws', qtyPerWalkway: 8, unitPrice: 6 },
];

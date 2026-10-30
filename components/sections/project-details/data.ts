export interface FloorCableDistance {
  label: string; // e.g. "Roof → Floor 3"
  distance: number;
  extraCable: number;
}

// Generate floor cable distance rows based on number of floors
export function generateFloorDistances(floors: number): FloorCableDistance[] {
  const rows: FloorCableDistance[] = [];

  // Roof → top floor
  rows.push({ label: `Roof → Floor ${floors}`, distance: 5, extraCable: 0 });

  // Floor N → Floor N-1
  for (let i = floors; i > 1; i--) {
    rows.push({ label: `Floor ${i} → Floor ${i - 1}`, distance: 4, extraCable: 0 });
  }

  // Floor 1 → Ground
  rows.push({ label: 'Floor 1 → Ground', distance: 5, extraCable: 0 });

  return rows;
}

export const floorOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

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

/**
 * Calculate vertical distance from Roof down to a specific floor.
 * Floor numbering: Ground = 0, Floor 1 = 1, ..., Floor N = N.
 * The distances array has (N+1) entries:
 *   [0] Roof → Floor N, [1] Floor N → Floor N-1, ..., [N] Floor 1 → Ground
 *
 * roofToFloor(3, 3, distances) → distances[0] (Roof → Floor 3)
 * roofToFloor(0, 3, distances) → all entries (Roof → Ground)
 */
export function roofToFloor(
  targetFloor: number,
  numberOfFloors: number,
  distances: FloorCableDistance[]
): number {
  const segmentsToSum = numberOfFloors - targetFloor + 1;
  let total = 0;
  for (let i = 0; i < Math.min(segmentsToSum, distances.length); i++) {
    total += (distances[i]?.distance ?? 0) + (distances[i]?.extraCable ?? 0);
  }
  return total;
}

/**
 * Calculate vertical distance from a specific floor down to Ground.
 * floorToGround(X) = totalVertical - roofToFloor(X)
 */
export function floorToGround(
  fromFloor: number,
  numberOfFloors: number,
  distances: FloorCableDistance[]
): number {
  const totalVertical = totalVerticalDistance(distances);
  const roofToTarget = roofToFloor(fromFloor, numberOfFloors, distances);
  return Math.max(0, totalVertical - roofToTarget);
}

/**
 * Total vertical distance from Roof to Ground (sum of all segments including extra cable).
 */
export function totalVerticalDistance(distances: FloorCableDistance[]): number {
  return distances.reduce((sum, row) => sum + (row.distance ?? 0) + (row.extraCable ?? 0), 0);
}

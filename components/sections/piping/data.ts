export interface PipingItem {
  id: string;
  name: string;
  defaultQty?: number;
  isPipeQty?: boolean; // if true, uses calculated numberOfPipes
  unitPrice: number;
}

// Dummy data — will come from Excel sheet later
export const defaultPipingItems: PipingItem[] = [
  { id: 'pvc-pipe', name: 'PVC Pipe (3m)', isPipeQty: true, unitPrice: 120 },
  { id: 'short-elbow', name: 'Short Elbow Joints', defaultQty: 8, unitPrice: 80 },
  { id: 'long-elbow', name: 'Long Elbow Joints', defaultQty: 4, unitPrice: 120 },
  { id: 'straight-joints', name: 'Straight Joints', defaultQty: 8, unitPrice: 60 },
];

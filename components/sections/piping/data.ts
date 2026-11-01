export interface PipingItem {
  id: string;
  name: string;
  defaultQty?: number;
  isPipeQty?: boolean; // if true, uses calculated numberOfPipes
  unitPrice: number;
}

// Real unit prices calibrated with Maharudra Solar invoice (INV-391)
export const defaultPipingItems: PipingItem[] = [
  { id: 'pvc-pipe', name: 'ARPVC Conduit Pipe 25mm MMS (3m)', isPipeQty: true, unitPrice: 66 },
  { id: 'bends', name: 'Slip Type Bends 25mm', defaultQty: 8, unitPrice: 9.85 },
  { id: 'elbows', name: 'Elbows 25mm', defaultQty: 4, unitPrice: 7.85 },
  { id: 'saddles', name: 'PVC Saddles 25mm', defaultQty: 8, unitPrice: 14 },
];

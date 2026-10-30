export interface OtherCostItem {
  id: string;
  name: string;
  amount: number;
}

// Dummy data — will come from Excel sheet later
export const defaultOtherCosts: OtherCostItem[] = [
  { id: 'labour', name: 'Labour', amount: 25000 },
  { id: 'transport', name: 'Transport', amount: 10000 },
  { id: 'other', name: 'Other', amount: 5000 },
];

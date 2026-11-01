export interface DistributionItem {
  id: string;
  name: string;
  shortName: string;
  ratingKw?: number;
  config?: string;
  description: string;
  price: number;
}

// Real ACDB & DCDB unit prices from Maharudra Solar invoice (INV-391)
export const acdbOptions: DistributionItem[] = [
  {
    id: 'acdb-20',
    name: 'ACDB With NVR 12-20kW (40Amp)',
    shortName: 'NVR 12-20kW (40Amp)',
    ratingKw: 20,
    description: '12–20 kW (40Amp) with NVR',
    price: 14245,
  },
  {
    id: 'acdb-30',
    name: 'ACDB With NVR 20-30kW (63Amp)',
    shortName: 'NVR 20-30kW (63Amp)',
    ratingKw: 30,
    description: '20–30 kW (63Amp) with NVR',
    price: 24530,
  },
];

export const dcdbOptions: DistributionItem[] = [
  {
    id: 'dcdb-3-3',
    name: 'DCDB 3 in 3 out',
    shortName: '3 in 3 out',
    config: '3 in 3 out',
    description: '3 in 3 out string protection',
    price: 6600,
  },
  {
    id: 'dcdb-4-4',
    name: 'DCDB 4 In 4 Out',
    shortName: '4 in 4 out',
    config: '4 in 4 out',
    description: '4 in 4 out string protection',
    price: 7650,
  },
];

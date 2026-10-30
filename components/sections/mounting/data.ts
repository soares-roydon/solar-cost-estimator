export interface MountingItem {
  id: string;
  material: string;
  qty: number;
  unitPrice: number;
}

export type MountingType = 'patra' | 'high-rise';

export const mountingTypeOptions = [
  { label: 'Patra', value: 'patra' },
  { label: 'High Rise', value: 'high-rise' },
];

// Dummy data with unit prices — will come from Excel sheet later
export const mountingMaterialsByType: Record<MountingType, MountingItem[]> = {
  patra: [
    { id: 'rail-mount', material: 'Rail mount', qty: 44, unitPrice: 350 },
    { id: 'mid-clamps', material: 'Mid clamps', qty: 36, unitPrice: 30 },
    { id: 'end-clamps', material: 'End clamps', qty: 8, unitPrice: 35 },
    { id: 'spring-nuts', material: 'Spring nuts', qty: 44, unitPrice: 9 },
    { id: 'allen-bolts', material: 'Allen bolts', qty: 44, unitPrice: 6 },
    { id: 'rivets', material: 'Rivets', qty: 176, unitPrice: 2 },
    { id: 'epdm-rubber', material: 'EPDM Rubber', qty: 176, unitPrice: 25 },
  ],
  'high-rise': [
    { id: 'mid-clamps', material: 'Mid clamps', qty: 36, unitPrice: 30 },
    { id: 'end-clamps', material: 'End clamps', qty: 8, unitPrice: 35 },
    { id: 'u-bolts', material: 'U-Bolts', qty: 44, unitPrice: 85 },
    { id: 'nuts', material: 'Nuts', qty: 88, unitPrice: 8 },
    { id: 'patti', material: 'Patti', qty: 55, unitPrice: 150 },
  ],
};

export function getMountingItems(
  type: MountingType,
  groups: number,
  panels: number = 20
): MountingItem[] {
  const baseItems = mountingMaterialsByType[type] ?? [];
  const safeGroups = Math.max(0, groups || 0);
  const safePanels = Math.max(0, panels || 0);

  // Base clamp formulas
  const endClampsQty = safeGroups * 4;
  const midClampsQty = Math.max(0, (safePanels - safeGroups) * 2);

  if (type === 'patra') {
    // Patra formulas:
    // Rail mounts = End clamps + mid clamps
    // Spring nuts = No of Rail mounts
    // Allen Bolts = No. of Rail Mounts
    // Rivets = Rail Mount times 4
    // EPDM Rubber = Rivets
    const railMountQty = endClampsQty + midClampsQty;
    const springNutsQty = railMountQty;
    const allenBoltsQty = railMountQty;
    const rivetsQty = railMountQty * 4;
    const epdmRubberQty = rivetsQty;

    const qtyMap: Record<string, number> = {
      'rail-mount': railMountQty,
      'mid-clamps': midClampsQty,
      'end-clamps': endClampsQty,
      'spring-nuts': springNutsQty,
      'allen-bolts': allenBoltsQty,
      rivets: rivetsQty,
      'epdm-rubber': epdmRubberQty,
    };

    return baseItems.map((item) => ({
      ...item,
      qty: qtyMap[item.id] ?? item.qty,
    }));
  }

  if (type === 'high-rise') {
    // High Rise formulas:
    // U-Bolts = End clamps + Mid clamps
    // Nuts = Ubolts times 2
    // Patti = No. of Ubolts times 1.25
    const uBoltsQty = endClampsQty + midClampsQty;
    const nutsQty = uBoltsQty * 2;
    const pattiQty = Math.ceil(uBoltsQty * 1.25);

    const qtyMap: Record<string, number> = {
      'mid-clamps': midClampsQty,
      'end-clamps': endClampsQty,
      'u-bolts': uBoltsQty,
      nuts: nutsQty,
      patti: pattiQty,
    };

    return baseItems.map((item) => ({
      ...item,
      qty: qtyMap[item.id] ?? item.qty,
    }));
  }

  return baseItems;
}

export const dcCableSizes = [
  { label: '4 sqmm', value: '4 sqmm' },
  { label: '6 sqmm', value: '6 sqmm' },
  { label: '10 sqmm', value: '10 sqmm' },
];

export const acCableSizes = [
  { label: '4 sqmm', value: '4 sqmm' },
  { label: '6 sqmm', value: '6 sqmm' },
  { label: '10 sqmm', value: '10 sqmm' },
  { label: '16 sqmm', value: '16 sqmm' },
];

export const laCableSizes = [
  { label: '6 sqmm', value: '6 sqmm' },
  { label: '10 sqmm', value: '10 sqmm' },
  { label: '16 sqmm', value: '16 sqmm' },
];

export const structureEarthingCableSizes = [
  { label: '10 sqmm', value: '10 sqmm' },
  { label: '16 sqmm', value: '16 sqmm' },
  { label: '25 sqmm', value: '25 sqmm' },
];

// DC Cable: Number of Strings
export const stringOptions = [
  { label: '1 String', value: '1' },
  { label: '2 Strings', value: '2' },
  { label: '3 Strings', value: '3' },
  { label: '4 Strings', value: '4' },
];

// AC Cable: Phase Type
export const phaseTypeOptions = [
  { label: 'Single Phase', value: '2' },
  { label: 'Three Phase', value: '4' },
];

/**
 * Generate inverter floor options dynamically based on number of floors.
 * e.g. for 3 floors → Ground, Floor 1, Floor 2, Floor 3
 */
export function getInverterFloorOptions(numberOfFloors: number) {
  const options = [{ label: 'Ground', value: '0' }];
  for (let i = 1; i <= numberOfFloors; i++) {
    options.push({ label: `Floor ${i}`, value: String(i) });
  }
  return options;
}

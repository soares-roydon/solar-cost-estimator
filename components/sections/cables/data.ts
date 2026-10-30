export type CableTab = 'all' | 'dc' | 'ac' | 'la' | 'structure';

export interface CableTabOption {
  id: CableTab;
  label: string;
}

export const cableTabs: CableTabOption[] = [
  { id: 'all', label: 'All Cables' },
  { id: 'dc', label: 'DC Cable' },
  { id: 'ac', label: 'AC Cable' },
  { id: 'la', label: 'LA Cable' },
  { id: 'structure', label: 'Structure Earthing Cable' },
];

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

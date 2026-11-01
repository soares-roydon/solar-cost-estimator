export * from './types';
export * from './utils/number-to-words';
export * from './utils/download';
export * from './generators/docx-generator';

import type { QuotationData } from './types';
import { generateQuotationDocx } from './generators/docx-generator';
import { downloadBlob } from './utils/download';

/**
 * Convenience helper to generate and trigger the download of a quotation DOCX file in one call.
 */
export async function downloadQuotationDocx(data: QuotationData, filename?: string): Promise<void> {
  const blob = await generateQuotationDocx(data);
  const name = filename || `Solar_Quotation_${data.system.plantCapacityKw.toFixed(1)}kW.docx`;
  downloadBlob(blob, name);
}

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ImageRun,
  Header,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  TabStopType,
  Tab,
} from 'docx';
import type { QuotationData } from '../types';
import { letterheadBase64 } from '../assets/letterhead-base64';
import { numberToWordsIndian } from '../utils/number-to-words';

const FONT_FAMILY = 'Cambria';
const DEFAULT_SIZE = 28; // 14pt (in half-points)
const TITLE_SIZE = 32; // 16pt

function formatInr(val: number): string {
  return Number(val || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatInrRounded(val: number): string {
  return Math.round(val || 0).toLocaleString('en-IN');
}

/**
 * Formats date to "DD MMMM YYYY" with leading zero for single-digit days (e.g. "01 November 2026").
 */
function formatDate(d?: string | Date): string {
  if (d instanceof Date) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleDateString('en-GB', { month: 'long' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }
  if (typeof d === 'string' && d.trim().length > 0) {
    const trimmed = d.trim();
    if (/^\d\s+[A-Za-z]+/.test(trimmed)) {
      return `0${trimmed}`;
    }
    if (/^\d{2}\s+[A-Za-z]+/.test(trimmed)) {
      return trimmed;
    }
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      const day = String(parsed.getDate()).padStart(2, '0');
      const month = parsed.toLocaleDateString('en-GB', { month: 'long' });
      const year = parsed.getFullYear();
      return `${day} ${month} ${year}`;
    }
    return trimmed;
  }
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleDateString('en-GB', { month: 'long' });
  const year = now.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Creates a single text run with Cambria font and default 14pt size.
 */
function createRun(text: string, bold = false, size = DEFAULT_SIZE, underline = false): TextRun {
  return new TextRun({
    text,
    font: FONT_FAMILY,
    size,
    bold,
    underline: underline ? {} : undefined,
  });
}

/**
 * Helper to emit a native tab character inside a TextRun (<w:r><w:tab/></w:r>).
 */
function tab(): TextRun {
  return new TextRun({ children: [new Tab()] });
}

/**
 * Helper to generate a blank line with standard 240 line spacing.
 */
function emptyLine(): Paragraph {
  return new Paragraph({
    spacing: { before: 0, after: 0, line: 240 },
    children: [createRun('')],
  });
}

/**
 * Generates a full Microsoft Word (.docx) document matching Quotation_Format.docx.
 */
export async function generateQuotationDocx(data: QuotationData): Promise<Blob> {
  const {
    client,
    system,
    commercials,
    scopeOfWork = [
      'Supply of solar panels & inverter',
      'Cable laying & termination',
      'Earthing & lightning protection',
      'Testing & commissioning',
      'Net metering and Subsidy assistance',
    ],
    warranty = {
      panelsWarrantyYears: 30,
      inverterWarrantyYears: 10,
    },
    bankDetails = {
      bankName: 'Union Bank Of India',
      branch: 'Vidyanagar,Margao- Goa,',
      accountNumber: '027921010000101',
      ifscCode: 'UBIN0902799',
      companyName: 'Sarah Solar Solutions',
      authorisedSignatoryTitle: 'Authorised Signatory',
    },
    termsAndConditions = 'Price quotes are firm & valid for 15 days from the date of offer.After this period a reconfirmation from our office should be taken.',
  } = data;

  const dateStr = formatDate(client.date);
  const words = commercials.amountInWords || numberToWordsIndian(commercials.totalSystemCost);

  // Default payment terms (75% / 20% / 5%)
  const totalCost = commercials.totalSystemCost;
  const paymentTerms = data.paymentTerms || [
    {
      stage: 'Advance with Purchase Order',
      percentage: 75,
      amount: Math.round(totalCost * 0.75 * 100) / 100,
    },
    {
      stage: 'Material Delivery',
      percentage: 20,
      amount: Math.round(totalCost * 0.2 * 100) / 100,
    },
    {
      stage: 'After Installation & Commissioning',
      percentage: 5,
      amount: Math.round(totalCost * 0.05 * 100) / 100,
    },
  ];

  // Decode letterhead banner image (19.05 cm x 6.33 cm)
  const imageBytes = Uint8Array.from(atob(letterheadBase64), (c) => c.charCodeAt(0));

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 11906, // A4 Width in dxa (210mm)
              height: 16838, // A4 Height in dxa (297mm)
            },
            margin: {
              top: 3900, // Leaves clearance for the letterhead header banner
              right: 576, // 0.4 in
              bottom: 720, // 0.5 in
              left: 576, // 0.4 in
              header: 140,
              footer: 708,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                spacing: { before: 0, after: 0, line: 240 },
                children: [
                  new ImageRun({
                    type: 'jpg',
                    data: imageBytes,
                    // Exactly 19.05 cm width (6,858,000 EMUs) x 6.33 cm height (2,278,800 EMUs)
                    transformation: {
                      width: 720,
                      height: (6.33 * 360000) / 9525,
                    },
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // 1. Document Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('QUOTATION', true, TITLE_SIZE)],
          }),
          emptyLine(),

          // 2. Date (Padded with leading zero for single-digit days, e.g. "01 November 2026")
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun(`Date:${dateStr}`, false)],
          }),

          // 3. Client Information
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('Name and Address of Client:', false)],
          }),
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun(client.name || 'Client', false)],
          }),
          ...(client.address
            ? [
                new Paragraph({
                  spacing: { before: 0, after: 0, line: 240 },
                  children: [createRun(client.address, false)],
                }),
              ]
            : []),
          emptyLine(),

          // 4. Salutation & Opening Statement
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('Dear Sir/Madam,', true)],
          }),
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun(
                'We are pleased to submit our quotation for supply, installation, testing & commissioning'
              ),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun(
                `of a ${system.plantCapacityKw.toFixed(2)} kW ${system.systemType} Rooftop Solar Power Plant with ${system.inverterCapacityKw}kw ${system.inverterBrand.toLowerCase()} Inverter.`
              ),
            ],
          }),
          emptyLine(),

          // 5. System Configuration
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('System Configuration', true)],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.LEFT, position: 3665 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('Description'), tab(), createRun('Specification')],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.LEFT, position: 3665 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun('Solar Plant Capacity'),
              tab(),
              createRun(`${system.plantCapacityKw.toFixed(2)} kW`),
            ],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.LEFT, position: 3665 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun('Solar Panel Type'),
              tab(),
              createRun(system.panelModel || `${system.panelBrand} Topcon`),
            ],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.LEFT, position: 3665 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun('Solar Panel Wattage'),
              tab(),
              createRun(`${system.panelWattage}W`),
            ],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.LEFT, position: 3665 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun('Number of Panels'),
              tab(),
              createRun(`${system.numberOfPanels} Nos.`),
            ],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.LEFT, position: 3665 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun('Inverter Capacity'),
              tab(),
              createRun(`${system.inverterCapacityKw} kW`),
            ],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.LEFT, position: 3665 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('Inverter Type'), tab(), createRun(system.inverterType)],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.LEFT, position: 3665 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('System Type'), tab(), createRun(system.systemType)],
          }),
          emptyLine(),

          // 6. Commercial Details
          new Paragraph({
            tabStops: [{ type: TabStopType.LEFT, position: 3260 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [tab(), createRun('Amount')],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: 4550 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun('System Cost'),
              tab(),
              createRun(formatInr(commercials.systemCost)),
            ],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: 4550 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun(
                commercials.gstRatePct ? `Tax GST ${commercials.gstRatePct.toFixed(2)}%` : 'Tax GST'
              ),
              tab(),
              createRun(formatInr(commercials.gstAmount), false, DEFAULT_SIZE, true),
            ],
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: 4550 }],
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun('Total System Cost:-'),
              tab(),
              createRun(formatInr(commercials.totalSystemCost)),
            ],
          }),
          ...(commercials.subsidyAmount && commercials.subsidyAmount > 0
            ? [
                new Paragraph({
                  tabStops: [{ type: TabStopType.RIGHT, position: 4550 }],
                  spacing: { before: 0, after: 0, line: 240 },
                  children: [
                    createRun('Subsidy'),
                    tab(),
                    createRun(formatInr(commercials.subsidyAmount), false, DEFAULT_SIZE, true),
                  ],
                }),
                new Paragraph({
                  tabStops: [{ type: TabStopType.RIGHT, position: 4550 }],
                  spacing: { before: 0, after: 0, line: 240 },
                  children: [
                    createRun('Total Effective Cost', true),
                    tab(),
                    createRun(
                      formatInr(
                        commercials.totalEffectiveCost ??
                          commercials.totalSystemCost - commercials.subsidyAmount
                      ),
                      true
                    ),
                  ],
                }),
              ]
            : []),
          emptyLine(),

          // 7. Total System Cost Highlight & Words
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun(
                `Total System Cost :- ${formatInrRounded(commercials.totalSystemCost)}`,
                true
              ),
            ],
          }),
          emptyLine(),
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun(`Amount In Words :-${words}`, true)],
          }),
          emptyLine(),

          // 8. Additional Fabrication Note (if applicable)
          ...(commercials.fabricationAdditional && commercials.fabricationAdditional > 0
            ? [
                new Paragraph({
                  spacing: { before: 0, after: 0, line: 240 },
                  children: [
                    createRun(
                      `Fabrication Additional  ${formatInr(commercials.fabricationAdditional)}`,
                      true
                    ),
                  ],
                }),
                new Paragraph({
                  spacing: { before: 0, after: 0, line: 240 },
                  children: [
                    createRun(
                      commercials.fabricationDescription ||
                        'Material,walkway,Paint ,Transport & Fabricator charges',
                      true
                    ),
                  ],
                }),
              ]
            : []),

          // 9. Scope of Work Included
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('Scope of Work Included:', true)],
          }),
          ...scopeOfWork.map(
            (item) =>
              new Paragraph({
                bullet: {
                  level: 0,
                },
                spacing: { before: 0, after: 0, line: 240 },
                children: [createRun(item)],
              })
          ),
          emptyLine(),

          // 10. Payment Terms (starts from new page)
          new Paragraph({
            pageBreakBefore: true,
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('Payment Terms', true)],
          }),
          new Paragraph({
            tabStops: [
              { type: TabStopType.LEFT, position: 432 },
              { type: TabStopType.CENTER, position: 5955 },
              { type: TabStopType.CENTER, position: 7760 },
            ],
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              tab(),
              createRun('Stage'),
              tab(),
              createRun('Payment'),
              tab(),
              createRun('Amount'),
            ],
          }),
          ...paymentTerms.map(
            (term) =>
              new Paragraph({
                bullet: {
                  level: 0,
                },
                tabStops: [
                  { type: TabStopType.CENTER, position: 5955 },
                  { type: TabStopType.CENTER, position: 7760 },
                ],
                spacing: { before: 0, after: 0, line: 240 },
                children: [
                  createRun(term.stage),
                  tab(),
                  createRun(`${term.percentage}%`),
                  tab(),
                  createRun(formatInr(term.amount)),
                ],
              })
          ),
          emptyLine(),

          // 11. Warranty Terms
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('Warranty Terms', true)],
          }),
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun(`Solar Panels: ${warranty.panelsWarrantyYears}Years Performance Warranty`),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [
              createRun(`Inverter: ${warranty.inverterWarrantyYears} Years Manufacturer Warranty`),
            ],
          }),
          emptyLine(),

          // 12. Terms & Conditions
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun('Terms & Conditions:-', false)],
          }),
          new Paragraph({
            spacing: { before: 0, after: 0, line: 240 },
            children: [createRun(termsAndConditions, false)],
          }),
          emptyLine(),

          // 13. Bank Details & Signature Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: 'auto' },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: 'auto' },
              left: { style: BorderStyle.SINGLE, size: 4, color: 'auto' },
              right: { style: BorderStyle.SINGLE, size: 4, color: 'auto' },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'auto' },
              insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'auto' },
            },
            rows: [
              new TableRow({
                children: [
                  // Left Cell: Bank Details
                  new TableCell({
                    width: { size: 5860, type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 0, line: 240 },
                        children: [createRun('Our Bank Details:', true)],
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0, line: 240 },
                        children: [createRun(bankDetails.bankName)],
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0, line: 240 },
                        children: [createRun(bankDetails.branch)],
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0, line: 240 },
                        children: [createRun(`A/c No :- ${bankDetails.accountNumber}`)],
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0, line: 240 },
                        children: [createRun(`IFSC Code :- ${bankDetails.ifscCode}`)],
                      }),
                    ],
                  }),
                  // Right Cell: Company Signatory
                  new TableCell({
                    width: { size: 4940, type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 0, line: 240 },
                        children: [createRun(`For ${bankDetails.companyName}`, true)],
                      }),
                      emptyLine(),
                      emptyLine(),
                      emptyLine(),
                      new Paragraph({
                        spacing: { before: 0, after: 0, line: 240 },
                        children: [createRun(bankDetails.authorisedSignatoryTitle, true)],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

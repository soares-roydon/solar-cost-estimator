'use client';

import { useMemo } from 'react';
import {
  defaultMaterialSummary,
  defaultOtherCostSummary,
  GST_RATE,
  type MaterialCosts,
  type OtherCostsBreakdown,
} from '@/components/sections/cost-summary/data';

export type { MaterialCosts, OtherCostsBreakdown };

interface Props {
  materialCosts?: Partial<MaterialCosts>;
  otherCosts?: Partial<OtherCostsBreakdown>;
}

const CostSummary = ({ materialCosts, otherCosts }: Props) => {
  const materialItems = useMemo(
    () =>
      defaultMaterialSummary.map((item) => ({
        id: item.id,
        category: item.category,
        total: materialCosts?.[item.key] ?? item.total,
      })),
    [materialCosts]
  );

  const activeOtherCosts = useMemo(
    () => ({
      labour: otherCosts?.labour ?? defaultOtherCostSummary.labour,
      transport: otherCosts?.transport ?? defaultOtherCostSummary.transport,
      other: otherCosts?.other ?? defaultOtherCostSummary.other,
    }),
    [otherCosts]
  );

  const materialTotal = materialItems.reduce((sum, item) => sum + item.total, 0);
  const otherCostsSum =
    activeOtherCosts.labour + activeOtherCosts.transport + activeOtherCosts.other;

  const projectCost = materialTotal + otherCostsSum;
  const gstAmount = Math.round(projectCost * GST_RATE);
  const finalCost = projectCost + gstAmount;

  const barStyle =
    'flex items-center justify-between rounded bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-900';

  return (
    <section className="rounded border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <svg
          className="h-4 w-4 text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <h2 className="text-sm font-semibold">Material Cost Summary</h2>
      </div>

      <div className="flex flex-col gap-3">
        {/* 1. Category Header Bar */}
        <div className={barStyle}>
          <span>Category</span>
          <span>Total (₹)</span>
        </div>

        {/* Material Items List */}
        <div className="flex flex-col divide-y divide-gray-100 text-xs">
          {materialItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-3 py-1.5 text-gray-700"
            >
              <span>{item.category}</span>
              <span className="text-gray-900">{item.total.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>

        {/* 2. Material Cost Subtotal Bar */}
        <div className={barStyle}>
          <span>Material Cost</span>
          <span>{materialTotal.toLocaleString('en-IN')}</span>
        </div>

        {/* Other Costs List */}
        <div className="flex flex-col divide-y divide-gray-100 text-xs">
          <div className="flex items-center justify-between px-3 py-1.5 text-gray-700">
            <span>Labour</span>
            <span>{activeOtherCosts.labour.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-1.5 text-gray-700">
            <span>Transport</span>
            <span>{activeOtherCosts.transport.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-1.5 text-gray-700">
            <span>Other</span>
            <span>{activeOtherCosts.other.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* 3. Project Cost Subtotal Bar */}
        <div className={barStyle}>
          <span>Project Cost</span>
          <span>{projectCost.toLocaleString('en-IN')}</span>
        </div>

        {/* GST Addition */}
        <div className="flex items-center justify-between px-3 py-1 text-xs text-gray-700">
          <span>GST (18%)</span>
          <span>{gstAmount.toLocaleString('en-IN')}</span>
        </div>

        {/* Final Cost Banner */}
        <div className="mt-1 flex items-center justify-between rounded bg-blue-950 p-4 text-white">
          <span className="text-sm font-semibold">Final Cost</span>
          <span className="text-xl font-bold">₹ {finalCost.toLocaleString('en-IN')}</span>
        </div>

        {/* Disclaimer Note */}
        <div className="flex items-start gap-2.5 rounded border border-gray-200 bg-gray-50 p-3 text-xs text-gray-600">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>
            Final cost may vary based on actual site conditions, brand selection and market rates.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-green-800"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export Quotation</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-50"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>Save Project</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CostSummary;

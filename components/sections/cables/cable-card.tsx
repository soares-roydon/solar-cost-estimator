import { type ReactNode } from 'react';

interface CableCardProps {
  title: string;
  totalLabel: string;
  totalValue: string;
  children: ReactNode;
}

export const CableCard = ({ title, totalLabel, totalValue, children }: CableCardProps) => {
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <h3 className="text-xs font-semibold text-gray-800">{title}</h3>
      </div>

      {/* Inputs Form */}
      <div className="flex flex-1 flex-col justify-start gap-2.5 p-4 text-xs">{children}</div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-gray-800">{totalLabel}</span>
          <span className="font-semibold text-gray-900">{totalValue}</span>
        </div>
      </div>
    </div>
  );
};

interface CableRowProps {
  label: ReactNode;
  children: ReactNode;
}

export const CableRow = ({ label, children }: CableRowProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      {typeof label === 'string' ? <span className="text-gray-600">{label}</span> : label}
      {children}
    </div>
  );
};

interface CableDistanceDisplayProps {
  distance: number;
}

export const CableDistanceDisplay = ({ distance }: CableDistanceDisplayProps) => {
  return (
    <div className="flex h-8 w-[110px] items-center justify-end rounded border border-gray-200 bg-gray-50 px-2.5 text-xs font-medium text-gray-800">
      {distance} m
    </div>
  );
};

// Unified size classes for all inputs in the cables section
export const cableSelectClass = 'h-8 w-[110px] pl-2 pr-6 text-xs';
export const cableNumberInputClass = 'h-8 w-[110px] px-2.5 py-1 text-right text-xs';

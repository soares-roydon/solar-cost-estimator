'use client';

import { useState } from 'react';
import { cableTabs, type CableTab } from '@/components/sections/cables/data';
import DcCableCalculator from '@/components/sections/cables/dc-cable-calculator';
import AcCableCalculator from '@/components/sections/cables/ac-cable-calculator';
import LaCableCalculator from '@/components/sections/cables/la-cable-calculator';
import StructureEarthingCalculator from '@/components/sections/cables/structure-earthing-calculator';

const Cables = () => {
  const [activeTab, setActiveTab] = useState<CableTab>('all');

  const showDc = activeTab === 'all' || activeTab === 'dc';
  const showAc = activeTab === 'all' || activeTab === 'ac';
  const showLa = activeTab === 'all' || activeTab === 'la';
  const showStructure = activeTab === 'all' || activeTab === 'structure';

  return (
    <section className="rounded border border-gray-200 p-5">
      <h2 className="mb-4 text-sm font-semibold">5. Cables</h2>

      <div className="flex flex-col gap-4">
        {/* Cable Tabs */}
        <div className="flex flex-wrap gap-2">
          {cableTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-950 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Calculators Grid */}
        <div
          className={`grid gap-4 ${
            activeTab === 'all' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {showDc && <DcCableCalculator />}
          {showAc && <AcCableCalculator />}
          {showLa && <LaCableCalculator />}
          {showStructure && <StructureEarthingCalculator />}
        </div>
      </div>
    </section>
  );
};

export default Cables;

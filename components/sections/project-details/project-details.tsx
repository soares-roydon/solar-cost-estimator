'use client';

import { useState } from 'react';
import TextInput from '@/components/ui/text-input';
import Select from '@/components/ui/select';
import { floorOptions, type FloorCableDistance } from '@/components/sections/project-details/data';
import FloorCableDistances from '@/components/sections/project-details/floor-cable-distances';

interface Props {
  numberOfFloors: string;
  onNumberOfFloorsChange: (value: string) => void;
  floorDistances: FloorCableDistance[];
  onUpdateDistance: (index: number, field: 'distance' | 'extraCable', value: number) => void;
}

const ProjectDetails = ({
  numberOfFloors,
  onNumberOfFloorsChange,
  floorDistances,
  onUpdateDistance,
}: Props) => {
  const [projectName, setProjectName] = useState('3 Floor Residence');
  const [showDistances, setShowDistances] = useState(false);

  return (
    <section className="rounded border border-gray-200 p-5">
      <h2 className="mb-4 text-sm font-semibold">1. Project Details</h2>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInput label="Project Name" value={projectName} onChange={setProjectName} />
          <Select
            label="Number of Floors"
            value={numberOfFloors}
            onChange={onNumberOfFloorsChange}
            options={floorOptions}
          />
        </div>

        {/* Collapsible Floor Cable Distances */}
        <button
          type="button"
          onClick={() => setShowDistances(!showDistances)}
          className="mt-2 flex items-center gap-1.5 self-start text-xs text-gray-500 hover:text-gray-700"
        >
          <svg
            className={`h-3 w-3 transition-transform ${showDistances ? 'rotate-90' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          Floor Cable Distances
        </button>

        {showDistances && (
          <FloorCableDistances
            floorDistances={floorDistances}
            onUpdateDistance={onUpdateDistance}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;

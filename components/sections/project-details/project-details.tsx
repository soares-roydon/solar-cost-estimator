'use client';

import { useState, useMemo } from 'react';
import TextInput from '@/components/ui/text-input';
import Select from '@/components/ui/select';
import {
  generateFloorDistances,
  floorOptions,
  type FloorCableDistance,
} from '@/components/sections/project-details/data';
import FloorCableDistances from '@/components/sections/project-details/floor-cable-distances';

const ProjectDetails = () => {
  const [projectName, setProjectName] = useState('3 Floor Residence');
  const [numberOfFloors, setNumberOfFloors] = useState('3');
  const [floorDistances, setFloorDistances] = useState<FloorCableDistance[]>(
    generateFloorDistances(3)
  );

  // Auto-calculated plant capacity (dummy — will come from panels later)
  const plantCapacity = 11.0;

  const handleFloorsChange = (value: string) => {
    setNumberOfFloors(value);
    setFloorDistances(generateFloorDistances(Number(value)));
  };

  const updateDistance = (index: number, field: 'distance' | 'extraCable', value: number) => {
    setFloorDistances((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const totalDistance = useMemo(
    () => floorDistances.reduce((sum, row) => sum + row.distance, 0),
    [floorDistances]
  );

  const totalExtraCable = useMemo(
    () => floorDistances.reduce((sum, row) => sum + row.extraCable, 0),
    [floorDistances]
  );

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      {/* Project Details card */}
      <section className="flex-1 rounded border border-gray-200 p-5">
        <h2 className="mb-4 text-sm font-semibold">2. Project Details</h2>

        <div className="flex flex-col gap-3">
          <TextInput label="Project Name" value={projectName} onChange={setProjectName} />

          <div className="flex gap-4">
            <div className="flex-1">
              <Select
                label="Number of Floors"
                value={numberOfFloors}
                onChange={handleFloorsChange}
                options={floorOptions}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-xs text-gray-500">Plant Capacity (kW)</span>
              <span className="rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm">
                {plantCapacity.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">(Auto calculated from panels)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Cable Distances card */}
      <FloorCableDistances
        floorDistances={floorDistances}
        onUpdateDistance={updateDistance}
        totalDistance={totalDistance}
        totalExtraCable={totalExtraCable}
      />
    </div>
  );
};

export default ProjectDetails;

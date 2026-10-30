import type { FloorCableDistance } from '@/components/sections/project-details/data';
import NumberInput from '@/components/ui/number-input';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface Props {
  floorDistances: FloorCableDistance[];
  onUpdateDistance: (index: number, field: 'distance' | 'extraCable', value: number) => void;
  totalDistance: number;
  totalExtraCable: number;
}

const FloorCableDistances = ({
  floorDistances,
  onUpdateDistance,
  totalDistance,
  totalExtraCable,
}: Props) => {
  return (
    <section className="flex-1 rounded border border-gray-200 p-5">
      <h3 className="mb-4 text-sm font-semibold">Floor Cable Distances (m)</h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>From → To</TableHead>
            <TableHead>Distance (m)</TableHead>
            <TableHead>Extra Cable (m)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {floorDistances.map((row, index) => (
            <TableRow key={row.label}>
              <TableCell className="text-gray-700">{row.label}</TableCell>
              <TableCell>
                <NumberInput
                  min={0}
                  value={row.distance}
                  onChange={(val) => onUpdateDistance(index, 'distance', val)}
                  className="w-16 px-2 py-1"
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  min={0}
                  value={row.extraCable}
                  onChange={(val) => onUpdateDistance(index, 'extraCable', val)}
                  className="w-16 px-2 py-1"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="border-none">
            <TableCell className="pt-3">Total Vertical Distance</TableCell>
            <TableCell className="pt-3">{totalDistance}</TableCell>
            <TableCell className="pt-3">
              <span className="text-gray-500">Extra Total</span> {totalExtraCable}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
};

export default FloorCableDistances;

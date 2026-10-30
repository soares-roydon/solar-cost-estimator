import InverterArrangement from '@/components/sections/inverter-arrangement/arrangement';
import ProjectDetails from '@/components/sections/project-details/project-details';
import Panels from '@/components/sections/panels/panels';
import Mounting from '@/components/sections/mounting/mounting';
import Cables from '@/components/sections/cables/cables';
import AcdbDcdb from '@/components/sections/acdb-dcdb/acdb-dcdb';
import Walkway from '@/components/sections/walkway/walkway';
import Piping from '@/components/sections/piping/piping';
import Hardware from '@/components/sections/hardware/hardware';

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl space-y-4 p-6">
      <InverterArrangement />
      <ProjectDetails />
      <Panels />
      <Mounting />
      <Cables />
      <AcdbDcdb />
      <Walkway />
      <Piping />
      <Hardware />
    </main>
  );
}

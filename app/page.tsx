import InverterArrangement from '@/components/sections/inverter-arrangement/arrangement';
import ProjectDetails from '@/components/sections/project-details/project-details';
import Panels from '@/components/sections/panels/panels';

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl space-y-4 p-6">
      <InverterArrangement />
      <ProjectDetails />
      <Panels />
    </main>
  );
}

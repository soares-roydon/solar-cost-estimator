import InverterArrangement from '@/components/sections/inverter-arrangement/arrangement';
import ProjectDetails from '@/components/sections/project-details/project-details';
import Panels from '@/components/sections/panels/panels';
import Mounting from '@/components/sections/mounting/mounting';
import Cables from '@/components/sections/cables/cables';
import AcdbDcdb from '@/components/sections/acdb-dcdb/acdb-dcdb';
import Walkway from '@/components/sections/walkway/walkway';
import Piping from '@/components/sections/piping/piping';
import Hardware from '@/components/sections/hardware/hardware';
import OtherCosts from '@/components/sections/other-costs/other-costs';
import CostSummary from '@/components/sections/cost-summary/cost-summary';

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left Column: Form & Material Sections (1 to 10) */}
        <div className="min-w-0 flex-1 space-y-4">
          <InverterArrangement />
          <ProjectDetails />
          <Panels />
          <Mounting />
          <Cables />
          <AcdbDcdb />
          <Walkway />
          <Piping />
          <Hardware />
          <OtherCosts />
        </div>

        {/* Right Column: Material Cost Summary Sidebar (11) */}
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-80 xl:w-96">
          <CostSummary />
        </aside>
      </div>
    </main>
  );
}

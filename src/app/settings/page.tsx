import SelectLanguage from "@/components/SelectLanguage";
import TrashScheduler from "@/components/TrashScheduler";
import SimulatorForPointsFrReduceCO2 from "@/components/SimulatorForPointsFrReduceCO2";


export const runtime = 'edge';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TrashScheduler />
      <SelectLanguage />
      <SimulatorForPointsFrReduceCO2 />
    </main>
  );
}

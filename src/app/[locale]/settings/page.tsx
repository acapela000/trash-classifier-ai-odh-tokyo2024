import SelectLanguage from "@/components/SelectLanguage";
import SimulatorForPointsFrReduceCO2 from "@/components/SimulatorForPointsFrReduceCO2";
import AccordionComponent from "@/components/AccordionComponent";


export const runtime = 'edge';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col top-0 left-0 p-8">
      <SelectLanguage />
      <SimulatorForPointsFrReduceCO2 />
      <AccordionComponent />
    </main>
  );
}

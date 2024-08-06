import TrashScheduler from "@/components/TrashScheduler";
import Image from "next/image";
// import DocumentScan from '../actions/Document-scan';


export const runtime = 'edge';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TrashScheduler />
    </main>
  );
}

import TrashScheduler from "@/components/TrashScheduler";
import { allSchedules } from "@/actions/FetchDb";

export const runtime = 'edge';

export default async function Home() {
  const result = await allSchedules();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 pt-6">
      <TrashScheduler data={result} />
    </main>
  );
}

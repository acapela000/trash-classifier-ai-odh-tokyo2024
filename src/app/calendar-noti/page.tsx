import TrashScheduler from "@/components/TrashScheduler";


export const runtime = 'edge';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 pt-8">
      <TrashScheduler />
    </main>
  );
}

import DrawOnMap from "@/components/DrawOnMap";


export const runtime = 'edge';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 pt-8">
      <DrawOnMap lat={36.1037824} long={136.2952192} />
    </main>
  );
}

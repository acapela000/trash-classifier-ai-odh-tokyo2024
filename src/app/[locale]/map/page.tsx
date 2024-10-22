import MapWrapper from '@/components/MapWrapper';
// import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export default function Home() {
  // const { cf } = getRequestContext();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between px-8 pt-8'>
      <MapWrapper />
      {/* <MapWrapper cf={cf} /> */}
    </main>
  );
}

import { CameraCapture } from '@/components/CameraCapture';
import RecyclingHints from '@/components/RecyclingHints';

export const runtime = 'edge';

export default async function Home() {

  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <head>
        <link
          rel="icon"
          href="/icon-gen-2.png"
          type="image/svg+xml"
          sizes="200px"
        />
      </head>
      <div className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
          <section className='min-h-[100vh]'>
            <CameraCapture />
          </section>
          <RecyclingHints hints={[]} />
        </div>
      </div>
    </main>
  );
}

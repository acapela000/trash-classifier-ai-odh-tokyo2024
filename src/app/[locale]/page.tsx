import { CameraCapture } from '@/components/CameraCapture';
import RecyclingHints from '@/components/RecyclingHints';
// import ThumbnailVideoSlide_Swiper from '@/components/ThumbnailVideoSlide_Swiper';

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
      <div className="w-full flex min-h-screen flex-col items-center justify-center md:p-8 md:p-24 md:pl-8 md:pr-8">
        <div className='z-10 w-full max-w-5xl text-center items-center justify-center text-lg'>
          <p className='text-center text-lg'>Welcome to Trash classifier with AI!</p>
        </div>
        <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
          <section className='w-full min-h-[100vh]'>
            <CameraCapture />
          </section>
        </div>
        <div>
          <section className='z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex md:pt-4 md:pb-8'>
            <RecyclingHints hints={[]} />
          </section>
        </div>
      </div>
    </main>
  );
}

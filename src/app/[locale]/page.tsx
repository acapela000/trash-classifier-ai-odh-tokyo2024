import { CameraCapture } from '@/components/CameraCapture';
import RecyclingHints from '@/components/RecyclingHints';
// import ThumbnailVideoSlide_Swiper from '@/components/ThumbnailVideoSlide_Swiper';

export const runtime = 'edge';

export default async function Home() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center'>
      <head>
        <link
          rel='icon'
          href='/icon-gen-2.png'
          type='image/svg+xml'
          sizes='200px'
        />
      </head>
      <div className='flex min-h-screen w-full flex-col items-center justify-center md:p-24 md:p-8 md:pl-8 md:pr-8'>
        <div className='z-10 w-full max-w-5xl items-center justify-center text-center text-lg'>
          <p className='text-center text-lg'>
            Welcome to Trash classifier with AI!
          </p>
        </div>
        <div className='z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex'>
          <section className='min-h-[100vh] w-full'>
            <CameraCapture />
          </section>
        </div>
        <div>
          <section className='z-10 w-full max-w-5xl items-center justify-between text-sm md:pb-8 md:pt-4 lg:flex'>
            <RecyclingHints hints={[]} />
          </section>
        </div>
      </div>
    </main>
  );
}

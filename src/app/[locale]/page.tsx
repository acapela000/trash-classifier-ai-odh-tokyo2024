import { CameraCapture } from '@/components/CameraCapture';
import RecyclingHints from '@/components/RecyclingHints';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

export const runtime = 'edge';

export default async function Home() {
  const t = useTranslations('Metadata');

  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
          <section className='min-h-[100vh]'>
            {t('home')}
            <CameraCapture />
          </section>
          <RecyclingHints hints={[]} />
        </div>
      </div>
    </main>
  );
}

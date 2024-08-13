import FormInputZipcode from '@/components/FormInputZipcode';
import { CameraCapture } from './../components/CameraCapture';


import { getRequestContext } from '@cloudflare/next-on-pages';


export const runtime = 'edge';

export default function Home() {

  // const { cf } = getRequestContext();

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-gray-100">


      <div className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <FormInputZipcode />
          <CameraCapture />
        </div>
      </div>
    </main>
  );
}

import FormInputZipcode from '@/components/FormInputZipcode';
import { CameraCapture } from './../components/CameraCapture';
import { callJpPostApi } from "@/actions/JpPostApi";


export const runtime = 'edge';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <FormInputZipcode />
        <CameraCapture />
      </div>
    </main>
  );
}

import Image from "next/image";
// import DocumentScan from '../actions/Document-scan';
import { CameraCapture } from './../components/CameraCapture';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            href="D:\Projects\tokyo-hackathon-ai-2024\src\app\libs\Document-scan.tsx"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <CameraCapture />
        </div>
      </div>
    </main>
  );
}

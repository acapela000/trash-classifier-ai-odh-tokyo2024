'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Video } from '@splidejs/splide-extension-video';

interface Hint {
  id: string;
  text: string;
  videoId: string;
}

// base on the prediction result from trash classifier, give the end user suitable hints for recycles
export default function RecyclingHints({ hints }: { hints: Hint[] }) {
  const [showAll, setShowAll] = useState(false);

  const displayedHints = showAll ? hints : hints.slice(0, 3);

  const r = useTranslations('RecyclingHints');
  // Example usage with dummy data
  const exampleHints: Hint[] = [
    { id: '1', text: r('hint1'), videoId: '4hS30hvWZX0?si=JG7r4c7kSEKGLP8S' },
    { id: '2', text: r('hint2'), videoId: 'y256XPTUZUs?si=xU7Zs6cRxtdAwOeY' },
    { id: '3', text: r('hint3'), videoId: 'pPAkASbpDrA?si=usI0T23WIIqVwGpE' },
    { id: '4', text: r('hint4'), videoId: '' },
    { id: '5', text: r('hint5'), videoId: '' },
  ];

  const App: React.FC = () => (
    <div>
      {exampleHints.map((hint) => (
        <p key={hint.id} className='md:pb-4 md:pt-4'>
          {hint.text}
          {hint.videoId && (
            <iframe
              width='320'
              height='192'
              src={`https://www.youtube.com/embed/${hint.videoId}`}
              frameBorder='5px'
              allow="accelerometer; autoplay; playinline; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; referrerpolicy='strict-origin-when-cross-origin' allowfullscreen allowTransparency"
              allowFullScreen
            ></iframe>
          )}
        </p>
      ))}
    </div>
  );

  // use the dummy data to show the hints
  return (
    <div className='flex w-full max-w-4xl flex-col md:pb-8'>
      <h2 className='text-2xl font-bold'>{r('recyclingHints')}</h2>
      <ul className='list-disc pl-8'>
        {displayedHints.map((hint) => (
          <li key={hint.id} className='text-lg'>
            {hint.text}
            {hint.videoId && (
              <iframe
                width='320'
                height='192'
                src={`https://www.youtube.com/embed/${hint.videoId}`}
                frameBorder='0'
                allow="accelerometer; autoplay; playinline; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; referrerpolicy='strict-origin-when-cross-origin' allowfullscreen allowTransparency"
                allowFullScreen
              ></iframe>
            )}
          </li>
        ))}
      </ul>
      {hints.length > 3 && (
        <button
          className='text-blue-500 underline'
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show less' : 'Show more'}
        </button>
      )}
      <div>
        <App />
      </div>
    </div>
  );
}

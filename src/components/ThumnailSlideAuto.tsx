import { div } from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';

const thumnailImgList = [
  // <img src="/thumnail-page.png" alt="thumnail image" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />,
  <img
    key='1'
    src='/trash-disposal-img/japanese-recycling-symbol.jpg'
    alt='recycling-symbol'
    className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
  />,
  <img
    key='2'
    src='/trash-disposal-img/petbottle.jpg'
    alt='petbottle-disposal'
    className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
  />,
  // <img key="3" src="/trash-disposal-img/glass-disposal.jpg" alt="glass-disposal" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />,
  <img
    key='4'
    src='/trash-disposal-img/paper.jpg'
    alt='papertype-disposal'
    className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
  />,
  <img
    key='5'
    src='/trash-disposal-img/danger.jpg'
    alt='danger-disposal'
    className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
  />,
  // <img key="6" src="/trash-disposal-img/trash-disposal.jpeg" alt="trash-disposal" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />
];

export default function ThumbnailSlideAuto() {
  //create function that ontouch the image will be stop
  const [isSliding, setIsSliding] = useState(true);
  const handleTouchStart = () => {
    setIsSliding(false); //stop the sliding when touch starts
  };

  const handleTouchedEnd = () => {
    setIsSliding(true); //start the sliding when touch ends
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleImgClick = (index: number) => {
    console.log(`Image ${index} is clicked`);
    setIsSliding(false);
    setIsSliding(true); //start the sliding when touch ends
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchedEnd}>
      {!isMobile && isSliding ? (
        // For PC
        <div className="relative m-auto h-48 w-full overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
          <div className='flex w-[calc(250px*10)] animate-infinite-slider'>
            {thumnailImgList.map((thumbImg, index) => (
              <div
                className='slide flex w-[360px] items-center justify-between'
                key={index}
                // style={{ animation: 'fadeIn 1s' }}
                onClick={() => handleImgClick(index)}
              >
                {thumbImg}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // For mobile
        //if the touch is started, the sliding will be stop
        //the image will be stop at the current image
        <div className='flex w-full grid-flow-row gap-3'>
          {thumnailImgList.map((thumbImg, index) => (
            <div
              className='slide flex w-[800px] items-center justify-between'
              key={index}
              // style={{ animation: 'fadeIn 1s' }}
              onClick={() => handleImgClick(index)}
            >
              {thumbImg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

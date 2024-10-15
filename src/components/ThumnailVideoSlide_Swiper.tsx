import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/virtual';
import { useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';

const thumnailImgList = [
  <img
    key='6'
    src='/thumnail-page.png'
    alt='thumnail image'
    className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
  />,
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
  // <img key="3" src="/trash-disposal-img/glass-disposal.jpg" alt="glass-disposal" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />,
  // <img key="6" src="/trash-disposal-img/trash-disposal.jpeg" alt="trash-disposal" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />
];

export default function ThumbnailVideoSlide_Swiper() {
  const slides = Array.from({ length: 1000 }).map(
    (el, index) => `Slide ${index + 1}`
  );
  const slideContent: JSX.Element[] = [];

  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        '--progress',
        String(1 - progress)
      );
      console.log(
        progressCircle.current.style.setProperty(
          '--progress',
          String(1 - progress)
        )
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

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
      {/* {!isMobile && isSliding ? ( */}
      <Swiper
        spaceBetween={30}
        modules={[Autoplay, Pagination]}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        <SwiperSlide className='h-[192px] w-[320px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'>
          {/* <video src="/mao-slide.mp4" autoPlay playsInline loop className=' w-[320px] h-[192px]'></video> */}
          {/* <iframe width="320" height="192" src="https://www.youtube.com/embed/ih-mLtdK__o?si=q0WDY2h1BJHmWIiJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; playinline; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen allowTransparency></iframe> */}
          {/* {thumnailImgList.map((thumbImg, index) => (
                        <div
                            className="slide flex w-[360px] items-center justify-between"
                            key={index}
                            // style={{ animation: 'fadeIn 1s' }}
                            onClick={() => handleImgClick(index)}
                        >
                            {thumbImg}
                        </div>
                    ))} */}
        </SwiperSlide>
        <SwiperSlide className='h-[192px] w-[320px] rounded-t-lg'>
          <img
            key='6'
            src='/thumnail-page.png'
            alt='thumnail image'
            className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
          />
        </SwiperSlide>
        <SwiperSlide className='h-[192px] w-[320px] rounded-t-lg'>
          <img
            key='1'
            src='/trash-disposal-img/japanese-recycling-symbol.jpg'
            alt='recycling-symbol'
            className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
          />
        </SwiperSlide>
        <SwiperSlide className='h-[192px] w-[320px] rounded-t-lg'>
          <img
            key='2'
            src='/trash-disposal-img/petbottle.jpg'
            alt='petbottle-disposal'
            className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
          />
        </SwiperSlide>
        <SwiperSlide className='h-[192px] w-[320px] rounded-t-lg'>
          <img
            key='4'
            src='/trash-disposal-img/paper.jpg'
            alt='papertype-disposal'
            className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
          />
        </SwiperSlide>
        <SwiperSlide className='h-[192px] w-[320px] rounded-t-lg'>
          <img
            key='5'
            src='/trash-disposal-img/danger.jpg'
            alt='danger-disposal'
            className='h-[192px] w-[350px] items-center justify-between rounded-t-lg md:pl-2 md:pr-2'
          />
        </SwiperSlide>
        <div className='autoplay-progress' slot='container-end'>
          <svg viewBox='0 0 48 48' ref={progressCircle}>
            <circle cx='24' cy='24' r='15'></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
        <div className='swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal !-bottom-6'>
          <span
            className='swiper-pagination-bullet swiper-pagination-bullet-active h-[10px] w-[10px] md:pb-4 md:pt-4'
            role='button'
            aria-label='Go to slide 1'
            aria-current='true'
          ></span>
          <span
            className='swiper-pagination-bullet swiper-pagination-bullet-active h-[10px] w-[10px]'
            role='button'
            aria-label='Go to slide 1'
            aria-current='true'
          ></span>
        </div>
      </Swiper>
      {/* ) : (
                // For mobile
                //if the touch is started, the sliding will be stop
                //the image will be stop at the current image
                <div className="w-full flex grid-flow-row gap-3">
                    {thumnailImgList.map((thumbImg, index) => (
                        <div
                            className="slide flex w-[800px] items-center justify-between"
                            key={index}
                            // style={{ animation: 'fadeIn 1s' }}
                            onClick={() => handleImgClick(index)}
                        >
                            {thumbImg}
                        </div>
                    ))}
                </div>
            )} */}
    </div>
  );
}


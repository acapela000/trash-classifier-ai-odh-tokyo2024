import { div } from "@tensorflow/tfjs"
import { useState, useEffect } from "react";

const thumnailImgList = [
    // <img src="/thumnail-page.png" alt="thumnail image" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />,
    <img src="/trash-disposal-img/japanese-recycling-symbol.jpg" alt="recycling-symbol" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />,
    <img src="/trash-disposal-img/petbottle-disposal.jpeg" alt="petbottle-disposal" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />,
    <img src="/trash-disposal-img/glass-disposal.jpg" alt="glass-disposal" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />,
    <img src="/trash-disposal-img/papertype-disposal.jpeg" alt="papertype-disposal" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />,
    <img src="/trash-disposal-img/danger-disposal.jpg" alt="danger-disposal" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />,
    <img src="/trash-disposal-img/trash-disposal.jpeg" alt="trash-disposal" className='rounded-t-lg w-[350px] h-[192px] justify-between items-center md:pl-2 md:pr-2' />
]

export default function ThumbnailSlideAuto() {
    //create function that ontouch the image will be stop
    const [isSliding, setIsSliding] = useState(true);
    const handleTouchStart = () => {
        setIsSliding(false); //stop the sliding when touch starts
    };

    const handleTouchedEnd = () => {
        setIsSliding(true); //start the sliding when touch ends
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchedEnd}>

            {isSliding ? (
                <div className="relative m-auto w-full h-48 gap-3 overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
                    <div className="animate-infinite-slider flex w-[calc(250px*10)] grid-flow-row gap-3">
                        {thumnailImgList.map((thumbImg, index) => (
                            <div
                                className="slide flex w-[360px] items-center justify-between"
                                key={index}
                            >
                                {thumbImg}
                            </div>
                        ))}
                        {thumnailImgList.map((thumbImg, index) => (
                            <div
                                className="slide flex w-[360px] items-center justify-between"
                                key={index}
                            >
                                {thumbImg}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                //if the touch is started, the sliding will be stop
                //the image will be stop at the current image
                <div className="flex w-[360px] grid-flow-row gap-3">
                    {thumnailImgList.map((thumbImg, index) => (
                        <div
                            className="slide flex w-[800px] items-center justify-between"
                            key={index}
                        >
                            {thumbImg}
                        </div>
                    ))}
                    {thumnailImgList.map((thumbImg, index) => (
                        <div
                            className="slide flex w-[800px] items-center justify-between"
                            key={index}
                        >
                            {thumbImg}
                        </div>
                    ))}

                </div>
            )};
        </div>
    );
}
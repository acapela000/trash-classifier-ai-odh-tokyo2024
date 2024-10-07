import { Video } from '@splidejs/splide-extension-video';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';
// import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/dist/css/themes/splide-default.min.css';
import { Splide } from '@splidejs/splide';

// Add the following line to install the type declaration files
// npm install --save-dev @types/splidejs__react-splide

// export default function ThumbnailVideoSlide() {
//     return (
//         <Splide>
//             <SplideSlide>
//                 <img src="image1.jpg" alt="Image 1" />
//             </SplideSlide>
//             <SplideSlide>
//                 <img src="image2.jpg" alt="Image 2" />
//             </SplideSlide>
//         </Splide>
//     );
// }

export default function ThumbnailVideoSlide() {
    // new Splide('.splide').mount({ Video });
    const splide = new Splide('.splide', {
        heightRatio: 0.5625,
        cover: false,
        video: {
            loop: true,
        },
    });
    // splide.mount(Video);

    return (
        <></>
        // <div className="splide">
        //     <div className="splide__track">
        //         <ul className="splide__list md:w-4 md:h-4 md:pb-3">
        //             <li className="splide__slide" data-splide-html-video="/mao-slide.mp4">
        //                 <video controls autoPlay loop muted>
        //                     <source src="/mao-slide.mp4" type="video/mp4" />
        //                 </video>
        //                 {/* <img src="/thumnail-page.png"></img> */}
        //             </li>
        //             <li className="splide__slide" data-splide-html-video="/mao-slide.mp4">
        //                 <video controls autoPlay loop muted>
        //                     <source src="/mao-slide.mp4" type="video/mp4" />
        //                 </video>
        //             </li>
        //             <li className="splide__slide" data-splide-html-video="/mao-slide.mp4">
        //                 <video controls autoPlay loop muted>
        //                     <source src="/mao-slide.mp4" type="video/mp4" />
        //                 </video>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
        // <Splide aria-label="My Favorite Images">
        //     <SplideSlide>
        //         <img src="image1.jpg" alt="Image 1" />
        //     </SplideSlide>
        //     <SplideSlide>
        //         <img src="image2.jpg" alt="Image 2" />
        //     </SplideSlide>
        // </Splide>
    );
}

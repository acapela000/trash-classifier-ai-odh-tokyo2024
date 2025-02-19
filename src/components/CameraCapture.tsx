'use client';
import React, { useState } from 'react';
import { detectObjectApi } from '@/actions/DetectObjectApi';
import { useEffect } from 'react';
import { Prediction } from '@/actions/DetectObjectApi';
import { CameraIcon, FolderOpenIcon } from '@heroicons/react/20/solid';
import FileUploadButton from './FileUploadBtn';
//import ClassifierModelCNN from './ClassifierModelCNN';
import ClassifierModelYOLO from './ClassifierModelYOLO';
import { useTranslations } from 'next-intl';
import ThumnailSlideAuto from './ThumnailSlideAuto';
import ThumnailVideoSlide_Swiper from './ThumnailVideoSlide_Swiper';
import * as onnx from 'onnxjs';
import { image } from '@tensorflow/tfjs';

type Props = {};

export function CameraCapture(props: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [session, setSession] = useState<onnx.InferenceSession | null>(null);
  const c = useTranslations('CameraCapture');

  useEffect(() => {
    // Only load the ONNX model if we're on the client side
    if (typeof window !== 'undefined') {
      /**
       * Loads the ONNX model for object detection. This function is
       * called once when the component mounts, and it will be called
       * again if the component is re-rendered.
       *
       * @returns {Promise<void>}
       */
      const loadModel = async () => {
        const session = new onnx.InferenceSession();
        try {
          // Make sure the model path is correct
          await session.loadModel('/yoloDetection-tjs/model.json');
          // await session.loadModel('/onnx/best.onnx');
          setSession(session);
        } catch (error) {
          console.error('Failed to load ONNX model:', error);
        }
      };
      loadModel();
    }
  }, []);

  // access camera and capture image from computer's camera
  const captureFromCamera = async () => {
    if (typeof window !== 'undefined') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (ctx) {
          video.srcObject = stream;
          /**
           * Event handler for when the video metadata has loaded.
           * This function starts video playback, sets the canvas dimensions to match the video,
           * and processes video frames to capture image data. The captured image data is then
           * preprocessed and passed to the ONNX model for predictions. The predictions are
           * updated in the component's state. The frame processing is done recursively via
           * requestAnimationFrame to continuously process the video stream.
           * @function
           * @param {MediaStreamEvent} event - The event object passed from the video element's
           *                                    loadedmetadata event.
           * @returns {void}
           */
          video.onloadedmetadata = () => {
            video.play();
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const processFrame = () => {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              );

              // Preprocess the image data and run the model
              if (session) {
                const inputTensor = new onnx.Tensor(
                  new Float32Array(imageData.data),
                  'float32',
                  [1, 3, canvas.height, canvas.width]
                );
                session.run([inputTensor]).then((output) => {
                  const predictions = output.values().next().value.data;
                  setPredictions(predictions);
                });
              }

              requestAnimationFrame(processFrame);
            };

            processFrame();
            // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            // const image = canvas.toDataURL("image/jpeg");
            // setImage(image);
            // video.pause();
            // video.srcObject = null;
            // stream.getTracks().forEach((track) => track.stop());
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  };

  // convert file to <img> tag
  const fileToImage = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  // Upload video file and convert it to <video> tag
  const fileToVideo = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read video file'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const isMobile =
    typeof window !== 'undefined' &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    // Modify the input tag to both can upload images from phone's gallery and take a picture from camera
    <div>
      {loading ? (
        <div>Loading...</div> // replace this with your loading spinner
      ) : (
        <>
          <div className='mt-8 w-full max-w-sm rounded-lg bg-white shadow-md md:p-4'>
            <div className='relative h-48 w-full'>
              {image ? (
                <img
                  src={image ?? '/thumnail-page.png'}
                  alt='Take Photo'
                  className={`${
                    image ? 'object-scale-down' : 'object-cover'
                  } h-full w-full rounded-t-lg`}
                  width='320'
                  height='192'
                  style={{ aspectRatio: '320/192' }}
                />
              ) : (
                <ThumnailVideoSlide_Swiper />
              )}
            </div>
            <div className='p-2 md:p-4'>
              <h2 className='items-center text-center text-xl font-bold'>
                {c('take-upload')}
              </h2>
              <p className='mt-2 items-center text-center text-gray-600'>
                {c('takePhoto')}
              </p>
              <div className='mt-4 flex items-center justify-center space-x-4'>
                {!isMobile && (
                  <>
                    <button
                      className='justify-center rounded-lg bg-teal-200 p-2 text-white hover:bg-teal-400'
                      onClick={captureFromCamera}
                    >
                      <CameraIcon className='h-[50px] w-[60px]' />
                    </button>
                  </>
                )}
                <FileUploadButton
                  className={`${!isMobile ? 'flex justify-center' : ''} bg-green-300 hover:bg-green-500`}
                  accept='image/*,video/*'
                  isMobile={isMobile}
                  // onUpload={(imgs: File[]) => fileToImage(imgs[0]).then((i: string) => setImage(i))}
                  onUpload={(files: File[]) => {
                    const file = files[0];
                    if (file.type.startsWith('image/')) {
                      fileToImage(file).then((i: string) => setImage(i));
                    } else if (file.type.startsWith('video/')) {
                      fileToVideo(file).then((v: string) => setVideo(v));
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <p></p>

          {predictions.map((prediction: Prediction, index: number) => (
            <div key={index}>
              <p>Class: {prediction.class}</p>
              <p>Confidence: {prediction.confidence}</p>
            </div>
          ))}

          {image && <ClassifierModelYOLO imgSrc={image} />}
          {video && (
            <video controls>
              <source src={video} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}
    </div>
  );
}

export default CameraCapture;

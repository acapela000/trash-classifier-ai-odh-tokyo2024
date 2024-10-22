'use client';
import React, { useState } from "react";
import { detectObjectApi } from "@/actions/DetectObjectApi";
import { useEffect } from "react";
import { Prediction } from "@/actions/DetectObjectApi";
import { CameraIcon, FolderOpenIcon } from "@heroicons/react/20/solid";
import FileUploadButton from "./FileUploadBtn";
import ClassifierModelCNN from "./ClassifierModelCNN";
import { useTranslations } from "next-intl";
import ThumnailSlideAuto from "./ThumnailSlideAuto";
import ThumnailVideoSlide_Swiper from "./ThumnailVideoSlide_Swiper";
import * as onnx from 'onnxjs';
import { image } from "@tensorflow/tfjs";


type Props = {
}

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
            const loadModel = async () => {
                const session = new onnx.InferenceSession();
                try {
                    // Make sure the model path is correct
                    await session.loadModel('/yoloDetection-tjs/model.json');
                    setSession(session);
                } catch (error) {
                    console.error("Failed to load ONNX model:", error);
                }
            };
            loadModel();
        }
    }, [])

    // access camera and capture image from computer's camera
    const captureFromCamera = async () => {
        if (typeof window !== 'undefined') {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const video = document.createElement("video");
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (ctx) {
                    video.srcObject = stream;
                    video.onloadedmetadata = () => {
                        video.play();
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;

                        const processFrame = () => {
                            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                            // Preprocess the image data and run the model
                            if (session) {
                                const inputTensor = new onnx.Tensor(new Float32Array(imageData.data), 'float32', [1, 3, canvas.height, canvas.width]);
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
                console.error("Error accessing camera:", error);
            }
        };
    }

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
                    reject(new Error("Failed to read video file"));
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        // Modify the input tag to both can upload images from phone's gallery and take a picture from camera
        <div>
            {loading ? (
                <div>Loading...</div> // replace this with your loading spinner
            ) : (
                <>
                    <div className="w-full max-w-sm md:p-4 mt-8 bg-white rounded-lg shadow-md">
                        <div className="relative w-full h-48">
                            {image ? (
                                <img
                                    src={image ?? "/thumnail-page.png"}
                                    alt="Take Photo"
                                    className={`${image ? "object-scale-down" : "object-cover"
                                        } w-full h-full rounded-t-lg`}
                                    width="320"
                                    height="192"
                                    style={{ aspectRatio: "320/192" }}
                                />
                            ) : (
                                <ThumnailVideoSlide_Swiper />
                            )}
                        </div>
                        <div className="md:p-4 p-2">
                            <h2 className="text-xl font-bold text-center items-center">{c('take-upload')}</h2>
                            <p className="mt-2 text-gray-600 text-center items-center">
                                {c('takePhoto')}
                            </p>
                            <div className="flex items-center justify-center mt-4 space-x-4">
                                {!isMobile && (
                                    <><button
                                        className="justify-center p-2 text-white bg-teal-200 hover:bg-teal-400 rounded-lg"
                                        onClick={captureFromCamera}
                                    >
                                        <CameraIcon className="w-[60px] h-[50px]" />
                                    </button></>)
                                }
                                <FileUploadButton
                                    className={`${!isMobile ? "flex justify-center" : ""} bg-green-300 hover:bg-green-500`}
                                    accept="image/*,video/*"
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
                    <p>

                    </p>

                    {predictions.map((prediction: Prediction, index: number) => (
                        <div key={index}>
                            <p>Class: {prediction.class}</p>
                            <p>Confidence: {prediction.confidence}</p>
                        </div>
                    ))}

                    {image && <ClassifierModelCNN imgSrc={image} />}
                    {video && (
                        <video controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </>
            )}
        </div>
    );
}

export default CameraCapture;

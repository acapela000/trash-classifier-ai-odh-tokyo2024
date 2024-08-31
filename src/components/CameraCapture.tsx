'use client';
import React, { useState } from "react";
import { detectObjectApi } from "@/actions/DetectObjectApi";
import { useEffect } from "react";
import { Prediction } from "@/actions/DetectObjectApi";
import { CameraIcon, FolderOpenIcon } from "@heroicons/react/20/solid";
import FileUploadButton from "./FileUploadBtn";
import ClassifierModels from "./ClassifierModels";
import { useTranslations } from "next-intl";

type Props = {
}

export function CameraCapture(props: Props) {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const c = useTranslations('CameraCapture');

    // access camera and capture image from computer's camera
    const captureFromCamera = async () => {
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
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const image = canvas.toDataURL("image/jpeg");
                    setImage(image);
                    video.pause();
                    video.srcObject = null;
                    stream.getTracks().forEach((track) => track.stop());
                };
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
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

    // call API with detectObjectApi, pass image as a params and store the result in Prediction, everything will be inside of useEffect
    // useEffect(() => {
    //     if (image) {
    //         detectObjectApi(image)
    //             .then((response: any) => {
    //                 setPredictions(response.predictions);
    //             })
    //             .catch((error: any) => {
    //                 console.error(error);
    //             });
    //     }
    // }, [image]);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        // Modify the input tag to both can upload images from phone's gallery and take a picture from camera
        <div>
            {loading ? (
                <div>Loading...</div> // replace this with your loading spinner
            ) : (
                <>
                    <div className="w-full max-w-sm md:p-4 mt-8 bg-white rounded-lg shadow-md">
                        <div className="relative w-full h-48">
                            <img
                                src={image ?? "/thumnail-page.png"}
                                alt="Take Photo"
                                className={`${image ? "object-scale-down" : "object-cover"
                                    } w-full h-full rounded-t-lg`}
                                width="320"
                                height="192"
                                style={{ aspectRatio: "320/192" }}
                            />
                        </div>
                        <div className="md:p-4 p-2">
                            <h2 className="text-xl font-bold">{c('take-upload')}</h2>
                            <p className="mt-2 text-gray-600">
                                {c('takePhoto')}
                            </p>
                            <div className="flex items-center justify-center mt-4 space-x-4">
                                {!isMobile && (
                                    <><button
                                        className="justify-center p-2 text-white bg-green-400 hover:bg-green-600 rounded-md"
                                        onClick={captureFromCamera}
                                    >
                                        <CameraIcon className="w-[50px] h-[50px]" />
                                    </button></>)
                                }
                                <FileUploadButton
                                    className={`${!isMobile ? "flex justify-center" : ""} bg-green-300 hover:bg-green-500`}
                                    accept="image/*"
                                    isMobile={isMobile}
                                    onUpload={(imgs: any) => fileToImage(imgs[0]).then((i: any) => setImage(i))}
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

                    {image && <ClassifierModels imgSrc={image} />}
                </>
            )}
        </div>
    );
}

export default CameraCapture;

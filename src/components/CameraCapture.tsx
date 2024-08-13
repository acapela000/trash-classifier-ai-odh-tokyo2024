"use client";
import React, { useRef, useState, useMemo } from "react";
import { detectObjectApi } from "@/actions/DetectObjectApi";
import { useEffect } from "react";
import { Prediction } from "@/actions/DetectObjectApi";
import { CameraIcon } from "@heroicons/react/20/solid";
import FileUploadButton from "./FileUploadBtn";

export function CameraCapture() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    const captureImage = async () => {
        const imageInput = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;
        if (imageInput.files && imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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
    useEffect(() => {
        if (image) {
            detectObjectApi(image)
                .then((response: any) => {
                    setPredictions(response.predictions);
                })
                .catch((error: any) => {
                    console.error(error);
                });
        }
    }, [image]);

    const handleImageChange = React.useCallback((e: any) => {
        // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // Get the file
        const file = e.target.files && e.target.files[0];

        if (file) {
            setLoading(true);
            // Validate file type
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

            if (!validImageTypes.includes(file.type)) {
                alert("Invalid file type. Please select a gif, jpeg, or png file.");
                return;
            }

            // Validate file size (less than 10MB)
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                alert("File size is too large. Please select a file less than 2MB.");
                return;
            }

            // Resize the image
            const image = new Image();
            const reader = new FileReader();
            reader.onloadend = () => {
                image.src = reader.result as string;
            };
            reader.readAsDataURL(file);

            image.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = 500;
                let width = image.width;
                let height = image.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx!.drawImage(image, 0, 0, width, height);
                const newImage = canvas.toDataURL("image/jpeg", 0.8);
                setImage(newImage);
                setLoading(false);
                // // Read the file
                // const reader = new FileReader();
                // reader.onloadend = () => {
                //     setImage(reader.result as string);
                // };
                // reader.readAsDataURL(file);

                // Create form data to send file
                const data = new FormData();
                data.append("file", file);
            };
        }
    }, []);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (context) {
                const img = new Image();
                img.src = image;
                img.onload = () => {
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                    // Assuming `predictions` is the array of Prediction objects
                    predictions.forEach((prediction: Prediction) => {
                        const { top, left, width, height } = prediction.bounding_box;
                        context.beginPath();
                        context.rect(left, top, width, height);
                        context.lineWidth = 10;
                        context.strokeStyle = "red";
                        context.stroke();
                    });
                };
            }
        }
    }, [image, predictions]);

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
                        <div className="md:p-4">
                            <h2 className="text-xl font-bold">Take a photo</h2>
                            <p className="mt-2 text-gray-600">
                                Take a picture of an item to learn how to recycle it.
                            </p>
                            <div className="flex items-center mt-4 space-x-4">
                                {!isMobile && (
                                    <><button
                                        className="justify-center p-2 text-white bg-green-400 hover:bg-green-600 rounded-md"
                                        onClick={captureFromCamera}
                                    >
                                        <CameraIcon className="w-12 h-12" />
                                    </button></>)
                                }
                                <FileUploadButton
                                    className={`${!isMobile ? "flex justify-center" : ""} bg-green-400 hover:bg-green-600`}
                                    accept="image/*"
                                    onUpload={(imgs: any) => fileToImage(imgs[0]).then((i: any) => setImage(i))}
                                />
                            </div>
                        </div>
                    </div>
                    {predictions.map((prediction: Prediction, index: number) => (
                        <div key={index}>
                            <p>Class: {prediction.class}</p>
                            <p>Confidence: {prediction.confidence}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default CameraCapture;

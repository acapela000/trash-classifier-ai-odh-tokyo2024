"use client"
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { detectObjectApi } from '@/actions/DetectObjectApi';
import { useEffect } from 'react';
import { Prediction } from '@/actions/DetectObjectApi';

export function CameraCapture() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // const captureImage = async () => {
    //     const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    //     if (imageInput.files && imageInput.files.length > 0) {
    //         const file = imageInput.files[0];
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setImage(e.target?.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Get the file
        const file = e.target.files && e.target.files[0];

        if (file) {
            setLoading(true);
            // Validate file type
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

            if (!validImageTypes.includes(file.type)) {
                alert('Invalid file type. Please select a gif, jpeg, or png file.');
                return;
            }

            // Validate file size (less than 10MB)
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                alert('File size is too large. Please select a file less than 2MB.');
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
                const canvas = document.createElement('canvas');
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
                const ctx = canvas.getContext('2d');
                ctx!.drawImage(image, 0, 0, width, height);
                const newImage = canvas.toDataURL('image/jpeg', 0.8);
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
                data.append('file', file);

                // Upload file and processing bar
                axios.post('/upload', data, {
                    onUploadProgress: (progressEvent: any) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    },
                })
                    .then((response: any) => {
                        const predictions = response.data.predictions;
                        predictions.forEach((prediction: Prediction) => {
                            console.log(prediction);
                        });
                    })
                    .catch((error: any) => {
                        console.log(error.message);
                    })
                    .finally(() => {
                        setLoading(false);
                    });


                const canvasRef = useRef<HTMLCanvasElement>(null);

                useEffect(() => {
                    if (image && canvasRef.current) {
                        const canvas = canvasRef.current;
                        const context = canvas.getContext('2d');
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
                                    context.lineWidth = 2;
                                    context.strokeStyle = 'red';
                                    context.stroke();
                                });
                            };
                        }
                    }
                }, [image, predictions]);
            };
        }
    };

    return (
        // Modify the input tag to both can upload images from phone's gallery and take a picture from camera
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {image && (
                        <img src={image} alt="Captured Image" />
                    )}
                    <input type="file" alt="Upload picture" accept="image/*" onChange={handleImageChange} />
                    <progress value={uploadProgress} max="100" />
                </>
            )}
        </>
    );
}

export default CameraCapture;
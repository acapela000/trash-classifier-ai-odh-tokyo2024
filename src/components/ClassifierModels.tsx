'use client'
import React, { useState, useEffect } from "react";
// import json file
import * as tmImage from '@teachablemachine/image';
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

export function ClassifierModels() {
    // the link to your model provided by Teachable Machine export panel
    const URL = "./tm-my-image-model";

    const [model, setModel] = useState();
    const [labelContainer, setLabelContainer] = useState();
    const [maxPredictions, setMaxPredictions] = useState();

    // Load the image model and setup the webcam
    useEffect(() => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    }, []);


    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }

    return (
        <div>
            <div id="webcam-container"></div>
            <div id="label-container"></div>
        </div>
    );
}

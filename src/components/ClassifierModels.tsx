'use client'
import React, { useEffect } from "react";
import * as tmImage from '@teachablemachine/image';
import { CircularProgress } from '@nextui-org/react';


type Props = {
    img: any,
}
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
export default function ClassifierModels(props: Props) {
    const [model, setModel] = React.useState<any>();
    const [prediction, setPrediction] = React.useState<any>();

    // Load the model when the component mounts
    useEffect(() => {
        const runPrediction = async (m: any) => {
            const pred = await m.predict(props.img)

            setPrediction(pred)
        }

        const loadModel = async () => {
            const loadedModel: any = await tmImage.load('/tm-my-image-model/model.json', '/tm-my-image-model/metadata.json');
            setModel(loadedModel);

            runPrediction(loadedModel);
        };

        if (!model) {
            loadModel();
        } else {
            runPrediction(model);
        }
    }, [props.img, model]);

    return (
        <div className="flex gap-3">
            {prediction && (
                prediction.map((key: any, i: any) => (
                    <div key={i} className="text-center">
                        {key.className} <CircularProgress
                            aria-label="Loading..."
                            size="lg"
                            value={key.probability * 100}
                            color={
                                (() => {
                                    switch (key.className) {
                                        case 'Can':
                                            return 'warning';
                                        case 'Carton':
                                        case 'Paper':
                                        case 'Petbottle':
                                            return 'success';
                                        case 'Glass':
                                        case 'Plastic':
                                            return 'danger';
                                        default:
                                            return 'secondary';
                                    }
                                })()
                            }
                            showValueLabel={true}
                        />
                    </div>
                ))
            )}
        </div>
    );
}

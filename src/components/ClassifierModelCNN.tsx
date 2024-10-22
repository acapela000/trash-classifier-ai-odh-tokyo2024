'use client';
import React, { useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import { CircularProgress, Spinner } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

type Props = {
  // img: any,
  imgSrc: string;
};
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
export default function ClassifierModelCNN(props: Props) {
  // const img = props.img;
  const [model, setModel] = React.useState<any>();
  const [prediction, setPrediction] = React.useState<any>();

  // Load the model when the component mounts
  useEffect(() => {
    function runPrediction(m: any) {
      setPrediction(undefined);
      const img = new Image();
      img.onload = async () => {
        const pred = await m.predict(img);
        setPrediction(pred);
      };
      img.src = props.imgSrc;
    }

    const loadModel = async () => {
      const loadedModel: any = await tmImage.load(
        '/tm-my-image-model-v1.2/model.json',
        '/tm-my-image-model-v1.2/metadata.json'
      );
      setModel(loadedModel);

      runPrediction(loadedModel);
    };

    if (!model) {
      loadModel();
    } else {
      runPrediction(model);
    }
  }, [props.imgSrc, model]);

  const cm = useTranslations('ClassifierModels');

  return (
    <section className='mt-4 w-full rounded-lg bg-white p-2 shadow-md'>
      <h3 className='text-xl font-bold'>{cm('classifier')}</h3>
      <section className='mt-4 grid grid-cols-3 items-center justify-center gap-3'>
        {prediction ? (
          prediction.map((key: any, i: any) => (
            <div key={i} className='text-center'>
              {cm(key.className as string)}{' '}
              <CircularProgress
                aria-label='Loading...'
                size='lg'
                classNames={{
                  svg: 'w-24 h-24',
                  value: 'text-2xl font-semibold',
                }}
                value={key.probability * 100}
                color={(() => {
                  switch (key.className) {
                    case 'can':
                      return 'primary';
                    case 'carton-paper':
                      return 'warning';
                    case 'petbottle':
                      return 'success';
                    case 'glass':
                      return 'danger';
                    case 'plastic':
                      return 'secondary';
                    case 'raw-trash':
                      return 'secondary';
                    default:
                      return 'secondary';
                  }
                })()}
                showValueLabel={true}
              />
            </div>
          ))
        ) : (
          <Spinner color='success' size='lg' />
        )}
      </section>
    </section>
  );
}

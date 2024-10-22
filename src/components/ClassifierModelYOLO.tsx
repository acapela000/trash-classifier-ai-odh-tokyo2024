'use-client';
import React, { useEffect, useRef, useState } from 'react';
import * as ort from 'onnxruntime-web';

type Props = {
  imgSrc: string;
};

export default function ClassifierModelYOLO(props: Props) {
  const [model, setModel] = useState<ort.InferenceSession | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Load the YOLO model when the component mounts
    const loadModel = async () => {
      try {
        const session = await ort.InferenceSession.create('/onnx/best.onnx');
        setModel(session);
      } catch (error) {
        console.error('Failed to load the model', error);
      }
    };

    loadModel();
  }, []);

  const runPrediction = React.useCallback(() => {
    if (model && props.imgSrc) {
      const runPrediction = async () => {
        setPrediction(null);
        const img = new Image();
        img.onload = async () => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          const inputWidth = 640; // YOLO model input width
          const inputHeight = 640; // YOLO model input height

          if (canvas && ctx) {
            // Resize the canvas to the input size of the YOLO model
            canvas.width = inputWidth;
            canvas.height = inputHeight;

            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0, inputWidth, inputHeight);

            // Get the image data from the canvas
            const imageData = ctx.getImageData(0, 0, inputWidth, inputHeight);

            // Normalize the pixel values to [0, 1]
            const inputTensor = new Float32Array(inputWidth * inputHeight * 3);
            for (let i = 0; i < inputWidth * inputHeight; i++) {
              inputTensor[i * 3] = imageData.data[i * 4] / 255; // R
              inputTensor[i * 3 + 1] = imageData.data[i * 4 + 1] / 255; // G
              inputTensor[i * 3 + 2] = imageData.data[i * 4 + 2] / 255; // B
            }

            // Create the input tensor for the model
            const tensor = new ort.Tensor('float32', inputTensor, [
              1,
              3,
              inputHeight,
              inputWidth,
            ]);

            // Run the model
            const feeds = { images: tensor };
            const results = await model.run(feeds);
            console.log(results);
            setPrediction(results);

            // Draw bounding boxes on the canvas
            drawBoundingBoxes(ctx, results);
          }
        };
        img.src = props.imgSrc;
      };

      runPrediction();
    }
  }, [model, props.imgSrc]);

  const drawBoundingBoxes = (ctx: CanvasRenderingContext2D, results: any) => {
    // Assuming results contain bounding boxes in the format [x, y, width, height, confidence, class]
    const boxes = results.boxes; // Adjust this based on your model's output format

    if (!boxes || boxes.length === 0) {
      console.warn('No bounding boxes found in the results');
      return;
    }

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.font = '12px Arial';
    ctx.fillStyle = 'red';

    boxes.forEach((box: any) => {
      const [x, y, width, height, confidence, classId] = box;
      console.log(
        `Drawing box: [${x}, ${y}, ${width}, ${height}] with confidence ${confidence} and class ${classId}`
      );
      ctx.strokeRect(x, y, width, height);
      ctx.fillText(
        `Class: ${classId}, Conf: ${confidence.toFixed(2)}`,
        x,
        y - 5
      );
    });
  };
  console.log(prediction);
  return (
    <div>
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
      {prediction ? (
        <div>
          <h3>Predictions:</h3>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading model or making prediction...</p>
      )}
    </div>
  );
}

import * as tf from '@tensorflow/tfjs';

// Load the model and labels
async function loadModel() {
  const model = await tf.loadLayersModel('D:\Download\tm-my-image-model'); // Replace with the path to your model.json
  const labelsResponse = await fetch('path/to/labels.txt'); // Replace with the path to your labels.txt
  const labels = await labelsResponse.text();
  const labelsArray = labels.split('\n');
  return { model, labelsArray };
}

// Load and preprocess the image
async function loadImage(imagePath: string) {
  const img = new Image();
  img.src = imagePath;
  await img.decode(); // Ensure the image is loaded before processing

  // Convert the image to a tensor
  const imgTensor = tf.browser.fromPixels(img);
  const resizedImg = tf.image.resizeBilinear(imgTensor, [224, 224]); // Adjust size to match your model's input
  const normalizedImg = resizedImg.div(255.0).expandDims(0); // Normalize and add batch dimension

  imgTensor.dispose(); // Clean up the original image tensor
  resizedImg.dispose();

  return normalizedImg;
}

// Make a prediction using the model
async function predictImage(imagePath: string) {
  const { model, labelsArray } = await loadModel();
  const inputTensor = await loadImage(imagePath);

  const prediction = model.predict(inputTensor) as tf.Tensor;
  const predictedIndex = prediction.argMax(1).dataSync()[0];

  console.log('Prediction:', labelsArray[predictedIndex]);

  inputTensor.dispose(); // Clean up the input tensor
  prediction.dispose();
}

// Run the prediction
predictImage('path/to/your/image.jpg').catch(console.error); // Replace with the path to your image

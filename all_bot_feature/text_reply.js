import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { readFile } from 'fs/promises';

const train = JSON.parse(await readFile(new URL('./assets/train.json',import.meta.url)));
const test = JSON.parse(await readFile(new URL('./assets/test.json',import.meta.url)));

export default class ReplyMSg {
  constructor(msg){
    this.msg = msg;
    run();
  }
}

const encodeData = data => {
  const sentences = data.map(comment => comment.text.toLowerCase());
  try{
    const trainingData = use.load()
      .then(model => {
          return model.embed(sentences)
              .then(embeddings => {
                  return embeddings;
              });
      })
      .catch(err => console.error('Fit Error:', err));
  }
  catch (err){
    console.log(`error is ${err}`);
  }
  
  return trainingData;
};

const outputData = tf.tensor2d(train.map(value => [
  value.intent === 'buy' ? 1 : 0,
  value.intent === 'none' ? 1 : 0,
]));

const model = tf.sequential();

// Add layers to the model
model.add(tf.layers.dense({
    inputShape: [512],
    activation: 'sigmoid',
    units: 2,
}));

model.add(tf.layers.dense({
    inputShape: [2],
    activation: 'sigmoid',
    units: 2,
}));

model.add(tf.layers.dense({ 
    inputShape: [2],
    activation: 'sigmoid',
    units: 2,
}));

// Compile the model
model.compile({
    loss: 'meanSquaredError',
    optimizer: tf.train.adam(.06), // This is a standard compile config
});

function run() {
  Promise.all([
      encodeData(train),
      encodeData(test)
  ])
  .then(data => {
      const {
          0: training_data,
          1: testing_data,
      } = data;

      model.fit(training_data, outputData, { epochs: 200 })
          .then(history => {
              model.predict(testing_data).print();
          });
  })
  .catch(err => console.log('Prom Err:', err));
};

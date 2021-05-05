import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';

import comments from './assets/train.json';
import comment_testing from './assets/test.json';

module.exports = {
  name: "reply",
  bot_command: [], //This command in bot
  cooldown: 0,
  description: "auto reply",
  reply(msg, isActive) {
    if (isActive) {
      //do something
    }
  },
};

const encodeData = data => {
  const sentences = data.map(comment => comment.text.toLowerCase());
  const trainingData = use.load()
      .then(model => {
          return model.embed(sentences)
              .then(embeddings => {
                  return embeddings;
              });
      })
      .catch(err => console.error('Fit Error:', err));

  return trainingData
};

const outputData = tf.tensor2d(comments.map(comment => [
  comment.intent === 'buy' ? 1 : 0,
  comment.intent === 'none' ? 1 : 0,
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


import Fasttext from 'fasttext.js';
// import { readFile } from 'fs/promises';
// const data = JSON.parse(await readFile(new URL('./assets/data.json',import.meta.url)));
var MODELS_ROOT = __dirname + '/models';
var DATASET_ROOT = __dirname + '/datasets';

var TRAINFILE = process.env.TRAINFILE || DATASET_ROOT + '/dataset.tsv'
var SERIALIZETO = process.env.SERIALIZETO || MODELS_ROOT + '/first_model' // do not specify ext: 'bin' will be added

const fastText = new Fasttext({
  debug: true,
  train: {
    // number of concurrent threads
    thread: 8,
    // verbosity level [2]
    verbose: 4,
    // number of negatives sampled [5]
    neg: 5,
    // loss function {ns, hs, softmax} [ns]
    loss: process.env.TRAIN_LOSS || 'ns',
    // learning rate [0.05]
    lr: process.env.TRAIN_LR || 0.01,
    // change the rate of updates for the learning rate [100]
    lrUpdateRate: 100,
    // max length of word ngram [1]
    wordNgrams: process.env.TRAIN_NGRAM || 1,
    // minimal number of word occurences
    minCount: 1,
    // minimal number of word occurences
    minCountLabel: 1,
    // size of word vectors [100]
    dim: process.env.TRAIN_DIM || 100,
    // size of the context window [5]
    ws: process.env.TRAIN_WS || 5,
    //  number of epochs [5]
    epoch: process.env.TRAIN_EPOCH || 20,
    // number of buckets [2000000]
    bucket: process.env.TRAIN_BUCKET || 2000000,
    // min length of char ngram [3]
    minn: process.env.TRAIN_MINN || 2,
    // max length of char ngram [6]
    maxn: process.env.TRAIN_MAXN || 4,
    // sampling threshold [0.0001]
    t: 0.0001,
    pretrainedVectors: process.env.WORD2VEC || ''
  },
  serializeTo: SERIALIZETO,
  trainFile: TRAINFILE,
  trainCallback: function (res) {
    console.log("\t" + JSON.stringify(res));
  }
});
fastText.train()
  .then(done => {
    console.log("train done.");
  })
  .catch(error => {
    console.error(error);
  });

export default class ReplyMSg {
  constructor(msg) {
    this.msg = msg;
  }
}
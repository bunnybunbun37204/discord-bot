import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';

import comments from './assets/train.json';
import comment_testing from './assets/test.json';
const tf = require('@tensorflow/tfjs');
const tf_node = require('@tensorflow/tfjs-node');

export default class ReplyMSg {
  constructor(msg){
    this.msg = msg;
    console.log('import reply class');
  }
}
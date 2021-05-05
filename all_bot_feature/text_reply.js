import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { readFile } from 'fs/promises';

const train = JSON.parse(await readFile(new URL('./assets/train.json',import.meta.url)));
const test = JSON.parse(await readFile(new URL('./assets/test.json',import.meta.url)));

export default class ReplyMSg {
  constructor(msg){
    this.msg = msg;
    console.log('import reply class');
  }
}
import { readFile } from 'fs/promises';
import Classifier from 'ml-classify-text'
const classify = new Classifier();
const data = JSON.parse(await readFile(new URL('./assets/data.json',import.meta.url)));

export default class ReplyMSg {
  constructor(msg){
    this.msg = msg;
    console.log(data);
  }
}
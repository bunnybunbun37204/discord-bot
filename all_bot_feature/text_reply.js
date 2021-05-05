import Fasttext from 'fasttext.js'; 
import { readFile } from 'fs/promises';
const data = JSON.parse(await readFile(new URL('./assets/data.json',import.meta.url)));
const fasttext = new Fasttext();

export default class ReplyMSg {
  constructor(msg){
    this.msg = msg;
    console.log(data);
  }
}
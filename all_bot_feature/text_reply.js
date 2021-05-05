import { readFile } from 'fs/promises';
eval(UrlFetchApp.fetch('https://cdn.jsdelivr.net/npm/ml-classify-text@2.0.0/lib/index.js').getContentText());
const classifier = new Classifier();
const data = JSON.parse(await readFile(new URL('./assets/data.json',import.meta.url)));

export default class ReplyMSg {
  constructor(msg){
    this.msg = msg;
    console.log(data);
  }
}
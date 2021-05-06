import WhichX from 'whichx';
import { readFile } from 'fs/promises';

const datas = JSON.parse(await readFile(new URL('./assets/data.json',import.meta.url)));
const whichX = new WhichX();
const data = datas['type'];

const data_classifier = data => {
  for(let i = 0;i < data.length;i++){
    whichX.addLabels(data[i]['name']);
    whichX.addData(data[i]['name'],data[i]['description']);
  }
}
data_classifier(data);

let text = whichX.classify("Hello how are you");
console.log("It's a " + text + " type");

export default class ReplyMSg {
  constructor(msg) {
    this.msg = msg;
  }
}


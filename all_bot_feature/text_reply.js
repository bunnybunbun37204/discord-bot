import WhichX from 'whichx';
import { readFile } from 'fs/promises';

const datas = JSON.parse(await readFile(new URL('./assets/data.json',import.meta.url)));
const whichX = new WhichX();
let data = datas['data'];
whichX.addLabels("pokemon");
whichX.addData("pokemon", "loyal and bright yellow with a lightning shaped tail");
let pet = whichX.classify("Its yellow and shoots light");
console.log("It's a " + pet + "!");

export default class ReplyMSg {
  constructor(msg) {
    this.msg = msg;
  }
}
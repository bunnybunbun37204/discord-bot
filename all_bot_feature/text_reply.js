import WhichX from 'whichx';
import { readFile } from 'fs/promises';

const datas = JSON.parse(await readFile(new URL('./assets/data.json', import.meta.url)));
const whichX = new WhichX();
const data = datas['type'];

const data_classifier = data => {
  for (let i = 0; i < data.length; i++) {
    whichX.addLabels(data[i]['name']);
    whichX.addData(data[i]['name'], data[i]['description']);
  }
}

const find_id_injson = type => {
  for (let i = 0; i < data.length; i++) {
    if(data[i]['name'] === type){
      return i;
    }
  }
}

const answer = id => {
  let ans = data[id]['answer'];
  return ans;
}

data_classifier(data);

export default class ReplyMSg {
  constructor() {
    console.log('function reply can be used');
  }
  replyMsg(msg, isActive) {
    if (isActive) {
      let type = whichX.classify(msg.content);
      console.log(answer(find_id_injson(type)));
    }
    else {
      console.log('the bot is inactive status');
    }
  }
}


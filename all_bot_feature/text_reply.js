import WhichX from 'whichx';
import { readFile } from 'fs/promises';

const datas = JSON.parse(await readFile(new URL('./assets/data.json', import.meta.url)));
const whichX = new WhichX();
const data = datas['type'];
let memo = {};

const data_classifier = data => {
  for (let i = 0; i < data.length; i++) {
    whichX.addLabels(data[i]['name']);
    whichX.addData(data[i]['name'], data[i]['keywords']);
  }
}

const find_id_injson = (type) => {
  if (type in memo) return memo[type];
  else {
    for (let i = 0; i < data.length; i++) {
      console.log('using for loop');
      if (data[i]['name'] === type) {
        memo[type] = i;
        return i;
      }
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
      let ans_list = answer(find_id_injson(type));
      const index = Math.floor(Math.random() * ans_list.length);
      msg.reply(ans_list[index]);
      console.log(memo);
    }
    else {
      console.log('the bot is inactive status');
    }
  }
}


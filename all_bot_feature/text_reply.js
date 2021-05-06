import Fasttext from 'fasttext.js'; 
import { readFile } from 'fs/promises';
const data = JSON.parse(await readFile(new URL('./assets/data.json',import.meta.url)));
const fastText = new Fasttext({
  serializeTo: './models',
  trainFile: './assets/dataset.txt'
});
fastText.train()
.then(done=> {
    console.log("train done.");
})
.catch(error => {
    console.error(error);
});

export default class ReplyMSg {
  constructor(msg){
    this.msg = msg;
  }
}
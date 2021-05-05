const firebase = require('firebase');
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfTMBHZPj73KdiQm4MpzsuSzkavY1AHAY",
  authDomain: "chatbotsts.firebaseapp.com",
  databaseURL: "https://chatbotsts.firebaseio.com",
  projectId: "chatbotsts",
  storageBucket: "chatbotsts.appspot.com",
  messagingSenderId: "47790051335",
  appId: "1:47790051335:web:33cc1cca8e1cd8e59a5aa2",
  measurementId: "G-Q9BZT050QY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
database.ref('customPath').once('value')
  .then(function (snapshot) {
    console.log(snapshot.val());
  });
module.exports = {
  name: "reply",
  bot_command: [], //This command in bot
  cooldown: 0,
  description: "auto reply",
  reply(msg, isActive) {
    if (isActive) {
      //do something
    }
  },
};

import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAt6-Wfo0dbQM14l4vf483BIlhU1FYnqhI",
  authDomain: "nowitter-3cee6.firebaseapp.com",
  databaseURL: "https://nowitter-3cee6.firebaseio.com",
  projectId: "nowitter-3cee6",
  storageBucket: "nowitter-3cee6.appspot.com",
  messagingSenderId: "885861998057",
  appId: "1:885861998057:web:b81d80ae794d58d8db3f78"
};

export default firebase.initializeApp(firebaseConfig);

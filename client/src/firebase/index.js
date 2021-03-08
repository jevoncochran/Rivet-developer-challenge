import firebase from "firebase";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCYo9IHz5Jz0YhPANPN0TWzL7U65n6kfgU",
  authDomain: "rivet-employees.firebaseapp.com",
  projectId: "rivet-employees",
  storageBucket: "rivet-employees.appspot.com",
  messagingSenderId: "1095121318482",
  appId: "1:1095121318482:web:572cbccce91dfba37f258b",
};

firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };

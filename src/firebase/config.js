import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
import "firebase/firestore";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//FIRST
// const firebaseConfig = {
//   apiKey: "AIzaSyB6b_wtOzAEw-Fr3BUWkN5Z_k3zjemF9BU",
//   authDomain: "first-react-native-proje-98226.firebaseapp.com",
//   databaseURL:
//     "https://first-react-native-proje-98226-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "first-react-native-proje-98226",
//   storageBucket: "first-react-native-proje-98226.appspot.com",
//   messagingSenderId: "165190012386",
//   appId: "1:165190012386:web:764587bead9c6adde5bdbb",
//   measurementId: "G-QWSRL324SZ",
// };
// const app = initializeApp(firebaseConfig);
//SECOND
const firebaseConfig = {
  apiKey: "AIzaSyBXmfIY64LmRM8MwAFzwBy5Q6QbTUVOQZo",
  authDomain: "react-native-first-app-73417.firebaseapp.com",
  projectId: "react-native-first-app-73417",
  storageBucket: "react-native-first-app-73417.appspot.com",
  messagingSenderId: "110038591812",
  appId: "1:110038591812:web:f4d7b1f1484eea84e58f11",
};
const app = initializeApp(firebaseConfig, "my-app-name");

//THIRD
// const firebaseConfig = {
//   apiKey: "AIzaSyDr1Or0LcfWtJ9FEEBtrlew_FyNAL-yhoo",
//   authDomain: "third-attempt-c55fe.firebaseapp.com",
//   projectId: "third-attempt-c55fe",
//   storageBucket: "third-attempt-c55fe.appspot.com",
//   messagingSenderId: "1091157125318",
//   appId: "1:1091157125318:web:c6ff9cd6425e6f9c078fc7",
// };
// const app = initializeApp(firebaseConfig, "my-app");

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

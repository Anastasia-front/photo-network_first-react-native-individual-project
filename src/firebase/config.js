import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6b_wtOzAEw-Fr3BUWkN5Z_k3zjemF9BU",
  authDomain: "first-react-native-proje-98226.firebaseapp.com",
  databaseURL:
    "https://first-react-native-proje-98226-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "first-react-native-proje-98226",
  storageBucket: "first-react-native-proje-98226.appspot.com",
  messagingSenderId: "165190012386",
  appId: "1:165190012386:web:764587bead9c6adde5bdbb",
  measurementId: "G-QWSRL324SZ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

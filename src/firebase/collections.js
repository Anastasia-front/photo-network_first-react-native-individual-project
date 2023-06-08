import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";

export const writeDataToFirestore = async () => {
  const uniquePostId = Date.now().toString();
  const collectionRef = doc(db, "test", uniquePostId);
  const data = {
    email: "Ada",
    name: "Lovelace",
    password: "1815",
    photo: "tbrtnb",
  };
  try {
    await setDoc(collectionRef, data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    // Перевіряємо у консолі отримані дані
    snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
    // Повертаємо масив обʼєктів у довільній формі
    return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDataInFirestore = async (collectionName, docId) => {
  try {
    const ref = doc(db, collectionName, docId);

    await updateDoc(ref, {
      age: 25,
    });
    console.log("document updated");
  } catch (error) {
    console.log(error);
  }
};

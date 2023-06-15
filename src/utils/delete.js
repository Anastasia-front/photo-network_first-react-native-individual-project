import { db } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { Alert } from "react-native";

export const deleteComment = (postID, id) => {
  Alert.alert("Підтвердження!", "Ви дійсно хочете видалити коментарій?", [
    {
      text: "Ні",
      onPress: () => console.log("Cancel"),
    },
    {
      text: "Так",
      onPress:
        //   () => console.log("Yes"),
        async () => {
          try {
            const documentRef = doc(db, "posts", postID, "comments", id);
            await deleteDoc(documentRef);
            alert("Коментар був успішно видалений!");
            console.log("The document was successfully deleted.");
          } catch (error) {
            alert("Щось пішло не так!");
            console.error("Error when deleting the document:", error);
          }
        },
    },
  ]);
};

export const deletePost = (postID) => {
  Alert.alert("Підтвердження!", "Ви дійсно хочете видалити пост?", [
    {
      text: "Ні",
      onPress: () => console.log("Cancel"),
    },
    {
      text: "Так",
      onPress: async () => {
        try {
          const documentRef = doc(db, "posts", postID);
          await deleteDoc(documentRef);
          alert("Пост був успішно видалений!");
          console.log("The document was successfully deleted.");
        } catch (error) {
          alert("Щось пішло не так!");
          console.error("Error when deleting the document:", error);
        }
      },
    },
  ]);
};

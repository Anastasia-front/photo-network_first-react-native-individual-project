import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { CommentsList } from "../components/Comments/CommentList";
import { CommentForm } from "../components/Comments/CommentForm";
// import { useKeyboardListener } from "../utils/keyboard";

const CommentsScreen = ({ navigation, route }) => {
  const { id: postId, photo } = route.params;
  const [allComments, setAllComments] = useState([]);
  // const { keyboardHeight } = useKeyboardListener(0);
  // console.log(keyboardHeight);

  useEffect(() => {
    const commentsRef = collection(db, "posts", postId, "comments");

    onSnapshot(
      commentsRef,
      (data) => {
        setAllComments(
          data.docs.map((comment) => ({ id: comment.id, ...comment.data() }))
        );
      },
      () => {}
    );

    navigation.setOptions({
      headerLeft: () => (
        <Feather
          name="arrow-left"
          size={24}
          color={styles.headerBackBtn}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [postId, navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* main content */}

        {allComments.length === 0 ? (
          <>
            <Image source={{ uri: photo }} style={styles.photo} />
            <Text style={styles.text}>Ще немає коментарів...</Text>
          </>
        ) : null}

        {allComments.length !== 0 ? (
          <View>
            <CommentsList allComments={allComments} photo={photo} />
          </View>
        ) : null}

        {/* bottom form */}
        {/* <View style={{ bottom: keyboardHeight }}> */}
        <CommentForm postId={postId} />
        {/* </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  keyboardWrp: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerBackBtn: "grey",
  photo: {
    width: 370,
    height: 240,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 7,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  text: {
    fontSize: 25,
    color: "#212121",
    fontWeight: "400",
    fontStyle: "italic",
    textAlign: "left",
    position: "absolute",
    top: 300,
    left: 30,
  },
});

export default CommentsScreen;

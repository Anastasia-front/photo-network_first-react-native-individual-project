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
import PostIdContext from "../utils/context";

const CommentsScreen = ({ navigation, route }) => {
  const { id: postId, owner, photo } = route.params;
  const [allComments, setAllComments] = useState([]);

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
    <PostIdContext.Provider value={{ postId, owner }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {allComments.length === 0 ? (
            <>
              <Image source={{ uri: photo }} style={styles.photo} />
              <Text style={styles.text}>
                Ще немає коментарів, напишіть перший✌🏼
              </Text>
            </>
          ) : null}

          {allComments.length !== 0 ? (
            <View>
              <CommentsList allComments={allComments} photo={photo} />
            </View>
          ) : null}

          <CommentForm postId={postId} />
        </View>
      </TouchableWithoutFeedback>
    </PostIdContext.Provider>
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
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "grey",
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
    fontSize: 20,
    fontWeight: "400",
    position: "absolute",
    top: 400,
    left: 60,
    color: "#BDBDBD",
    width: "70%",
    textAlign: "center",
  },
});

export default CommentsScreen;

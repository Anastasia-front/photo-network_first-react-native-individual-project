import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectStateLogin, selectStateAvatar } from "../../redux/selectors";
import { addComment } from "../../redux/post/postReducer";

import { db } from "../../firebase/config";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import InputWithButton from "../Inputs/CommentInput";
import { useKeyboardListener } from "../../utils/keyboard";

export const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const login = useSelector(selectStateLogin);
  const avatar = useSelector(selectStateAvatar);
  const [myComment, setMyComment] = useState("");
  const { keyboardHeight } = useKeyboardListener(170);

  const sendComment = async () => {
    const uniqueCommentId = Date.now().toString();
    try {
      const postRef = doc(db, "posts", postId, "comments", uniqueCommentId);

      await setDoc(postRef, {
        comment: myComment,
        owner: {
          login,
          avatar,
        },
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
      setMyComment("");
      dispatch(addComment(myComment));
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ bottom: keyboardHeight }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={[styles.formWrp, { bottom: keyboardHeight }]}>
          <InputWithButton
            handleButtonClick={sendComment}
            inputValue={myComment}
            setInputValue={setMyComment}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  formWrp: {
    position: "absolute",
    // bottom: 10,
    left: 20,
  },
});

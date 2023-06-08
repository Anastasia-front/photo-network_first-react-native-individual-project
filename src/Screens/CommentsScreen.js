import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import InputWithButton from "../components/CommentInput";
import { CommentFromOther, CommentOwn } from "../components/Comment";
import { useState, useEffect } from "react";
import { useKeyboardListener } from "../utils/keyboard";

const CommentsScreen = () => {
  const keyboardHeight = useKeyboardListener(-30);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
        <View style={styles.parent}>
          <Image style={styles.photo} source={require("../img/Photo-BG.jpg")} />
          <View style={{ marginTop: 32 }}>
            <CommentFromOther
              avatar={require("../img/Photo-BG.jpg")}
              content="Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!"
              date="09 червня, 2020"
              time="08:40"
            />
            <CommentOwn
              avatar={require("../img/Photo.jpg")}
              content="A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images."
              date="09 червня, 2020"
              time="09:14"
            />
            <CommentFromOther
              avatar={require("../img/Photo-BG.jpg")}
              content="Thank you! That was very helpful!"
              date="09 червня, 2020"
              time="09:20"
            />
          </View>
          <View
            style={{
              paddingBottom: keyboardHeight,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
              // position: "absolute",
              // bottom: -70,
              // left: 0,
              // right: 0,
            }}
          >
            <InputWithButton />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderWidth: 1,
  },
  parent: {
    marginHorizontal: 20,
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    // width: 350,
    width: "100%",
    height: 240,
    backgroundColor: "#f6f6f6",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default CommentsScreen;

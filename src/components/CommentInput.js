import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

const InputWithButton = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleButtonClick = () => {
    // Обработка нажатия на кнопку
    console.log("Button clicked!");
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          value={inputValue}
          onChangeText={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Коментувати..."
        />
        <View style={styles.arrowContainer}>
          <Ionicons
            name="arrow-up"
            size={25}
            color="#fff"
            style={styles.arrow}
            onPress={handleButtonClick}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 50,
    paddingLeft: 16,
    marginBottom: 16,
    backgroundColor: "#f6f6f6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
  },
  inputFocused: {
    backgroundColor: "white",
    borderColor: "#FF6C00",
  },
  arrowContainer: {
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    position: "absolute",
    top: 10,
    right: 10,
  },
  arrow: {
    position: "absolute",
    top: 4,
    right: 4,
  },
});

export default InputWithButton;

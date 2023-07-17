import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, TextInput, StyleSheet } from "react-native";

import { globalVariables } from "../../../styles/globalVariables";

const InputWithButton = ({ handleButtonClick, inputValue, setInputValue }) => {
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

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 50,
    paddingLeft: 16,
    marginBottom: 16,
    backgroundColor: globalVariables.color.lightGrey1,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
  },
  inputFocused: {
    backgroundColor: "white",
    borderColor: "#2D767F",
  },
  arrowContainer: {
    width: 34,
    height: 34,
    backgroundColor: "#9D84B7",
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

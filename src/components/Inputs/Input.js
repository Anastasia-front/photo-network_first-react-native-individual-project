import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { globalVariables } from "../../../styles/globalVariables";

export default function Input({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  inputMode,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TextInput
        inputMode={inputMode}
        secureTextEntry={secureTextEntry}
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 343,
    height: 50,
    paddingLeft: 16,
    marginBottom: 16,
    backgroundColor: globalVariables.color.lightGrey1,
    borderColor: globalVariables.color.lightGrey2,
    borderWidth: 1,
    borderRadius: 8,
  },
  inputFocused: {
    backgroundColor: globalVariables.color.white,
    borderColor: globalVariables.color.green,
  },
});

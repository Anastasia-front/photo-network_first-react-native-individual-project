import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

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
    backgroundColor: "#f6f6f6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputFocused: {
    backgroundColor: "white",
    borderColor: "#2D767F",
  },
});

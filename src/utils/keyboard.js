import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

export const useKeyboardListenerWithOpen = (number) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height - number);
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return { keyboardHeight, keyboardOpen };
};

export const useKeyboardListener = (number) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height - number);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return keyboardHeight;
};

export const usePasswordVisibility = (initialState, password) => {
  const [showPassword, setShowPassword] = useState(initialState);
  const [hidden, setHidden] = useState("#F6F6F6");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (password === "") {
      setHidden("#F6F6F6");
    } else {
      setHidden("#1B4371");
    }
  }, [password]);

  return { showPassword, hidden, togglePasswordVisibility };
};

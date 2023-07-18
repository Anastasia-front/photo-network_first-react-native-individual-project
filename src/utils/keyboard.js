import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

import { globalVariables } from "../../styles/globalVariables";

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
  return { keyboardHeight };
};

export const usePasswordVisibility = (initialState, password) => {
  const [showPassword, setShowPassword] = useState(initialState);
  const [hidden, setHidden] = useState(globalVariables.color.lightGrey1);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (password === "") {
      setHidden(globalVariables.color.lightGrey1);
    } else {
      setHidden(globalVariables.color.blue);
    }
  }, [password]);

  return { showPassword, hidden, togglePasswordVisibility };
};

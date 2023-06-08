import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import OverlayImage from "../components/OverlayImage";
import CustomButton from "../components/Button";
import Input from "../components/Input";
import CustomLink from "../components/Link";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
// import { loginDB } from "../firebase/authorization";
import { authSignInUser } from "../redux/auth/authOperations";
import { LoaderScreen } from "./LoaderScreen";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isShowLoader, setIsShowLoader] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hidden, setHidden] = useState("#F6F6F6");

  //   #F6F6F6
  // #1b4371

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (password === "") {
      setHidden("#F6F6F6");
    } else {
      setHidden("#1b4371");
    }
  }, [password]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Invalid email");
      alert("Invalid email: it must contain @ and domain part, invalid space");
    } else {
      setValidationError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setValidationError("Password should be at least 6 characters");
      alert("Password should be at least 6 characters");
    } else {
      setValidationError("");
    }
  };

  const handleSubmit = () => {
    validateEmail();
    validatePassword();

    if (validationError === "" && password !== "" && email !== "") {
      setIsShowLoader(true);
      dispatch(authSignInUser({ email, password })).then((data) => {
        if (data === undefined || !data.user) {
          setIsShowLoader(false);
          alert(`Вхід не виконано! Помилка: ${data}`);
        }
        // console.log(
        //   `Form submitted successfully! Email: ${email}, password: ${password}`
        // );
      });
      // submit();
      // handleLogin();
    }
  };
  const submit = () => {};

  // if (isShowLoader) {
  //   return <LoaderScreen />;
  // }

  // const handleLogin = async () => {
  //   try {
  //     const user = await loginDB({ email, password });
  //     console.log("Login successful:", user); // Handle success
  //   } catch (error) {
  //     if (error.message === "Firebase: Error (auth/user-not-found)") {
  //       alert("This user is not registered yet!");
  //     }
  //     alert("Sorry! Something went wrong!");
  //     console.log("Login error:", error.message); // Handle error
  //   }
  // };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height - 150);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../img/Photo-BG.jpg")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View
            style={[styles.overlayContainer, { paddingBottom: keyboardHeight }]}
          >
            <OverlayImage top={535} />
            <View style={styles.formContainer}>
              <Title title={"Увійти"} top={200} />
              <View style={{ paddingBottom: keyboardHeight }}>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <Input
                    inputMode="email"
                    placeholder="Адреса електронної пошти"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={validateEmail}
                  />
                  <Input
                    inputMode="text"
                    placeholder="Пароль"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onBlur={validatePassword}
                    style={{ position: "relative" }}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", top: 82, right: 20 }}
                    onPress={togglePasswordVisibility}
                  >
                    <Text style={{ color: hidden }}>
                      {showPassword ? "Сховати" : "Показати"}
                    </Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </View>

              <CustomButton
                color="#FF6C00"
                width={343}
                text="Увійти"
                onPress={handleSubmit}
              />
              <View style={styles.text}>
                <Text style={styles.textColor}>Немає акаунту?</Text>
                <CustomLink
                  color="#1B4371"
                  top={0}
                  left={10}
                  text="Зареєструватися"
                  onPress={() => navigation.navigate("Registration")}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
  },
  imageBackground: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textColor: {
    color: "#1B4371",
  },
});

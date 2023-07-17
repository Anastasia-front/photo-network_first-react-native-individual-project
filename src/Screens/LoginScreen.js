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
import OverlayImage from "../components/Others/OverlayImage";
import CustomButton from "../components/Others/Button";
import Input from "../components/Inputs/Input";
import CustomLink from "../components/Others/Link";
import Title from "../components/Others/Title";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { validateEmail, validatePassword } from "../utils/validation";
import { authSignInUser } from "../redux/auth/authOperations";
import { LoaderScreen } from "./LoaderScreen";
import { useDispatch } from "react-redux";
import { useKeyboardListener, usePasswordVisibility } from "../utils/keyboard";
import { authStateChange } from "../redux/auth/authReducer";
import { globalVariables } from "../../styles/globalVariables";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { keyboardHeight } = useKeyboardListener(100);

  const [isShowLoader, setIsShowLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const { showPassword, hidden, togglePasswordVisibility } =
    usePasswordVisibility(false, password);

  const handleSubmit = () => {
    validateEmail(email, setValidationError);
    validatePassword(password, setValidationError);

    if (
      (validationError === "" || !validationError) &&
      password !== "" &&
      email !== ""
    ) {
      setIsShowLoader(true);
      dispatch(authSignInUser(email, password)).then((data) => {
        if (data === undefined || !data.user) {
          setIsShowLoader(false);
          alert(`Вхід не виконано!`);
          return;
        }
        dispatch(authStateChange({ stateChange: true }));
      });
    }
  };

  if (isShowLoader) {
    return <LoaderScreen />;
  }

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
                  color={globalVariables.color.blue}
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
    color: globalVariables.color.blue,
  },
});

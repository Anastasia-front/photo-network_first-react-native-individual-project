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
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { authStateChange } from "../redux/auth/authReducer";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/validation";
import { handleGalleryPress } from "../utils/cameraPress";
import { avatarRegister } from "../utils/avatar";
import { LoaderScreen } from "./LoaderScreen";
import { authSignUpUser } from "../redux/auth/authOperations";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  useKeyboardListenerWithOpen,
  usePasswordVisibility,
} from "../utils/keyboard";

export default function Registration() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { keyboardHeight, keyboardOpen } = useKeyboardListenerWithOpen(-20);

  const [isShowLoader, setIsShowLoader] = useState(false);
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [avatar, setAvatar] = useState("../img/Rectangle-empty.jpg");
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(false);

  const { showPassword, hidden, togglePasswordVisibility } =
    usePasswordVisibility(false, password);

  const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();

    try {
      const response = await fetch(avatar);

      const file = await response.blob();

      const imageRef = ref(storage, `userAvatars/${uniquePostId}`);

      await uploadBytes(imageRef, file);

      const link = await getDownloadURL(imageRef);

      return link;
    } catch (error) {
      console.log("uploadPhotoToServer > ", error);
      alert("Вибачте, але фото не зберіглось на сервері", error.message);
    }
  };

  const handleSubmit = async () => {
    validateName(login, setValidationError);
    validateEmail(email, setValidationError);
    validatePassword(password, setValidationError);

    if (
      validationError === false &&
      login !== null &&
      email !== null &&
      password !== ""
    ) {
      setIsShowLoader(true);

      const photo =
        avatar !== "../img/Rectangle-empty.jpg"
          ? await uploadPhotoToServer()
          : "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57";
      dispatch(authSignUpUser(login, email, password, photo)).then((data) => {
        if (data === undefined || !data.uid) {
          setIsShowLoader(false);
          alert(`Реєстрацію не виконано!"     Помилка: ${data}`);
          return;
        }
        dispatch(authStateChange({ stateChange: true }));
        console.log(data);
      });
    }
  };

  const photoImageTop = keyboardOpen ? keyboardHeight - 210 : "38%";

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

            {avatarRegister(avatar, photoImageTop, "48%", "20%")}

            <View style={styles.formContainer}>
              <TouchableOpacity
                onPress={() =>
                  handleGalleryPress(
                    buttonPressCount,
                    setButtonPressCount,
                    setAvatar
                  )
                }
              >
                <Title title={"Реєстрація"} top={310} />
              </TouchableOpacity>
              <View style={{ paddingBottom: keyboardHeight }}>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <Input
                    inputMode="text"
                    placeholder="Логін"
                    value={login}
                    onChangeText={setLogin}
                    onBlur={validateName}
                  />
                  <Input
                    inputMode="email"
                    placeholder="Адреса електронної пошти"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={validateEmail}
                  />
                  <Input
                    placeholder="Пароль"
                    inputMode="text"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onBlur={validatePassword}
                    style={{ position: "relative" }}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", top: 148, right: 20 }}
                    onPress={togglePasswordVisibility}
                  >
                    <Text style={{ color: hidden }}>
                      {showPassword ? "Сховати" : "Показати"}
                    </Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </View>

              <CustomButton
                width={343}
                text="Зареєструватися"
                onPress={handleSubmit}
              />
              <View style={styles.text}>
                <Text style={styles.textColor}>Вже є акаунт?</Text>
                <CustomLink
                  color="#1B4371"
                  top={0}
                  left={10}
                  text="Увійти"
                  onPress={() => navigation.navigate("Login")}
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
    position: "relative",
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

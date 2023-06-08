import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
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
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
// import { registerDB } from "../../firebase/authorization";
// import { savePhoto, saveName, saveEmail } from "../redux/auth/authOperations";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/validation";
import { handleGalleryPress } from "../utils/cameraPress";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(false);

  const { showPassword, hidden, togglePasswordVisibility } =
    usePasswordVisibility(false, password);

  const handleSubmit = async () => {
    validateName(name, setValidationError);
    validateEmail(email, setValidationError);
    validatePassword(password, setValidationError);

    if (
      validationError === false &&
      name !== "" &&
      email !== "" &&
      password !== ""
    ) {
      // dispatch(saveName(name));
      // dispatch(saveEmail(email));
      // dispatch(savePhoto(avatar));
      // handleRegister();
      setIsShowLoader(true);

      let photo;
      if (avatar) {
        photo = await uploadPhotoToServer();
      } else {
        photo =
          "https://firebasestorage.googleapis.com/v0/b/rn-imagelibrary.appspot.com/o/userAvatars%2F%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA%20%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202023-06-03%20%D0%BE%2015.01.32.png?alt=media&token=271ad0cf-ff14-46b4-8125-85e9aaed16f5";
      }

      dispatch(authSignUpUser({ name, email, password, photo })).then(
        (data) => {
          if (data === undefined || !data.uid) {
            setIsShowLoader(false);
            alert(`Реєстрацію не виконано!" Помилка: ${data}`);
          }
          console.log(
            `Form submitted successfully! Name: ${name}, email: ${email}, password: ${password}`
          );
        }
      );
    }
  };

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

  const renderImage = () => {
    if (avatar === "../img/Rectangle-empty.jpg") {
      return (
        <Image
          style={styles.photoImage}
          source={require("../img/Rectangle-empty.jpg")}
        />
      );
    } else {
      return <Image style={styles.photoImage} source={{ uri: avatar }} />;
    }
  };

  const photoImageTop = keyboardOpen ? keyboardHeight - 210 : "38%";
  // const psevdoTop = keyboardOpen ? keyboardHeight - 120 : 350;

  const styles = {
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
    photoImage: {
      width: 120,
      height: 120,
      position: "absolute",
      top: photoImageTop,
      // left: 130,
      // top: "38%",
      left: "48%",
      transform: [{ translateX: -50 }, { translateY: -50 }],
      borderRadius: 16,
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
    psevdo: {
      position: "absolute",
      // top: psevdoTop,
      // left: 263,
      top: "48%",
      right: "20%",
      transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    afterElement: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 25,
      height: 25,
    },
    afterElementCircle: {
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      top: 0,
      backgroundColor: "#fff",
      borderColor: "#FF6C00",
      borderWidth: 1,
      borderRadius: "50%",
    },
    afterElementCircleGray: {
      borderColor: "#E8E8E8",
    },
    afterElementUnion: {
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      top: 0,
    },
    afterElementVertical: {
      position: "absolute",
      width: 1,
      height: 13,
      left: 11,
      top: 5,
      backgroundColor: "#FF6C00",
    },
    afterElementVerticalGray: {
      backgroundColor: "#E8E8E8",
      transform: [{ rotate: "45deg" }],
    },
    afterElementHorizontal: {
      position: "absolute",
      width: 1,
      height: 13,
      left: 11,
      top: 5,
      backgroundColor: "#FF6C00",
      transform: [{ rotate: "-90deg" }],
    },
    afterElementHorizontalGray: {
      backgroundColor: "#E8E8E8",
      transform: [{ rotate: "-45deg" }],
    },
  };

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

            {renderImage()}

            <View style={styles.psevdo}>
              <View style={styles.afterElement}>
                <View
                  style={[
                    styles.afterElementCircle,
                    avatar !== "../img/Rectangle-empty.jpg" &&
                      styles.afterElementCircleGray,
                  ]}
                >
                  <View style={styles.afterElementUnion}>
                    <View
                      style={[
                        styles.afterElementVertical,
                        avatar !== "../img/Rectangle-empty.jpg" &&
                          styles.afterElementVerticalGray,
                      ]}
                    />
                    <View
                      style={[
                        styles.afterElementHorizontal,
                        avatar !== "../img/Rectangle-empty.jpg" &&
                          styles.afterElementHorizontalGray,
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>

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
                    value={name}
                    onChangeText={setName}
                    onBlur={() => {
                      validateName();
                    }}
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

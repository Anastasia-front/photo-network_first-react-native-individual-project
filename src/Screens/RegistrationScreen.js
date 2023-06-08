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
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { ActionSheetIOS } from "react-native";
// import { registerDB } from "../../firebase/authorization";
// import { savePhoto, saveName, saveEmail } from "../redux/auth/authOperations";
import { LoaderScreen } from "./LoaderScreen";
import { authSignUpUser } from "../redux/auth/authOperations";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Registration() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isShowLoader, setIsShowLoader] = useState(false);
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [avatar, setAvatar] = useState("../img/Rectangle-empty.jpg");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hidden, setHidden] = useState("#F6F6F6");

  //   #F6F6F6
  // #1b4371

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (password.length === 0) {
      setHidden("#F6F6F6");
    } else {
      setHidden("#1b4371");
    }
  }, [password]);

  const validateName = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
      alert(
        "Invalid name: login cannot contain numbers, hyphens, spaces, special characters"
      );
      setValidationError("Invalid name");
    } else {
      setValidationError(false);
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email: it must contain @ and domain part, invalid space");
      setValidationError("Invalid email");
    } else {
      setValidationError(false);
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      alert("Password should be at least 6 characters");
      setValidationError("Password should be at least 6 characters");
    } else {
      setValidationError(false);
    }
  };

  const handleSubmit = async () => {
    validateName();
    validateEmail();
    validatePassword();

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

  const submit = async () => {};

  // if (isShowLoader) {
  //   return <LoaderScreen />;
  // }

  // const handleRegister = async () => {
  //   try {
  //     await registerDB({ email, password });

  //     console.log(name, email, avatar, "Registration successful"); // Handle success
  //   } catch (error) {
  //     if (error.message === "Firebase: Error (auth/email-already-in-use)") {
  //       alert("This user is registered already!");
  //     }
  //     alert("Sorry! Something went wrong!");
  //     console.log("Registration error:", error.message); // Handle error
  //   }
  // };

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

  const handleCameraPress = async () => {
    if (buttonPressCount === 0) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Выбрать из галереи", "Отмена"],
          cancelButtonIndex: 1,
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) {
            const { status } =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === "granted") {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });

              if (!result.canceled) {
                const selectedAsset = await MediaLibrary.createAssetAsync(
                  result.assets[0].uri
                );
                const selectedUri = await MediaLibrary.getAssetInfoAsync(
                  selectedAsset
                );
                setAvatar(selectedUri.uri);
                setButtonPressCount(1);
              }
            }
          }
        }
      );
    } else {
      setAvatar("../img/Rectangle-empty.jpg");
      setButtonPressCount(0);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height - 20);
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

  const photoImageTop = keyboardOpen ? keyboardHeight - 150 : "38%";
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
              <TouchableOpacity onPress={handleCameraPress}>
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

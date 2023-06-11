import { Ionicons, Feather } from "@expo/vector-icons";
import Input from "../components/Inputs/InputCreatePost";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import {
  selectStateUserId,
  selectStateAvatar,
  selectStateLogin,
} from "../redux/selectors";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, Timestamp } from "firebase/firestore";

import { Camera } from "expo-camera";
import CustomButton, { UnactiveButton } from "../components/Others/Button";
import { ActionSheetIOS } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { LoaderScreen } from "../Screens/LoaderScreen";
import { useKeyboardListener } from "../utils/keyboard";

const INITIAL_POST = {
  photoUri: "",
  titlePost: "",
  location: {
    latitude: "",
    longitude: "",
    postAddress: "",
  },
};

export default function CreatePostsScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { keyboardHeight } = useKeyboardListener(300);

  const [isShowLoader, setIsShowLoader] = useState(false);
  const [state, setState] = useState(INITIAL_POST);
  const [isDirtyForm, setIsDirtyForm] = useState(false);
  const [permissionCam, requestPermissionCam] = Camera.useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const userId = useSelector(selectStateUserId);
  const avatar = useSelector(selectStateAvatar);
  const login = useSelector(selectStateLogin);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setState(INITIAL_POST);
      setIsDirtyForm(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    navigation.setParams({
      isDirtyForm,
    });
  }, [isDirtyForm]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    (async () => {
      // camera & gallery
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setHasPermission(status === "granted");
      } catch (error) {
        console.log("permission camera/gallery > ", error.message);
      }

      // location
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          alert("Sorry, we need permissions to location");
          return;
        }

        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});

        const [postAddress] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        setState((prev) => ({
          ...prev,
          location: { latitude, longitude, postAddress },
        }));
      } catch (error) {
        console.log("permission location > ", error.message);
      }
    })();
  }, [isFocused]);

  const handleCameraPress = async () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Сделать фото", "Выбрать из галереи", "Отмена"],
        cancelButtonIndex: 2,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          const { status } = await Camera.requestCameraPermissionsAsync();
          if (status === "granted") {
            if (buttonPressCount === 0) {
              takePhoto();
            } else if (buttonPressCount === 1) {
              setState((prev) => ({ ...prev, photoUri: "" }));
              takePhoto();
            }
          } else {
            console.log("Дозвіл на використання камери не було надано");
          }
        } else if (buttonIndex === 1) {
          pickImage();
        }
        setButtonPressCount(1);
      }
    );
  };

  if (isShowLoader) {
    return <LoaderScreen />;
  }

  if (!hasPermission && !permissionCam) {
    return (
      <View style={styles.permission}>
        <Text style={{ textAlign: "center" }}>
          Нам потрібен ваш дозвіл, щоб показати камеру
        </Text>
        <CustomButton
          onPress={requestPermissionCam}
          width="50%"
          text="отримати дозвіл"
        />
      </View>
    );
  }
  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.takePictureAsync();
        await MediaLibrary.createAssetAsync(uri);
        setState((prev) => ({
          ...prev,
          photoUri: uri,
        }));

        setIsDirtyForm(true);
      } catch (error) {
        console.log("takePhoto > ", error.message);
      }
    }
  };

  const pickImage = async () => {
    try {
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
          setState((prev) => ({ ...prev, photoUri: selectedUri.uri }));
          setIsDirtyForm(true);
        }
      }
    } catch (error) {
      console.log("pickImage > ", error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();

    try {
      const response = await fetch(state.photoUri);

      const file = await response.blob();

      const imageRef = ref(storage, `postImages/${uniquePostId}`);

      const q = await uploadBytes(imageRef, file);

      const link = await getDownloadURL(imageRef);

      return link;
    } catch (error) {
      console.log("uploadPhotoToServer > ", error);
      alert("Вибачте, але фото не зберіглось на сервері", error.message);
    }
  };

  const uploadPostToServer = async () => {
    setIsShowLoader(true);
    const uniquePostId = Date.now().toString();
    try {
      const photo = await uploadPhotoToServer();
      const postRef = doc(db, "posts", uniquePostId);

      await setDoc(postRef, {
        photo,
        titlePost: state.titlePost ? state.titlePost : "Незабутня подія",
        location: state.location,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
        owner: {
          userId,
          login,
          avatar,
        },
      });
    } catch (error) {
      console.log("uploadPostToServer ===>>", error);
      alert("Вибачте, але публікація не зберіглась на сервері", error.message);
    } finally {
      setState(INITIAL_POST);
      setIsDirtyForm(false);
      setIsShowLoader(false);
      navigation.navigate("PostsScreen", { screen: "Posts" });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
        <View style={styles.parent}>
          <View>
            {buttonPressCount == 0 ? (
              <View style={styles.camera} ref={setCameraRef}>
                <View style={styles.photoViewSelected}>
                  <TouchableOpacity
                    style={[
                      styles.cameraButtonSelected,
                      { backgroundColor: "lightgrey" },
                    ]}
                    onPress={handleCameraPress}
                  >
                    <Ionicons name="camera" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : state.photoUri ? (
              <ImageBackground
                source={{ uri: state.photoUri }}
                style={styles.camera}
                ref={setCameraRef}
              >
                <View style={styles.photoViewSelected}>
                  <TouchableOpacity
                    style={styles.cameraButtonSelected}
                    onPress={handleCameraPress}
                  >
                    <Ionicons name="camera" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            ) : (
              <Camera style={styles.camera} type={type} ref={setCameraRef}>
                <View style={styles.photoView}>
                  <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Feather name="repeat" size={20} color="#BDBDBD" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={handleCameraPress}
                  >
                    <Ionicons name="camera" size={30} color="#BDBDBD" />
                  </TouchableOpacity>
                </View>
              </Camera>
            )}
          </View>

          {state.photoUri !== "" ? (
            <TouchableOpacity
              onPress={() => setState((prev) => ({ ...prev, photoUri: "" }))}
            >
              <Text style={styles.text}>Редагувати фото</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.text}>Завантажити фото</Text>
            </TouchableOpacity>
          )}

          <View style={{ marginTop: -keyboardHeight }}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <Input
                placeholder="Назва..."
                value={state.titlePost}
                onChangeText={(value) => {
                  setState((prev) => ({ ...prev, titlePost: value }));
                  setIsDirtyForm(value.length > 0 ? true : false);
                }}
              />
              <Ionicons
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                }}
                name="attach"
                size={25}
                color={state.titlePost !== "" ? "#F9D89C" : "#BDBDBD"}
              />
              <Input
                placeholder="Місцевість..."
                value={state.location?.title}
                onChangeText={(value) => {
                  setState((prev) => ({
                    ...prev,
                    location: { ...prev.location, title: value },
                  }));
                  setIsDirtyForm(value.length > 0 ? true : false);
                }}
              />
              <Ionicons
                style={{
                  position: "absolute",
                  top: 80,
                  left: 10,
                }}
                name="navigate"
                size={20}
                color={state.location?.title ? "#DBE9B7" : "#BDBDBD"}
              />
            </KeyboardAvoidingView>
          </View>
          {state.photoUri !== "" &&
          state.location !== "" &&
          state.titlePost !== "" ? (
            <CustomButton text="Опублікувати" onPress={uploadPostToServer} />
          ) : (
            <UnactiveButton text="Опублікувати" />
          )}

          <View style={styles.delete}>
            <UnactiveButton width={70} onPress={() => setState(INITIAL_POST)} />
            <Ionicons
              style={{
                position: "absolute",
                top: 25,
                left: 22,
              }}
              name="trash"
              size={25}
              color="#BDBDBD"
              onPress={() => setState(INITIAL_POST)}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  parent: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  permission: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  camera: {
    width: "100%",
    height: 240,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  cameraButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  cameraButtonSelected: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3);",
    borderRadius: "50%",
  },
  photoViewSelected: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 90,
  },
  flipContainer: {
    position: "absolute",
    top: 10,
    right: -120,
  },
  text: {
    color: "#BDBDBD",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  placeholderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeholderText: {
    marginLeft: 5,
    color: "#BDBDBD",
  },
  delete: {
    position: "absolute",
    top: "130%",
    right: "25%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

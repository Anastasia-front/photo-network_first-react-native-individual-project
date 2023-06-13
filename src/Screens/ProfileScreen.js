import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUpdateUser } from "../redux/auth/authOperations";
import {
  selectStateUserId,
  selectStateLogin,
  selectStateAvatar,
  selectorStateComment,
} from "../redux/selectors";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { View, Text, ImageBackground, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import image from "../img/Photo-BG3.jpg";

import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ProfileList } from "../components/Lists/ProfileList";
import { exit, manipulationWithImage, avatarTemplate } from "../utils";
import { LoaderScreen } from "./LoaderScreen";

export const ProfileScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [isShowLoaderAvatar, setIsShowLoaderAvatar] = useState(false);
  const [isShowLoaderPosts, setIsShowLoaderPosts] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(selectStateUserId);
  const name = useSelector(selectStateLogin);
  const avatar = useSelector(selectStateAvatar);
  const comment = useSelector(selectorStateComment);

  const login = name !== null ? name : "Default name";

  useEffect(() => {
    setIsShowLoaderPosts(true);
    const dbRef = collection(db, "posts");
    const myQuery = query(dbRef, where("owner.userId", "==", userId));

    onSnapshot(
      myQuery,
      (querySnapshot) => {
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const reversPosts = posts.reverse();
        setPosts(reversPosts);
        setIsShowLoaderPosts(false);
      },
      () => {}
    );
  }, [userId, comment]);

  const pickImage = async () => {
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!canceled) {
        const [{ uri }] = assets;

        const newUri = await manipulationWithImage(
          uri,
          [
            {
              resize: { height: 240, width: 240 },
            },
          ],
          0.5
        );
        return newUri;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadPhotoToServer = async (photo) => {
    const uniquePostId = Date.now().toString();

    try {
      const response = await fetch(photo);

      const file = await response.blob();

      const imageRef = ref(storage, `userAvatars/${uniquePostId}`);
      await uploadBytes(imageRef, file);

      return await getDownloadURL(imageRef);
    } catch (error) {
      console.log("uploadPhotoToServer > ", error);
      Alert.alert("Вибачте, але фото не зберіглось на сервері");
    }
  };

  const changeAvatar = async () => {
    setIsShowLoaderAvatar(true);

    const avatarUri = await pickImage();
    const avatarURL = await uploadPhotoToServer(avatarUri);

    dispatch(authUpdateUser({ avatarURL })).then((data) => {
      if (data === undefined || !data.userId) {
        setIsShowLoaderAvatar(false);
        console.log(data);
        Alert.alert(`Реєстрацію не виконано! Помилка: ${data}`);
        return;
      }

      Alert.alert("Вітаємо! Аватар змінено");
    });

    setIsShowLoaderAvatar(false);
  };

  if (isShowLoaderAvatar) {
    return <LoaderScreen />;
  }

  return (
    <ImageBackground source={image} style={styles.imageBg}>
      <View style={styles.container}>
        <View style={styles.myPostsContainer}>
          {avatarTemplate(avatar, -70, 10, 42, changeAvatar)}

          <View style={styles.exitBtn}>
            <Feather
              name="log-out"
              size={24}
              color={styles.exitBtn.color}
              onPress={() => {
                exit(dispatch);
              }}
            />
          </View>

          <Text style={styles.login}>{login}</Text>
          <Text style={styles.count}>Всього публікацій: {posts.length}</Text>
          {isShowLoaderPosts ? (
            <LoaderScreen />
          ) : (
            <View style={styles.listContainer}>
              <ProfileList
                posts={posts}
                navigation={navigation}
                route={route}
              />
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    height: "80%",
    width: "100%",

    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
  },
  myPostsContainer: {
    width: "100%",
    height: "100%",
    paddingTop: 60,
    marginLeft: 3,
    paddingHorizontal: 12,
  },
  avatarContainer: {
    position: "absolute",
    top: 30,
    left: 250,
    alignSelf: "center",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },

  avatarWrp: {
    borderRadius: 16,
    overflow: "hidden",
    height: "14%",
    width: "14%",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
  },
  buttonAvatar: {
    position: "absolute",
    bottom: 13,
    right: -13,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#ffffff",
  },
  buttonAvatarText: {
    color: "#FF6C00",
  },
  exitBtn: {
    position: "absolute",
    right: 0,
    top: 16,
    color: "#BDBDBD",
  },
  login: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "500",
  },
  count: {
    alignSelf: "flex-end",
    fontSize: 12,
    marginBottom: 15,
    color: "#BDBDBD",
  },
});

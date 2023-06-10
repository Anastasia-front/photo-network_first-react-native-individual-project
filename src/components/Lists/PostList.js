import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectorStateComment,
  selectStateAvatar,
  selectStateLogin,
  selectStateEmail,
} from "../../redux/selectors";
import { db, auth } from "../../firebase/config";
import { updateUserProfile } from "../../redux/auth/authReducer";
import {
  collection,
  onSnapshot,
  setDoc,
  getDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LoaderScreen } from "../../Screens/LoaderScreen";
import { Post } from "../Posts/Post";
import { askIfQuit } from "../../helpers";
// import { authStateChangeUser } from "../redux/auth/authOperations";
import { selectStateChange } from "../../redux/selectors";
import { avatarTemplate } from "../../utils/avatar";

export const PostsList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [posts, setPosts] = useState([]);
  const comment = useSelector(selectorStateComment);
  const login = useSelector(selectStateLogin);
  const avatar = useSelector(selectStateAvatar);
  const email = useSelector(selectStateEmail);

  const name = login !== null ? login : "Default name";

  useEffect(() => {
    const dbRef = collection(db, "posts");

    onSnapshot(
      dbRef,
      (data) => {
        const posts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const reversPosts = posts.reverse();
        setPosts(reversPosts);
        setIsShowLoader(false);
      },
      () => {}
    );
    navigation.setOptions({
      headerRight: () => (
        <Feather
          name="log-out"
          size={24}
          color={styles.headerExitBtn.color}
          onPress={() => {
            askIfQuit(dispatch);
          }}
        />
      ),
    });
  }, [navigation, comment]);

  const borderRadius =
    avatar ===
    "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57"
      ? 50
      : 12;

  const styles = StyleSheet.create({
    container: {
      marginLeft: -12,
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    headerExitBtn: {
      color: "#BDBDBD",
    },
    text: {
      alignSelf: "center",
    },
    main: {
      flex: 1,
      backgroundColor: "#fff",
      borderColor: "grey",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingBottom: 100,
    },
    parent: {
      marginHorizontal: 20,
      marginVertical: 30,
    },
    person: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: borderRadius,
      borderWidth: 0.5,
      borderColor: "grey",
    },
    text: {
      fontSize: 20,
      textAlign: "center",
    },
    name: {
      fontSize: 15,
      fontWeight: "700",
    },
    email: { fontSize: 13, fontWeight: "400" },
  });

  if (posts.length === 0) {
    return (
      <View style={styles.main}>
        <View style={styles.parent}>
          <View style={styles.person}>
            <Image style={styles.image} source={{ uri: avatar }} />
            <View style={styles.text}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.container}>
              <Text style={styles.text}>Немає публікацій користувачів! </Text>
              {isShowLoader && <LoaderScreen />}
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={styles.parent}>
        <View style={styles.person}>
          <Image style={styles.image} source={{ uri: avatar }} />
          <View style={styles.text}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={styles.container}>
            <FlatList
              data={posts}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <Post post={item} navigation={navigation} />
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

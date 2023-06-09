import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectorStateComment,
  selectStateAvatar,
  selectStateLogin,
  selectStateEmail,
} from "../redux/selectors";
import { db } from "../firebase/config";
import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LoaderScreen } from "../Screens/LoaderScreen";
import { Post } from "./Post";
import { askIfQuit } from "../helpers";
import { authStateChangeUser } from "../redux/auth/authOperations";

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
    setIsShowLoader(true);
    const dbRef = collection(db, "posts");

    onSnapshot(
      dbRef,
      (data) => {
        const posts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const reversPosts = posts.reverse();
        setPosts(reversPosts);
        setIsShowLoader(false);
        console.log(data);
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

  const handleGet = () => {
    dispatch(authStateChangeUser()).then(async (data) => {
      if (data === undefined || !data.userId) {
        console.log(data);
        alert(`Користувач не залогінений! Помилка: ${data}`);
        return;
      }

      try {
        const docRef = doc(db, "post", "post");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

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
              <TouchableOpacity onPress={handleGet}>
                <Text style={styles.text}>Немає публікацій користувачів! </Text>
              </TouchableOpacity>

              {/* {isShowLoader && <LoaderScreen />} */}
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

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectorStateComment } from "../redux/selectors";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { View, FlatList, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LoaderScreen } from "../Screens/LoaderScreen";
import { Post } from "./Post";
import { askIfQuit } from "../helpers";

export const PostsList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [posts, setPosts] = useState([]);
  const comment = useSelector(selectorStateComment);

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

  //   if (isShowLoader) {
  //     return <LoaderScreen />;
  //   }

  //   if (posts.length === 0) {
  //     return (
  //       <View style={styles.container}>
  //         <Text style={styles.text}>Ще ніхто не зробив фотознімки</Text>
  //       </View>
  //     );
  //   }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Post post={item} navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  headerExitBtn: {
    color: "#BDBDBD",
  },
  text: {
    alignSelf: "center",
  },
});

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Post } from "./Post";

export const ProfileList = ({ navigation, posts, route }) => {
  if (posts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Зараз у тебе немає публікацій, але ти можеш їх створити - тисни на цю
          кнопку👇🏻
        </Text>

        <TouchableOpacity
          style={styles.buttonCapture}
          onPress={() => navigation.navigate("Create")}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Post post={item} navigation={navigation} route={route} />
        )}
        ListFooterComponent={<View style={{ height: "70%" }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 30,
  },
  text: { textAlign: "center" },
  buttonCapture: {
    marginTop: 30,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});

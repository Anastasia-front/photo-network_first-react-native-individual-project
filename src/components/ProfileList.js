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
        <Text>Зараз у тебе немає фото, але можна зробити щось класне...</Text>

        <TouchableOpacity
          style={styles.buttonCapture}
          onPress={() => navigation.navigate("Create")}
        >
          <MaterialIcons name="photo-camera" size={24} color="white" />
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
  container: {},
  text: {},
  buttonCapture: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});

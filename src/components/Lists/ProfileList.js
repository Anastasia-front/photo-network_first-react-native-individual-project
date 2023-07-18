import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ProfilePost } from "../Posts/ProfilePost";

import { globalVariables } from "../../../styles/globalVariables";

export const ProfileList = ({ navigation, posts, route }) => {
  if (posts.length === 0) {
    return (
      <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 20 }}>
        <Text style={styles.text}>
          Зараз у тебе немає публікацій, але ти можеш їх створити - тисни на цю
          кнопку👇🏻
        </Text>

        <TouchableOpacity
          style={styles.buttonCapture}
          onPress={() => navigation.navigate("Create")}
        >
          <MaterialIcons
            name="add"
            size={24}
            color={globalVariables.color.white}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.paddingBottom}
      data={posts}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <ProfilePost post={item} navigation={navigation} route={route} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  paddingBottom: {
    paddingBottom: 200,
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
    backgroundColor: globalVariables.color.green,
  },
});

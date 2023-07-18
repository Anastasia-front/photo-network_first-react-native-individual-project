import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { PostsList } from "../components/Lists/PostList";

import { globalVariables } from "../../styles/globalVariables";

const PostStack = createStackNavigator();

const screenOptions = ({ navigation, route }) => ({
  ...styles,
  title: "Публікації",
  headerRight: () => {},
});

export const PostsScreen = ({ navigation }) => {
  return (
    <PostStack.Navigator screenOptions={screenOptions}>
      <PostStack.Screen name="Posts" component={PostsList} />
    </PostStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTintColor: globalVariables.color.black,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "500",
    fontSize: 17,
  },
  headerTitleContainerStyle: {
    justifyContent: "flex-end",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerRightContainerStyle: {
    justifyContent: "flex-end",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerLeftContainerStyle: {
    justifyContent: "flex-end",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
});

import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { attention } from "../utils/form";
import { Ionicons } from "@expo/vector-icons";

import { globalVariables } from "../../styles/globalVariables";

const Tabs = createBottomTabNavigator();

const screenOptions = ({ navigation, route }) => ({
  headerLeft: () => (
    <Ionicons
      name="ios-arrow-back"
      size={25}
      color={styles.headerTintColor}
      style={{ marginLeft: 25 }}
      onPress={() => {
        attention(navigation, route);
      }}
    />
  ),
  tabBarIcon: ({ focused, color, size }) => {
    let tabBarItem;

    if (route.name === "PostsScreen") {
      tabBarItem = focused ? (
        <View style={styles.tabItemActive}>
          <Ionicons
            name="ios-grid"
            size={25}
            color={styles.tabItemActive.activeFill}
            style={{ marginRight: 25 }}
          />
        </View>
      ) : (
        <Ionicons
          name="ios-grid"
          size={25}
          color={styles.tabItemActive.inActiveFill}
          style={{ marginRight: 25 }}
        />
      );
    }
    if (route.name === "Create") {
      tabBarItem = focused ? (
        <View style={styles.tabItemActive}>
          <Ionicons
            name="ios-add-circle"
            size={25}
            color={styles.tabItemActive.activeFill}
            style={{ marginRight: 25 }}
          />
        </View>
      ) : (
        <Ionicons
          name="ios-add-circle-outline"
          size={25}
          color={styles.tabItemActive.inActiveFill}
          style={{ marginRight: 25 }}
        />
      );
    }

    if (route.name === "Profile") {
      tabBarItem = focused ? (
        <View style={styles.tabItemActive}>
          <Ionicons
            name="ios-person"
            size={25}
            color={styles.tabItemActive.activeFill}
            style={{ marginRight: 25 }}
          />
        </View>
      ) : (
        <Ionicons
          name="ios-person"
          size={25}
          color={styles.tabItemActive.inActiveFill}
          style={{ marginRight: 25 }}
        />
      );
    }

    return tabBarItem;
  },
  ...styles,
  tabBarShowLabel: false,
});

export const Home = ({ navigation, route, options }) => {
  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={screenOptions}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTintColor: globalVariables.color.grey,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: globalVariables.font.weight.medium,
    fontSize: globalVariables.font.size.md,
    color: globalVariables.color.black,
  },
  headerTitleContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerRightContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "center",

    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerLeftContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "center",

    paddingBottom: 7,
    paddingHorizontal: 16,
  },
  tabBarStyle: {
    paddingLeft: 60,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarItemStyle: {
    paddingTop: 9,
    paddingBottom: 35,
    height: 85,
  },
  tabItemActive: {
    height: 40,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: globalVariables.radius.tab,
    activeFill: globalVariables.color.orangeMain,
    inActiveFill: globalVariables.color.grey,
  },
});

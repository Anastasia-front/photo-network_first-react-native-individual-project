import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import Registration from "./Screens/RegistrationScreen";
import Login from "./Screens/LoginScreen";
import { Home } from "./Screens/Home";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";

const styles = StyleSheet.create({
  header: {
    colorPrimary: "black",
    secondaryColor: "grey",
  },
  headerTitle: {
    flex: 1,
    marginTop: 9,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
    fontSize: 18,
  },
  headerContainerItem: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
});

const MainStack = createStackNavigator();

const screenOptions = ({ navigation, route }) => ({
  headerShown: true,
  headerTintColor: styles.header.colorPrimary,
  headerTitleAlign: styles.headerTitle.alignItems,
  headerTitleStyle: styles.headerTitle,
  headerTitleContainerStyle: styles.headerContainerItem,
  headerRightContainerStyle: styles.headerContainerItem,
  headerLeftContainerStyle: styles.headerContainerItem,
  headerLeft: () => (
    <Feather
      name="arrow-left"
      size={24}
      color={styles.header.secondaryColor}
      onPress={navigation.goBack}
    />
  ),
});

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={screenOptions}
      >
        <MainStack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerRight: null,
        }}
      />

      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerRight: null,
        }}
      />
    </MainStack.Navigator>
  );
};

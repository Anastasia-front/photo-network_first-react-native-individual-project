import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./src/redux/store";

import Login from "./src/Screens/LoginScreen";
import Registration from "./src/Screens/RegistrationScreen";
import PostsScreen from "./src/Screens/PostsScreen";
import CreatePostsScreen from "./src/Screens/CreatePostsScreen";
import CommentsScreen from "./src/Screens/CommentsScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import MapScreen from "./src/Screens/MapScreen";
import { useState } from "react";
import { authStateChanged, updateUserProfile } from "./firebase/authorization";

const AuthStack = createStackNavigator();
const AuthNavigator = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleChange = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Registration">
        {() => <Registration onLogin={handleChange} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Login">
        {() => <Login onLogin={handleChange} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
const Tab = createBottomTabNavigator();
const TabNavigator = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleChange = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person";
          } else if (route.name === "Add") {
            iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
          } else if (route.name === "Posts") {
            iconName = focused ? "ios-grid" : "ios-grid";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
        },
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Світлини",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 18,
            letterSpacing: -0.4,
          },
          headerRight: () => (
            <Ionicons
              name="ios-log-out"
              size={25}
              color="grey"
              style={{ marginRight: 25 }}
              onPress={handleChange}
            />
          ),
        }}
        initialParams={{ navigation }}
      />
      <Tab.Screen
        name="Add"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 18,
            letterSpacing: -0.4,
          },
          headerLeft: () => (
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="grey"
              style={{ marginLeft: 25 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          tabBarStyle: { display: "none" },
        })}
      />
      <Tab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 18,
            letterSpacing: -0.4,
          },
          headerLeft: () => (
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="grey"
              style={{ marginLeft: 25 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 18,
            letterSpacing: -0.4,
          },
          headerLeft: () => (
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="grey"
              style={{ marginLeft: 25 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{ title: "Профіль", headerShown: false }}
      >
        {() => <ProfileScreen onLogin={handleChange} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? (
          <TabNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <AuthNavigator
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;

// import { View, Text, Image, StyleSheet } from "react-native";
// import Post from "../components/Post";
// import {
//   selectName,
//   selectPostName,
//   selectAvatar,
//   selectEmail,
//   selectPostLocation,
//   selectPostPhoto,
// } from "../redux/selectors";
// import { useSelector } from "react-redux";

// const PostsScreen = () => {
//   const name = useSelector(selectName);
//   const avatar = useSelector(selectAvatar);
//   const email = useSelector(selectEmail);
//   const postName = useSelector(selectPostName);
//   const postPhoto = useSelector(selectPostPhoto);
//   const postLocation = useSelector(selectPostLocation);

//   return (
//     <View style={styles.main}>
//       <View style={styles.parent}>
//         <View style={styles.person}>
//           <Image style={styles.image} source={{ uri: avatar }} />
//           <View style={styles.text}>
//             <Text style={styles.name}>{name}</Text>
//             <Text style={styles.email}>{email}</Text>
//           </View>
//         </View>
//         <View style={{ marginTop: 30 }}>
//           <Post
//             img={{ uri: postPhoto }}
//             title={postName}
//             location={postLocation}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderColor: "grey",
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//   },
//   parent: {
//     marginHorizontal: 20,
//     marginVertical: 30,
//   },
//   person: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     gap: 10,
//   },
//   image: {
//     width: 60,
//     height: 60,
//   },
//   text: {
//     letterSpacing: -0.2,
//   },
//   name: {
//     fontSize: 15,
//     fontWeight: "700",
//   },
//   email: { fontSize: 13, fontWeight: "400" },
// });

// export default PostsScreen;

import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { PostsList } from "../components/PostList";

const PostStack = createStackNavigator();

const screenOptions = ({ navigation, route }) => ({
  ...styles,
  title: "Публікації",
  headerRight: () => {},
});

export const PostsScreen = ({ navigation }) => {
  return (
    <PostStack.Navigator screenOptions={screenOptions}>
      <PostStack.Screen
        name="Posts"
        component={PostsList}
        // options={{ change inside PostsList }}
      />
    </PostStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTintColor: "#212121",
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

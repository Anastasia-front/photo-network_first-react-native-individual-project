// import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import { selectName, selectAvatar, selectEmail } from "../redux/selectors";

// export default function Post({ img, title, location }) {
//   const navigation = useNavigation();
//   const route = useRoute();

//   const name = useSelector(selectName);
//   const avatar = useSelector(selectAvatar);
//   const email = useSelector(selectEmail);

//   const [comments, setComments] = useState(3);
//   const [likes, setLikes] = useState(6);
//   const [numberOfClicks, setNumberOfClicks] = useState(0);
//   const handleLike = () => {
//     setLikes(likes + 1);
//     setNumberOfClicks(1);
//     console.log(name, avatar, email);
//     if (numberOfClicks === 1) {
//       setLikes(likes - 1);
//       setNumberOfClicks(0);
//     }
//   };

//   return (
//     <View>
//       <Image style={styles.photo} source={img} />
//       <View style={styles.parent}>
//         <Text style={styles.text}>{title}</Text>
//         <View style={styles.spaceBetween}>
//           <View style={styles.rowGap}>
//             <View style={styles.row}>
//               <Ionicons
//                 name="list"
//                 size={25}
//                 color={comments > 0 ? "#FF6C00" : "#BDBDBD"}
//                 onPress={() =>
//                   navigation.navigate("Comments", {
//                     previousScreen: route.name,
//                   })
//                 }
//               />
//               <Text style={[styles.number, comments > 0 && { color: "#000" }]}>
//                 {comments}
//               </Text>
//             </View>
//             <View style={styles.row}>
//               <Ionicons
//                 name="heart"
//                 size={25}
//                 color={likes > 0 ? "#FF6C00" : "#BDBDBD"}
//                 onPress={handleLike}
//               />
//               <Text style={[styles.number, likes > 0 && { color: "#000" }]}>
//                 {likes}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.row}>
//             <Ionicons
//               name="navigate"
//               size={20}
//               color="#BDBDBD"
//               onPress={() => navigation.navigate("Map")}
//             />
//             <TouchableOpacity onPress={() => navigation.navigate("Map")}>
//               <Text style={styles.location}>{location}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   parent: {
//     paddingRight: 7,
//     paddingLeft: 3,
//     paddingTop: 3,
//   },
//   photo: {
//     width: "100%",
//     height: 240,
//     backgroundColor: "#f6f6f6",
//     borderColor: "#fff",
//     borderWidth: 1,
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },
//   rowGap: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 25,
//   },
//   spaceBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   text: {
//     marginVertical: 7,
//     color: "#212121",
//     fontWeight: "500",
//     fontSize: 18,
//   },
//   number: { fontWeight: 400, fontSize: 16, color: "#BDBDBD" },
//   location: {
//     color: "#212121",
//     fontWeight: "400",
//     fontSize: 16,
//     textDecorationLine: "underline",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../firebase/config";
import { collection, getCountFromServer } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";

export const Post = ({ navigation, route }) => {
  const post = {
    photo: "../img/Photo-BG.jpg",
    owner: { avatar: "../img/Photo.jpg" },
    titlePost: "Nature",
    id: 12345,
  };
  const [countComments, setCountComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const handleLike = () => {
    setLikes(likes + 1);
    setNumberOfClicks(1);
    if (numberOfClicks === 1) {
      setLikes(likes - 1);
      setNumberOfClicks(0);
    }
  };

  useEffect(() => {
    try {
      const checkCount = async () => {
        const dbRef = collection(db, "posts", post.id, "comments");

        const snapshot = await getCountFromServer(dbRef);
        setCountComments(snapshot.data().count);
      };

      checkCount();
    } catch (error) {
      console.log("Post >", error.message);
    }
  }, [post]);

  // const selectTitleLocation = ({ location }) => {
  //   if (location.title) {
  //     return location.title;
  //   }

  //   if (location.postAddress && location.postAddress) {
  //     return `${location.postAddress?.city}, ${location.postAddress?.street}`;
  //   }

  //   return "Дефолтна локація";
  // };

  return (
    <View style={styles.postWrp}>
      <Image source={{ uri: post.photo }} style={styles.photo} />
      <View style={styles.bottomInfo}>
        {route?.name !== "Profile" && (
          <View style={styles.owner}>
            <Image source={{ uri: post.owner.avatar }} style={styles.avatar} />
          </View>
        )}

        <View style={styles.desc}>
          <Text style={styles.titlePost} ellipsizeMode="tail" numberOfLines={1}>
            {post.titlePost}
          </Text>

          <View style={styles.buttonsWrp}>
            <TouchableOpacity
              style={styles.buttonComments}
              onPress={() => navigation.navigate("Comments", post)}
            >
              <View style={styles.commentsIcon}>
                <Feather
                  name="message-circle"
                  size={24}
                  color={styles.commentsIcon.fill}
                />
              </View>
              <Text style={styles.commentsCount}>{countComments}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonComments}
              onPress={handleLike}
            >
              <View style={styles.mapIcon}>
                <Ionicons
                  name="heart"
                  size={25}
                  color={likes > 0 ? "#FF6C00" : "#BDBDBD"}
                  onPress={handleLike}
                />
              </View>
              <Text style={styles.commentsCount}>{likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonLocation}
              onPress={() => navigation.navigate("Map", post)}
            >
              <View style={styles.mapIcon}>
                <Feather name="map-pin" size={24} color={styles.mapIcon.fill} />
              </View>
              <Text
                style={styles.mapTitle}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {/* {selectTitleLocation(post)} */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postWrp: {
    marginBottom: 10,
  },
  photo: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    width: 330,
    height: 240,
    marginBottom: 20,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  bottomInfo: {
    flexDirection: "row",
  },
  owner: {
    marginRight: 10,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#BDBDBD",
  },
  avatar: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    borderWidth: 1,
    overflow: "hidden",
  },
  desc: {},
  titlePost: {
    marginBottom: 5,
    maxWidth: 100,

    fontSize: 16,
    fontWeight: "500",
    color: "#212121",
  },
  buttonsWrp: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 60,
    gap: 20,
  },
  buttonComments: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsIcon: {
    marginRight: 15,
    transform: [{ rotate: "-90deg" }],
    fill: "#BDBDBD",
  },
  commentsCount: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  buttonLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapIcon: {
    marginRight: 15,
    fill: "#BDBDBD",
  },
  mapTitle: {
    maxWidth: 100,

    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
    color: "#212121",
  },
});

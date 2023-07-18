import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { dateConverter } from "../../utils";
import { deleteComment } from "../../utils/delete";
import { auth } from "../../firebase/config";
import { Ionicons } from "@expo/vector-icons";
import PostIdContext from "../../utils/context";

import { globalVariables } from "../../../styles/globalVariables";

export function CommentFromOther({
  item: {
    owner: { login, avatar },
    comment,
    createdAt,
  },
  commentId,
}) {
  const user = auth.currentUser;
  return (
    <PostIdContext.Consumer>
      {({ postId, owner }) => {
        return (
          <View style={styles.person}>
            <View style={styles.column}>
              <Image style={styles.image} source={{ uri: avatar }} />
              <Text style={styles.dateTime}>{login}</Text>
            </View>
            <View
              style={[
                styles.text,
                { borderRadius: 12, borderTopLeftRadius: 0 },
              ]}
            >
              {user.uid === owner.userId && (
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={globalVariables.color.lightGrey3}
                  style={{ position: "absolute", top: 3, right: 7 }}
                  onPress={() => {
                    deleteComment(postId, commentId);
                  }}
                />
              )}
              <Text style={styles.content}>{comment}</Text>
              <Text style={styles.dateTime}>{dateConverter(createdAt)}</Text>

              {/* <TouchableOpacity >
          <Text style={[styles.dateTime, { marginTop: 7 }]}>Add like</Text>
        </TouchableOpacity> */}
            </View>
          </View>
        );
      }}
    </PostIdContext.Consumer>
  );
}

export function CommentOwn({
  item: {
    owner: { login, avatar },
    comment,
    createdAt,
  },
  commentId,
}) {
  const user = auth.currentUser;

  return (
    <PostIdContext.Consumer>
      {({ postId, owner }) => (
        <View style={styles.person}>
          <View
            style={[styles.text, { borderRadius: 12, borderTopRightRadius: 0 }]}
          >
            {owner.userId === user.uid && (
              <Ionicons
                name="trash-outline"
                size={20}
                color={globalVariables.color.lightGrey3}
                style={{ position: "absolute", top: 3, right: 7 }}
                onPress={() => {
                  deleteComment(postId, commentId);
                }}
              />
            )}
            <Text style={styles.content}>{comment}</Text>
            <Text style={styles.dateTime}>{dateConverter(createdAt)}</Text>
          </View>
          <View style={styles.column}>
            <Image style={styles.image} source={{ uri: avatar }} />
            <Text style={styles.dateTime}>{login}</Text>
          </View>
        </View>
      )}
    </PostIdContext.Consumer>
  );
}

const styles = StyleSheet.create({
  person: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 12,
    marginBottom: 15,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginBottom: 7,
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: 300,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  content: {
    color: "#212121",
    fontWeight: "400",
    fontSize: 13,
    textAlign: "left",
    marginBottom: 1,
  },
  dateTime: {
    color: globalVariables.color.lightGrey3,
    fontSize: 10,
    fontWeight: "400",
    textAlign: "right",
  },
});

export function Comment({ item, commentId }) {
  const user = auth.currentUser;

  return item.owner.userId === user.uid ? (
    <CommentOwn item={item} commentId={commentId} />
  ) : (
    <CommentFromOther item={item} commentId={commentId} />
  );
}

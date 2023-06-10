import { StyleSheet, Text, View, Image } from "react-native";
import { dateConverter } from "../../helpers";
import { auth } from "../../firebase/config";

export function CommentFromOther({
  item: {
    owner: { login, avatar },
    comment,
    createdAt,
  },
}) {
  return (
    <View style={styles.person}>
      <View style={styles.column}>
        <Image style={styles.image} source={{ uri: avatar }} />
        <Text style={styles.dateTime}>{login}</Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.content}>{comment}</Text>
        <Text style={styles.dateTime}>{dateConverter(createdAt)}</Text>
      </View>
    </View>
  );
}

export function CommentOwn({
  item: {
    owner: { login, avatar },
    comment,
    createdAt,
  },
}) {
  return (
    <View style={styles.person}>
      <View style={styles.text}>
        <Text style={styles.content}>{comment}</Text>
        <Text style={styles.dateTime}>{dateConverter(createdAt)}</Text>
      </View>
      <View style={styles.column}>
        <Image style={styles.image} source={{ uri: avatar }} />
        <Text style={styles.dateTime}>{login}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  person: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 12,
    marginBottom: 15,
    marginLeft: 20,
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
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopRightRadius: 0,
  },
  content: {
    color: "#212121",
    fontWeight: "400",
    fontSize: 13,
    textAlign: "left",
    marginBottom: 10,
  },
  dateTime: {
    color: "#BDBDBD",
    fontSize: 10,
    fontWeight: "400",
    textAlign: "right",
  },
});

export function Comment({ item }) {
  const user = auth.currentUser;
  return item.owner.login === user.displayName ? (
    <CommentOwn item={item} />
  ) : (
    <CommentFromOther item={item} />
  );
}

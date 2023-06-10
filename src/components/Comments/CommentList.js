import { View, FlatList, Image, StyleSheet } from "react-native";
import { Comment } from "./Comment";

export const CommentsList = ({ allComments, photo }) => {
  return (
    <View style={styles.main}>
      <FlatList
        data={allComments}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => (
          <>
            {index === 0 && (
              <Image source={{ uri: photo }} style={styles.photo} />
            )}
            <Comment item={item} />
          </>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    backgroundColor: "#fff",
    borderColor: "grey",
    borderWidth: 1,
  },
  parent: {
    marginHorizontal: 20,
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 370,
    height: 240,
    backgroundColor: "#f6f6f6",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
});

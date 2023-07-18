import { View, FlatList, Image, StyleSheet } from "react-native";
import { Comment } from "./Comment";

import { globalVariables } from "../../../styles/globalVariables";

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
            <Comment commentId={item.id} item={item} />
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
    paddingBottom: 50,
    backgroundColor: globalVariables.color.white,
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
    backgroundColor: globalVariables.color.lightGrey1,
    borderColor: globalVariables.color.white,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 8,
    borderColor: globalVariables.color.lightGrey2,
  },
});

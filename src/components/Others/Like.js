import { View, Image, Text } from "react-native";

export function LikeInfo({ like }) {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 7,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Image
        source={{ uri: like.owner.avatar }}
        style={{
          width: 50,
          height: 50,
          borderWidth: 1,
          borderColor: "grey",
          borderRadius: 50,
          backgroundColor: "lightgrey",
          marginRight: 15,
        }}
      />
      <Text style={{ fontSize: 16, fontWeight: "500" }}>
        {like.owner.login}
      </Text>
    </View>
  );
}

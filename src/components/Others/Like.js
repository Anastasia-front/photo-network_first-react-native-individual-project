import { View, Image, Text } from "react-native";

import { globalVariables } from "../../../styles/globalVariables";

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
          borderColor: globalVariables.color.grey,
          borderRadius: 50,
          backgroundColor: "#E8E8E8",
          marginRight: 15,
        }}
      />
      <Text style={{ fontSize: 16, fontWeight: "500" }}>
        {like.owner.login}
      </Text>
    </View>
  );
}

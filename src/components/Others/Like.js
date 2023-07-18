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
          borderWidth: globalVariables.border.main,
          borderColor: globalVariables.color.grey,
          borderRadius: globalVariables.radius.circle,
          backgroundColor: globalVariables.color.lightGrey2,
          marginRight: 15,
        }}
      />
      <Text
        style={{
          fontSize: globalVariables.font.size.md,
          fontWeight: globalVariables.font.weight.medium,
        }}
      >
        {like.owner.login}
      </Text>
    </View>
  );
}

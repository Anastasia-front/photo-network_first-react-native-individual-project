import { View, ActivityIndicator, StyleSheet } from "react-native";

export const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={styles.loader.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loader: {
    color: "#FF6C00",
  },
});

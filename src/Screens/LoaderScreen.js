import {
  View,
  ActivityIndicator,
  // ProgressViewIOSComponent,
  StyleSheet,
} from "react-native";

// import { ProgressViewIOS } from "@react-native-community/progress-view";

export const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      {/* <ProgressViewIOS style={styles.progress} progress={0.5} /> */}
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
    color: "#2D767F",
  },
  // progress: {
  //   width: 200,
  //   height: 20,
  // },
});

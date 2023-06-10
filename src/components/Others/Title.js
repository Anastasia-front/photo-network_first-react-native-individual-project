import { Text, StyleSheet } from "react-native";

const Title = ({ title, top }) => {
  const titleStyle = StyleSheet.compose(styles.title, {
    marginTop: top,
  });
  return <Text style={titleStyle}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 33,
    fontWeight: "500",
    fontSize: 30,
    letterSpacing: 0.01,
  },
});

export default Title;

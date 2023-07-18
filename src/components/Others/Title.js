import { Text, StyleSheet } from "react-native";

import { globalVariables } from "../../../styles/globalVariables";

const Title = ({ title, top }) => {
  const titleStyle = StyleSheet.compose(styles.title, {
    marginTop: top,
  });
  return <Text style={titleStyle}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 33,
    fontWeight: globalVariables.font.weight.medium,
    fontSize: globalVariables.font.size.xl,
    letterSpacing: globalVariables.letterSpacing,
  },
});

export default Title;

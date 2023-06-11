import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";

export default function CustomButton({ text, width, onPress }) {
  const buttonStyle = StyleSheet.compose(styles.btn, {
    width: width,
  });
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#2D767F",
    borderRadius: "100px",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginVertical: 16,
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 16,
    color: "#fff",
  },
});

export function UnactiveButton({ text, width, onPress }) {
  const buttonStyle = StyleSheet.compose(style.btn, {
    width: width,
  });
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  btn: {
    backgroundColor: "#F6F6F6",
    borderRadius: "100px",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginVertical: 16,
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 16,
    color: "#BDBDBD",
  },
});

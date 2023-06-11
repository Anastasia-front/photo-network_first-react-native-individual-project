import { LikeInfo } from "./Like";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const Modalka = ({ modalVisible, setModalVisible, title, likes }) => {
  const closeAndElevate = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
        <View>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: "orange",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              },
            ]}
          >
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={closeAndElevate}
            >
              <AntDesign name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: "white",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              },
            ]}
          >
            <FlatList
              style={styles.paddingBottom}
              data={likes}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => <LikeInfo like={item} />}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#dadee6",
  },
  modalView: {
    marginHorizontal: 16,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  modalSubTitle: {
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  buttonClose: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 4,
  },
  mapWrp: {
    height: "80%",
    width: "90%",
    borderRadius: 8,
    overflow: "hidden",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});

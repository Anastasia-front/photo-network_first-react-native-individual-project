import { LikeInfo } from "./Like";
import Input from "../Inputs/Input";
import CustomButton, { UnactiveButton } from "../Others/Button";
import { LoaderScreen } from "../../Screens/LoaderScreen";
import { validateName, useKeyboardListener } from "../../utils";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { authUpdateUserLogin } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

import { globalVariables } from "../../../styles/globalVariables";

export const ModalLikes = ({ modalLikes, setModalLikes, title, likes }) => {
  const [isPressed, setIsPressed] = useState(false);

  const closeAndElevate = () => {
    setModalLikes(!modalLikes);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalLikes}
      onRequestClose={() => {
        setModalLikes(!modalLikes);
      }}
    >
      <TouchableWithoutFeedback onPress={closeAndElevate}>
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
                {isPressed ? (
                  <View>
                    <Ionicons
                      name="close-circle"
                      size={25}
                      color="white"
                      style={{ marginRight: 25 }}
                      onPress={() => setIsPressed(!isPressed)}
                    />
                  </View>
                ) : (
                  <Ionicons
                    name="close-circle-outline"
                    size={25}
                    color="white"
                    style={{ marginRight: 25 }}
                  />
                )}
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
                data={likes}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => <LikeInfo like={item} />}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export const ModalPhoto = ({ modalPhoto, setModalPhoto, photo }) => {
  const [isPressed, setIsPressed] = useState(false);

  const closeAndElevate = () => {
    setModalPhoto(!modalPhoto);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalPhoto}
      onRequestClose={() => {
        setModalPhoto(!modalPhoto);
      }}
    >
      <TouchableWithoutFeedback onPress={closeAndElevate}>
        <View style={styles.container}>
          <View>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: "lightgrey",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  paddingBottom: 40,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={closeAndElevate}
              >
                {isPressed ? (
                  <View>
                    <Ionicons
                      name="close-circle"
                      size={35}
                      color={globalVariables.color.grey}
                      style={{ marginRight: 10 }}
                      onPress={() => setIsPressed(!isPressed)}
                    />
                  </View>
                ) : (
                  <Ionicons
                    name="close-circle-outline"
                    size={35}
                    color={globalVariables.color.grey}
                    style={{ marginRight: 10 }}
                  />
                )}
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
              <Image style={styles.photo} source={{ uri: photo }} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export const ModalLogin = ({ modalLogin, setModalLogin, oldLogin, title }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [login, setLogin] = useState(oldLogin);
  const { keyboardHeight } = useKeyboardListener(150);
  const dispatch = useDispatch();

  const closeAndElevate = () => {
    setModalLogin(!modalLogin);
  };

  const changeLogin = async () => {
    setIsShowLoader(true);

    dispatch(authUpdateUserLogin({ login })).then((data) => {
      if (data === undefined || !data.userId) {
        setIsShowLoader(false);
        console.log(data);
        alert(`Реєстрацію не виконано!`);
        return;
      }
      setModalLogin(!modalLogin);
      alert("Успішна зміна логіну!");
    });

    setIsShowLoader(false);
  };

  if (isShowLoader) {
    return <LoaderScreen />;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalLogin}
      onRequestClose={() => {
        setModalLogin(!modalLogin);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log("Button pressed");
        }}
      >
        <View style={[styles.container, { paddingBottom: keyboardHeight }]}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: "teal",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                paddingBottom: 20,
              },
            ]}
          >
            <Text style={[styles.modalTitle, { marginTop: 10 }]}>{title}</Text>
            <TouchableOpacity
              style={[styles.buttonClose, { top: 3 }]}
              onPress={closeAndElevate}
            >
              {isPressed ? (
                <View>
                  <Ionicons
                    name="close-circle"
                    size={35}
                    color="white"
                    style={{ marginRight: 10 }}
                    onPress={() => setIsPressed(!isPressed)}
                  />
                </View>
              ) : (
                <Ionicons
                  name="close-circle-outline"
                  size={35}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              )}
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
            <Text style={{ padding: 10 }}>Введіть нижче бажаний нік👇🏻</Text>
            <Input
              inputMode="text"
              placeholder="Логін"
              value={login}
              onChangeText={setLogin}
              onBlur={validateName}
            />
            <View style={{ marginTop: -20 }}>
              {login !== oldLogin ? (
                <CustomButton text="Змінити" onPress={changeLogin} />
              ) : (
                <UnactiveButton text="Змінити" />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  photo: {
    borderRadius: 8,
    width: 350,
    height: 600,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    marginHorizontal: 16,
    padding: 5,
    alignItems: "center",
    shadowColor: "#212121",
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

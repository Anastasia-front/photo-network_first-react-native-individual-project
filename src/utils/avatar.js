import { View, Image, TouchableOpacity } from "react-native";

function style(photoImageTop, psevdoTop, psevdoRight, avatar) {
  const styles = {
    photoImage: {
      width: 120,
      height: 120,
      position: "absolute",
      top: photoImageTop,
      left: "48%",
      transform: [{ translateX: -50 }, { translateY: -50 }],
      borderRadius: 16,
      borderWidth: 0.5,
      borderColor: "grey",
      backgroundColor: "white",
    },
    psevdo: {
      position: "absolute",
      top: psevdoTop,
      right: psevdoRight,
      transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    afterElement: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 25,
      height: 25,
    },
    afterElementCircle: {
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      top: 0,
      backgroundColor: "#fff",
      borderColor: "#FF6C00",
      borderWidth: 1,
      borderRadius: "50%",
    },
    afterElementCircleGray: {
      borderColor: "grey",
    },
    afterElementUnion: {
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      top: 0,
    },
    afterElementVertical: {
      position: "absolute",
      width: 1,
      height: 13,
      left: 11,
      top: 5,
      backgroundColor: "#FF6C00",
    },
    afterElementVerticalGray: {
      backgroundColor: "grey",
      transform: [{ rotate: "45deg" }],
    },
    afterElementHorizontal: {
      position: "absolute",
      width: 1,
      height: 13,
      left: 11,
      top: 5,
      backgroundColor: "#FF6C00",
      transform: [{ rotate: "-90deg" }],
    },
    afterElementHorizontalGray: {
      backgroundColor: "grey",
      transform: [{ rotate: "-45deg" }],
    },
  };
  const renderImage = () => {
    if (avatar === "../img/Rectangle-empty.jpg") {
      return (
        <Image
          style={styles.photoImage}
          source={require("../img/Rectangle-empty.jpg")}
        />
      );
    } else {
      if (
        avatar ===
        "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57"
      ) {
        return (
          <Image
            style={[styles.photoImage, { borderRadius: 60 }]}
            source={{ uri: avatar }}
          />
        );
      } else {
        return <Image style={styles.photoImage} source={{ uri: avatar }} />;
      }
    }
  };
  return { styles, renderImage };
}

export const avatarTemplate = (
  avatar,
  photoImageTop,
  psevdoTop,
  psevdoRight,
  handleAvatar
) => {
  const { styles, renderImage } = style(
    photoImageTop,
    psevdoTop,
    psevdoRight,
    avatar
  );
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleAvatar();
        }}
      >
        {renderImage()}
        <View style={styles.psevdo}>
          <View style={styles.afterElement}>
            <View
              style={[
                styles.afterElementCircle,
                avatar !== "../img/Rectangle-empty.jpg" &&
                  styles.afterElementCircleGray,
              ]}
            >
              <View style={styles.afterElementUnion}>
                <View
                  style={[
                    styles.afterElementVertical,
                    avatar !== "../img/Rectangle-empty.jpg" &&
                      styles.afterElementVerticalGray,
                  ]}
                />
                <View
                  style={[
                    styles.afterElementHorizontal,
                    avatar !== "../img/Rectangle-empty.jpg" &&
                      styles.afterElementHorizontalGray,
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export const avatarRegister = (
  avatar,
  photoImageTop,
  psevdoTop,
  psevdoRight
) => {
  const { styles, renderImage } = style(
    photoImageTop,
    psevdoTop,
    psevdoRight,
    avatar
  );

  return (
    <>
      {renderImage()}
      <View style={styles.psevdo}>
        <View style={styles.afterElement}>
          <View
            style={[
              styles.afterElementCircle,
              avatar !== "../img/Rectangle-empty.jpg" &&
                styles.afterElementCircleGray,
            ]}
          >
            <View style={styles.afterElementUnion}>
              <View
                style={[
                  styles.afterElementVertical,
                  avatar !== "../img/Rectangle-empty.jpg" &&
                    styles.afterElementVerticalGray,
                ]}
              />
              <View
                style={[
                  styles.afterElementHorizontal,
                  avatar !== "../img/Rectangle-empty.jpg" &&
                    styles.afterElementHorizontalGray,
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

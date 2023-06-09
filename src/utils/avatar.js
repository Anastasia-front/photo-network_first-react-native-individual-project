import { View, Image, TouchableOpacity } from "react-native";

function style(photoImageTop, psevdoTop, psevdoRight) {
  const styles = {
    photoImage: {
      width: 120,
      height: 120,
      position: "absolute",
      top: photoImageTop,
      left: "48%",
      transform: [{ translateX: -50 }, { translateY: -50 }],
      borderRadius: 16,
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
      borderColor: "#E8E8E8",
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
      backgroundColor: "#E8E8E8",
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
      backgroundColor: "#E8E8E8",
      transform: [{ rotate: "-45deg" }],
    },
  };
  return styles;
}

export const avatarTemplate = (
  avatar,
  photoImageTop,
  psevdoTop,
  psevdoRight,
  handleAvatar
) => {
  const renderImage = () => {
    if (avatar === "../img/Rectangle-empty.jpg") {
      return (
        <Image
          style={styles.photoImage}
          source={require("../img/Rectangle-empty.jpg")}
        />
      );
    } else {
      return <Image style={styles.photoImage} source={{ uri: avatar }} />;
    }
  };

  const styles = style(photoImageTop, psevdoTop, psevdoRight);
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
  const renderImage = () => {
    if (avatar === "../img/Rectangle-empty.jpg") {
      return (
        <Image
          style={styles.photoImage}
          source={require("../img/Rectangle-empty.jpg")}
        />
      );
    } else {
      return <Image style={styles.photoImage} source={{ uri: avatar }} />;
    }
  };
  const styles = style(photoImageTop, psevdoTop, psevdoRight);

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

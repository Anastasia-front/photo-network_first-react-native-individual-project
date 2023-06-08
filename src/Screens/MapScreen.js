import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useSelector } from "react-redux";

const MapScreen = () => {
  const location = useSelector((state) => state.location);
  const handleMarkerPress = () => {
    console.log("Marker Pressed");
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            title="I am here"
            coordinate={location}
            description="Hello"
            onPressIn={handleMarkerPress}
          >
            <Callout style={{ flex: 1 }}>
              <View style={styles.calloutContainer}>
                <Text numberOfLines={2} style={{ fontSize: 16, marginLeft: 5 }}>
                  Ваш пост був опублікований тут
                </Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});

export default MapScreen;

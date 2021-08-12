import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect } from "react";
import { styleSheets } from "min-document";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";

const Map = ({ array }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          console.log(location.coords);
          setIsLoading(false);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPermission();
  }, []);

  array.forEach((elem) => {
    console.log(elem.location);
  });

  return isLoading ? (
    <ActivityIndicator style={{ marginTop: 200 }} size="large" color="blue" />
  ) : (
    <View>
      <MapView
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {array.map((elem, index) => {
          <MapView.Marker
            coordinate={{
              latitude: elem.location[1],
              longitude: elem.location[0],
            }}
            key={index}
          />;
        })}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

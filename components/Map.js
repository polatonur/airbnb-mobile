import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect } from "react";
import { styleSheets } from "min-document";
import { StyleSheet, View } from "react-native";
import React from "react";

const Map = ({ location, array }) => {
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
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPermission();
  }, []);

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {array &&
          array.map((elem) => {
            <MapView.Marker
              coordinate={{
                latitude: elem.location[1],
                longitude: elem.location[0],
              }}
              // key={index}
            />;
          })}
        {location && (
          <MapView.Marker
            coordinate={{
              latitude: location[1],
              longitude: location[0],
            }}
            // key={index}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
  },
});

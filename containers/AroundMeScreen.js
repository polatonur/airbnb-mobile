import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/core";
import LottieView from "lottie-react-native";

const AroundMe = () => {
  const [data, setData] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermision] = useState(false);

  const navigation = useNavigation();
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
          fetchData(location.coords.latitude, location.coords.longitude);
          setPermision(true);
        } else {
          alert("acces denied");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPermission();
  }, []);

  const fetchData = async (lat, long) => {
    try {
      const params = {
        latitude: lat,
        longitude: long,
      };
      // 48.83759287415216, 2.2811258344429417
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms/around",
        { params: params }
      );
      console.log(
        "-----------------------------------------------------------------locations"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <LottieView source={require("../assets/lottie.json")} autoPlay loop />
  ) : (
    // <ActivityIndicator style={{ marginTop: 250 }} size="large" color="grey" />
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
        {data.map((elem, index) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: elem.location[1],
                longitude: elem.location[0],
              }}
              key={index}
            >
              <MapView.Callout>
                <TouchableOpacity
                  onPress={() => {
                    console.log("pressed");
                    navigation.navigate("Room", {
                      id: elem._id,
                    });
                  }}
                >
                  <Text>{elem.title}</Text>
                </TouchableOpacity>
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default AroundMe;

const styles = StyleSheet.create({
  denied: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

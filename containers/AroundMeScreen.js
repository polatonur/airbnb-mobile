import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapAround from "../components/MapAround";
import { useEffect, useState } from "react";
import axios from "axios";

const AroundMe = () => {
  const [data, setData] = useState("");
  //   const[locations, setLocations] = useState[0]
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          latitude: 48.856614,
          longitude: 2.3522219,
        };
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
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator style={{ marginTop: 200 }} size="large" color="blue" />
  ) : (
    <View>
      <MapAround array={data} />
    </View>
  );
};

export default AroundMe;

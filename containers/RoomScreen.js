import React from "react";
import { useRoute } from "@react-navigation/core";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Swiper from "../components/swiperApp";
import Stars from "../components/Stars";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Map from "../components/Map";

export default function RoomScreen({ route }) {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  const { params } = useRoute();
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={styles.scrollView}>
      <View style={styles.photos}>
        <Swiper data={data.photos} />
        <View style={styles.price_block}>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
      </View>
      <View style={styles.card_bottom}>
        <View style={styles.card_bottom_col_1}>
          <Text numberOfLines={1} style={styles.title}>
            {data.title}
          </Text>
          <View style={styles.rating}>
            <Stars rate={data.ratingValue} review={data.review} />
            <Text style={styles.review_number}> {data.reviews}</Text>
            <Text style={styles.review_text}> reviews</Text>
          </View>
        </View>
        <Image
          style={styles.avatar}
          source={{ uri: data.user.account.photo.url }}
        />
      </View>
      <Text numberOfLines={!showText ? 3 : null} style={styles.description}>
        {data.description}
      </Text>

      <Text
        onPress={() => {
          setShowText(!showText);
        }}
        style={styles.more_icon}
      >
        {" "}
        Show
        {!showText ? " more ▼ " : " less ▲"}
      </Text>
      <Map location={data.location} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  // more_block: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // more: {
  //   paddingLeft: 20,
  //   fontSize: 16,
  //   color: "grey",
  // },
  more_icon: {
    marginVertical: 20,
    paddingLeft: 20,
    color: "grey",
    paddingTop: 10,
    fontSize: 14,
  },
  scrollView: {
    backgroundColor: "white",
  },
  description: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    lineHeight: 20,
    fontSize: 16,
  },
  review_number: {
    fontSize: 12,
    color: "#BBBBBB",
  },
  review_text: {
    fontSize: 12,
    color: "#BBBBBB",
  },
  rating: {
    // backgroundColor: "blue",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  card_bottom: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  title: {
    fontSize: 20,
    marginBottom: 14,
  },
  card_bottom_col_1: {
    justifyContent: "center",
    width: "70%",
  },
  price_block: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 4,
    position: "absolute",
    backgroundColor: "black",
    width: 100,
    height: 60,
    left: 5,
    top: 200,
  },
  price: {
    color: "white",
    fontSize: 22,
  },
});

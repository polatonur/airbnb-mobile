import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Stars from "../components/Stars";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log("er");
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.main}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="grey"
        currentHeight="10"
      />

      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("Room", {
                id: item._id,
              });
            }}
          >
            <View style={styles.price_block}>
              <Text style={styles.price}>{item.price} €</Text>
            </View>
            <ScrollView horizontal={true}>
              {
                <FlatList
                  style={styles.carousel}
                  data={item.photos}
                  keyExtractor={(item) => String(item.picture_id)}
                  renderItem={({ item }) => (
                    <Image style={styles.photo} source={{ uri: item.url }} />
                  )}
                />
              }
            </ScrollView>
            <View style={styles.card_bottom}>
              <View style={styles.card_bottom_col_1}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>

                <View style={styles.rating}>
                  <Stars rate={item.ratingValue} review={item.review} />
                  <Text style={styles.review_number}> {item.reviews}</Text>
                  <Text style={styles.review_text}> reviews</Text>
                </View>
              </View>
              <Image
                style={styles.avatar}
                source={{ uri: item.user.account.photo.url }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  main: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  card: {
    height: 300,
    position: "relative",
    marginVertical: 9,
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 2,
    borderStyle: "solid",
    paddingBottom: 10,
  },
  carousel_img: {
    height: 20,
    width: 18,
  },
  carousel: {
    height: 200,
    flexDirection: "row",
  },
  photo: {
    marginHorizontal: 5,
    width: 370,
    height: 200,
  },
  card_bottom: {
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
    width: 90,
    height: 50,
    left: 5,
    top: 140,
  },
  price: {
    color: "white",
    fontSize: 20,
  },
});

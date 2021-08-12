import React from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const Swiper = ({ data }) => {
  console.log(data[0].url);

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        showPagination
      >
        {data.map((elem, index) => {
          return (
            <Image
              key={index}
              source={{ uri: elem.url }}
              style={[styles.child, { backgroundColor: "tomato" }]}
            ></Image>
          );
        })}
      </SwiperFlatList>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  child: { width: width, height: 270 },
  text: { fontSize: width * 0.5, textAlign: "center" },
});

export default Swiper;

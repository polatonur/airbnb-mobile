import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Stars = ({ rate, review }) => {
  const array1 = [];
  for (let i = 0; i < rate; i++) {
    array1.push(1);
  }
  const array2 = [];
  for (let i = 0; i < 5 - rate; i++) {
    array2.push(1);
  }
  return (
    <View style={styles.main}>
      {array1.map((elem, index) => {
        return (
          <Entypo
            key={index}
            style={styles.star}
            name="star"
            size={20}
            color="#F2B544"
          />
        );
      })}
      {array2.map((elem, index) => {
        return <Entypo key={index} name="star" size={20} color="#BBBBBB" />;
      })}
    </View>
  );
};

export default Stars;

const styles = StyleSheet.create({
  main: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  star: {
    marginRight: 4,
  },
});

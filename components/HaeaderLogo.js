import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";

const HeaderLogo = () => {
  return (
    <View style={styles.main}>
      <Image
        style={styles.logo}
        source={require("../assets/airbnb.png")}
      ></Image>
    </View>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    height: 28,
    width: 25,
  },
});

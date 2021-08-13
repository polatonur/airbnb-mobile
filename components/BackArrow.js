import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/core";

const BackArrow = () => {
  const navigation = useNavigation();
  return (
    <Ionicons
      onPress={() => {
        navigation.goBack();
      }}
      name="arrow-back-outline"
      size={24}
      color="grey"
      style={{ paddingLeft: 8 }}
    />
  );
};

export default BackArrow;

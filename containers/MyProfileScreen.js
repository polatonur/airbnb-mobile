import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function MyProfileScreen({ setToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [describe, setDescribe] = useState("");
  const [imageuri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("=====================response profile====================");

    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("userToken");

        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        console.log(response.data.photo[0].url);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescribe(response.data.description);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, []);

  /////// Get Photo From Lab

  const getPictureFromLibrary = async () => {
    const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(response);
    if (response.status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync();
      console.log(image);
      if (!image.cancelled) {
        console.log(image.uri);
        setImageUri(image.uri);
      } else {
        alert("cancelled");
      }
    } else {
      alert("permission denied");
    }
  };

  /////// Take a photo with camera
  const takeAPhoto = async () => {
    const response = await ImagePicker.requestCameraPermissionsAsync();
    console.log(response);
    if (response.status === "granted") {
      const image = await ImagePicker.launchCameraAsync();
      console.log(image);
      if (!image.cancelled) {
        setImageUri(image.uri);
      } else {
        alert("cancelled");
      }
    } else {
      alert("permission denied");
    }
  };

  // /////// Update User Data
  const updateUserData = async () => {
    setUploading(true);
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userId");

    if (imageuri) {
      try {
        const formData = new FormData();
        const uriExtension = imageuri.split(".").pop();
        formData.append("photo", {
          uri: imageuri,
          name: `MyAvatarPhoto.${uriExtension}`,
          type: `image/${uriExtension}`,
        });
        const response = await axios.put(
          `https://express-airbnb-api.herokuapp.com/user/upload_picture/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setMessage("Your profile has been successfully updated");
      } catch (error) {
        console.log(error.message);
        setMessage("An error occured when updating your photo");
      }
      setUploading(false);
    }
    if (email || describe || username) {
      try {
        const response = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/update",
          {
            email: email,
            description: describe,
            username: username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("Your profile has been successfully updated");
      } catch (error) {
        console.log(error.message);
        setMessage("An error occured when updating your profile information");
      }
      setUploading(false);
    }
  };
  return isLoading ? (
    <LottieView source={require("../assets/lottie.json")} autoPlay loop />
  ) : (
    <ScrollView style={styles.scroll}>
      <View style={styles.change_avatar}>
        <View style={styles.change_avatar_col_1}>
          {imageuri ? (
            <Image style={styles.avatar_photo} source={{ uri: imageuri }} />
          ) : userData.photo ? (
            <Image
              style={styles.avatar_photo}
              source={{ uri: userData.photo[0].url }}
            />
          ) : (
            <MaterialCommunityIcons
              name="account"
              size={150}
              color="lightgrey"
            />
          )}
        </View>
        <View style={styles.change_avatar_col_2}>
          <TouchableOpacity style={styles.button_photo}>
            <MaterialIcons
              onPress={() => {
                getPictureFromLibrary();
              }}
              name="photo-library"
              size={38}
              color="grey"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_photo}>
            <MaterialIcons
              onPress={() => {
                takeAPhoto();
              }}
              name="photo-camera"
              size={38}
              color="grey"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* inputs */}
      <View style={styles.form}>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          value={username}
          style={styles.input}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          value={describe}
          style={styles.describe}
          multiline={true}
          numberOfLines={3}
          onChangeText={(text) => {
            setDescribe(text);
          }}
        />
        {uploading ? (
          <ActivityIndicator size={24} color="grey" />
        ) : (
          <Text style={styles.error}>{message}</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            updateUserData();
          }}
          style={styles.btn}
        >
          <Text style={styles.text_btn}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "lightgrey" }]}
          onPress={() => {
            setToken(null);
          }}
        >
          <Text style={styles.text_btn}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
  },
  form: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  change_avatar: {
    height: 200,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  change_avatar_col_1: {
    justifyContent: "center",
    alignItems: "center",
    height: 180,
    width: 180,
    borderColor: "#FFBAC0",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 90,
    backgroundColor: "white",
  },
  change_avatar_col_2: {
    paddingLeft: 20,
  },
  button_photo: {
    marginVertical: 16,
  },
  input: {
    width: "100%",
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    borderStyle: "solid",
    paddingVertical: 15,
    marginBottom: 30,
  },
  describe: {
    textAlignVertical: "top",
    justifyContent: "flex-start",
    paddingVertical: 15,
    height: 100,
    width: "100%",
    borderColor: "#FFBAC0",
    borderWidth: 2,
    borderStyle: "solid",
    paddingVertical: 15,
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  text_btn: {
    fontSize: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#F9585C",
    borderWidth: 3,
    borderStyle: "solid",
    borderRadius: 30,
  },
  avatar_photo: {
    height: 180,
    width: 180,
    borderRadius: 90,
  },
  error: {
    color: "red",
    width: "100%",
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

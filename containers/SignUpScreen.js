import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";

import {
  StatusBar,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const SignUpScreen = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [describe, setDescribe] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  console.log(
    `email:${email} username:${username} password:${password} desc:${describe}`
  );
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!(username || email || password || describe || confirm)) {
      setMessage("Fill in all fields");
    } else if (password !== confirm) {
      setMessage("Passwords doesn't match");
    } else {
      const params = {
        email: email,
        username: username,
        password: password,
        description: describe,
      };
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          params
        );
        console.log("post");
        console.log(response.data);
        setToken(response.data.token);
      } catch (error) {
        console.log("err");
        console.log(error.message);
      }
    }
  };
  return (
    // <KeyboardAwareScrollView>
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="dark" />
        <View style={styles.main}>
          <Image style={styles.logo} source={require("../assets/airbnb.png")} />
          <Text style={styles.signup}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.describe}
            placeholder="Describe yoursels in few words"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => {
              setDescribe(text);
            }}
          />
          <TextInput
            onChangeText={(text) => {
              setPassword(text);
            }}
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={(text) => {
              setConfirm(text);
            }}
            style={styles.input}
            placeholder="confirm password"
            secureTextEntry={true}
          />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.btn} onPress={handleSignup}>
            <Text style={styles.signup_btn}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.bottom_text}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    // </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
  },
  //-----------------scrolview------------------------
  scrollView: {
    backgroundColor: "white",
  },

  main: {
    paddingHorizontal: 40,
    marginTop: 60,
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 110,
    resizeMode: "contain",
  },
  signup: {
    marginVertical: 30,
    fontSize: 30,
  },
  input: {
    textTransform: "lowercase",
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
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  signup_btn: {
    fontSize: 20,
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    borderColor: "#F9585C",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 30,
  },
  bottom_text: {
    marginTop: 20,
    marginBottom: 30,
  },
});

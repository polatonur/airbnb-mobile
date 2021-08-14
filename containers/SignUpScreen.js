import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

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
  ActivityIndicator,
} from "react-native";

const SignUpScreen = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [describe, setDescribe] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [displayPass, setDisplayPass] = useState(false);
  const [activity, setActivity] = useState(false);
  console.log(
    `email:${email} username:${username} password:${password} desc:${describe}`
  );
  const navigation = useNavigation();

  const handleSignup = async () => {
    setActivity(true);
    console.log(!username || !email || !password || !describe || !confirm);
    if (!username || !email || !password || !describe || !confirm) {
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
        setToken(response.data.token, response.data.id);
        setMessage("");
      } catch (error) {
        console.log("error");
        if (
          error.response.data.error ===
            "This username already has an account." ||
          error.response.data.error === "This email already has an account."
        ) {
          setMessage(error.response.data.error);
        } else {
          setMessage("An error occurred");
        }
      }
    }
    setActivity(false);
  };
  return (
    // <KeyboardAwareScrollView
    //   keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
    // >
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
            value={username}
            style={styles.input}
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            value={describe}
            style={styles.describe}
            placeholder="Describe yoursels in few words"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => {
              setDescribe(text);
            }}
          />
          <View style={{ position: "relative", width: "100%" }}>
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              style={styles.input}
              placeholder="password"
              secureTextEntry={displayPass ? false : true}
            />
            <FontAwesome
              style={styles.eye}
              name={displayPass ? "eye-slash" : "eye"}
              size={20}
              color="grey"
              onPress={() => {
                setDisplayPass(!displayPass);
              }}
            />
          </View>
          <View style={{ position: "relative", width: "100%" }}>
            <TextInput
              value={confirm}
              onChangeText={(text) => {
                setConfirm(text);
              }}
              style={styles.input}
              placeholder="confirm password"
              secureTextEntry={displayPass ? false : true}
            />
            <FontAwesome
              style={styles.eye}
              name={displayPass ? "eye-slash" : "eye"}
              size={20}
              color="grey"
              onPress={() => {
                setDisplayPass(!displayPass);
              }}
            />
          </View>
          {!activity ? (
            <Text style={styles.message}>{message}</Text>
          ) : (
            <ActivityIndicator />
          )}
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
  eye: {
    position: "absolute",
    right: 2,
    top: 8,
  },
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
  message: {
    color: "red",
    fontSize: 20,
  },
});

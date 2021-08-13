import React from "react";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";

import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";
import { set } from "react-native-reanimated";

const SignInScreen = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [displayPass, setDisplayPass] = useState(false);
  const [activity, setActivity] = useState(false);

  const navigation = useNavigation();

  const handleSignin = async () => {
    if (password && email) {
      setActivity(true);
      const params = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          params
        );
        console.log(response.data.token);
        setToken(response.data.token);
        setMessage("");
      } catch (error) {
        if (error.response.status === 401) {
          setMessage("User not found");
        } else {
          setMessage("An error occured");
        }

        console.log(error.response);
      }
      setActivity(false);
    } else {
      setMessage("Please fill in all fiels ");
    }
  };
  return (
    // <KeyboardAwareScrollView>
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="dark" />
        <View style={styles.main}>
          <View>
            <Image
              style={styles.logo}
              source={require("../assets/airbnb.png")}
            />
            <Text style={styles.signin}>Sign In</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              value={email}
              placeholder="email"
              style={styles.input}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <View style={{ position: "relative", width: "100%" }}>
              <TextInput
                value={password}
                placeholder="password"
                style={styles.input}
                secureTextEntry={displayPass ? false : true}
                onChangeText={(text) => {
                  setPassword(text);
                }}
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
          </View>
          <View>
            {!activity ? (
              <Text style={styles.message}>{message}</Text>
            ) : (
              <ActivityIndicator />
            )}

            <TouchableOpacity style={styles.btn} onPress={handleSignin}>
              <Text style={styles.signin_btn}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.bottom_text}>No account ? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    // </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
  },
  //-----------------scrolview------------------------
  scrollView: {
    backgroundColor: "white",
  },

  main: {
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    paddingHorizontal: 40,
    marginVertical: 40,
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 110,
    resizeMode: "contain",
  },
  signin: {
    marginVertical: 30,
    marginBottom: 60,
    fontSize: 30,
  },
  form: {
    width: "100%",
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
  signin_btn: {
    paddingVertical: 10,
    fontSize: 15,
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
  },
  eye: {
    position: "absolute",
    right: 2,
    top: 8,
  },
  message: {
    color: "red",
    fontSize: 20,
  },
});

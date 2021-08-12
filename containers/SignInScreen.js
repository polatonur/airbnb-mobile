import React from "react";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

const SignInScreen = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigation = useNavigation();

  const handleSignin = async () => {
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
    } catch (error) {
      console.log(error.message);
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
              placeholder="email"
              style={styles.input}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              placeholder="password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.btn} onPress={handleSignin}>
              <Text style={styles.message}>{message}</Text>

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
  signin_btn: {
    fontSize: 15,
    paddingBottom: 18,
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
});

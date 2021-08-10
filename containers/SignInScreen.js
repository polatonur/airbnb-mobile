import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";

export default function SignInScreen({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="dark" />
        <View style={styles.main}>
          <Image style={styles.logo} source={require("../assets/airbnb.png")} />
          <Text style={styles.signin}>Sign In</Text>
          <TextInput
            placeholder="username"
            style={styles.input}
            onChangeText={(text) => {
              setUsername(text);
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
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
            <Text style={styles.message}>{message}</Text>

            <Text style={styles.signup_btn}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.bottom_text}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  //-----------------scrolview------------------------
  scrollView: {
    backgroundColor: "white",
  },

  main: {
    paddingHorizontal: 40,
    marginTop: 120,
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
    paddingVertical: 13,
  },
  btn: {
    marginTop: 60,
    borderColor: "#F9585C",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 30,
  },
  bottom_text: {
    marginTop: 20,
    marginBottom: 90,
  },
});

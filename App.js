import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import HeaderLogo from "./components/HaeaderLogo";
import RoomScreen from "./containers/RoomScreen";
import AroundMe from "./containers/AroundMeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    console.log("token");
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen name="SignIn" options={{ headerShown: false }}>
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" options={{ headerShown: false }}>
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Tab">
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitle: (props) => <HeaderLogo {...props} />,
                        }}
                      >
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        options={{
                          headerTitle: (props) => <HeaderLogo {...props} />,
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Around me"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          headerTitle: (props) => <HeaderLogo {...props} />,
                        }}
                      >
                        {(props) => <AroundMe {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Settings"
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { ActivityIndicator, View } from "react-native";
// Note: Fixed typo in filename 'AuthContntext'
import { useAuth } from "../../context/AuthContntext";

export default function TabsLayout() {
  const { userToken, loading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#166534" />
      </View>
    );
  }

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#166534" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: "Packages",
          tabBarIcon: ({ color }) => <Feather name="shopping-cart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          // Hide the login tab if the user is already logged in
          href: userToken ? null : "/(tabs)/login",
          tabBarIcon: ({ color }) => <AntDesign name="login" size={24} color={color} />,
          // Hide the tab bar on the login screen itself
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
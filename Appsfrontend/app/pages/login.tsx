import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Login() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-green-500 text-center mb-2">
          Get Started
        </Text>
        <Text className="text-center text-gray-500 mb-8">
          Enter your details to pick fresh food
        </Text>

        <View className="mb-5">
          <Text className="text-gray-600 mb-2">Email</Text>
          <TextInput
            placeholder="Enter Email"
            className="border-b border-gray-200 py-2 text-base"
            keyboardType="email-address"
          />
        </View>

        <View className="mb-5">
          <Text className="text-gray-600 mb-2">Password</Text>
          <TextInput
            placeholder="Enter Password"
            className="border-b border-gray-200 py-2 text-base"
            secureTextEntry
          />
        </View>

        <TouchableOpacity className="bg-green-500 py-4 rounded-full items-center mt-8">
          <Text className="text-white font-bold text-base">CONTINUE</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-gray-200 py-4 rounded-full items-center mt-4">
          <Text className="text-gray-800 text-base">Sign in with Google</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-5">
          <Text className="text-gray-500">Don't have an account? </Text>
          <Text className="text-blue-500 font-semibold">Sign Up</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

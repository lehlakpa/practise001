import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E9F5C9" }}>
      <StatusBar style="dark" />

      <View className="flex-1 items-center justify-between px-6 py-10">
        {/* Logo / Title */}
        <Text className="text-3xl font-extrabold text-green-900">
          Bito
        </Text>

        {/* Mascot */}
              <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBdOS9urvCMKim2NZyA1oRs0ZjRHp1qGpHyw&s",
          }}
          style={{ width: 260, height: 260 }}
          resizeMode="contain"
        />

        {/* Text Content */}
        <View className="items-center">
          <Text className="text-xl font-bold text-gray-900 text-center">
            Track calories daily, reach{"\n"}your health goals
          </Text>

          <Text className="text-sm text-gray-600 text-center mt-3 px-4">
            This app simplifies nutrition and makes healthy
            living truly achievable.
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="w-full py-4 rounded-full bg-lime-400"
        >
          <Text className="text-center text-base font-bold text-green-900">
            Get Ready
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

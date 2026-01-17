import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect } from "react";

export default function OnboardingScreen() {
  const navigation = useNavigation();

  useEffect(()=>{
    navigation.setOptions({headerShown:false});
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor: "#E9F5C9" }}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, backgroundColor: "#E9F5C9" }}>
        {/* Logo / Title */}
        <Text style={{ fontSize: 50, textAlign: "center",fontFamily: "Inter-Bold", color: "#166534" }}>
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
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontFamily: "Inter-Bold", fontSize: 22, color: "#166534", textAlign: "center" }}>
            Track calories daily, reach{"\n"}your health goals
          </Text>

          <Text style={{ fontFamily: "Inter-Regular" , fontSize: 16, color: "#166534", textAlign: "center", marginTop: 10, lineHeight: 22 }}>
            This app simplifies nutrition and makes healthy
            living truly achievable.
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="w-full py-4 rounded-full bg-lime-400"
          onPress={() => router.replace("/(tabs)/home")}
        >
         <Text style={{ fontFamily:"Inter-Bold", color: "#ffffff", fontSize: 16, textAlign: "center" }}>
          Get Started
         </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

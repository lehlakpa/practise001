import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { AuthProvider } from "@/context/AuthContntext";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/font/Montserrat-Black.ttf'),
    'Inter-Bold': require('../assets/font/Montserrat-BlackItalic.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />; // or a loading spinner
  }
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>

  );
}
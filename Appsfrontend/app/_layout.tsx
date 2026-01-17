import { Stack  } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/font/Montserrat-Black.ttf'),
    'Inter-Bold': require('../assets/font/Montserrat-BlackItalic.ttf'),
   });

  if (!fontsLoaded) {
    return <ActivityIndicator />; // or a loading spinner
  }
  return (
    <Stack />
  );
}
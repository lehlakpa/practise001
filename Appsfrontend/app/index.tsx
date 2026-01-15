import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View>
    <View>
      <Text>Home</Text>
      <Button
        title="Go to About"
        onPress={() => router.push("/about")}
      />
    </View>
    <View>
      <Text>profile</Text>
      <Button
        title="Go to Profile"
        onPress={() => router.push("/profile")}
      />
    </View>
    </View>
    
  );
}

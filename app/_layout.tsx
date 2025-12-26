import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          color: "white",
        },
        contentStyle: {
          backgroundColor: "#121212",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="details"
        options={{ title: "Details", headerBackButtonDisplayMode: "minimal" }}
      />
    </Stack>
  );
}

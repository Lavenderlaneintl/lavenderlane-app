import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";
import Size from "@/utils/hooks/useResponsiveSize";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#e3e3e3",
          width: "90%",
          marginHorizontal: "auto",
          borderRadius: Size.calcAverage(50),
          bottom: 50,
          height: Size.calcHeight(65),
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="DashboardScreen"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="dashboard" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="NotificationsScreen"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bell" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

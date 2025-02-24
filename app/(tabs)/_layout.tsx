import { Tabs } from "expo-router";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LogoIcon from "@/assets/svgs/Logo";
import Size from "@/utils/hooks/useResponsiveSize";
import Avatar from "@/components/Avatar";
import { ThemedView } from "@/components/ThemedView";
import TabBar from "@/components/navigation/Tabbar";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useInitializeUser } from "@/utils/store/userStore";

export default function TabLayout() {
  const { isLoading } = useInitializeUser();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#AF8BEA" }}>
      <View
        style={{
          height: StatusBar.currentHeight || 44,
          backgroundColor: "#AF8BEA",
        }}
      />
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={Platform.OS === "android" ? "#AF8BEA" : "transparent"}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: Size.calcWidth(20),
          paddingVertical: Size.calcHeight(25),
        }}
      >
        <LogoIcon />
        <View style={{ flexDirection: "row" }}>
          <Avatar style={{ marginRight: 8 }} />
          <Avatar size={50} />
        </View>
      </View>
      <ThemedView
        style={{
          flex: 1,
          borderTopLeftRadius: Size.calcWidth(30),
          borderTopRightRadius: Size.calcWidth(30),
          overflow: "hidden",
          paddingTop: Size.calcAverage(10),
        }}
      >
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            animation: "shift",
          }}
          tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
        >
          <Tabs.Screen
            name="DashboardScreen"
            options={{
              tabBarLabel: "Dashboard",
            }}
          />
          <Tabs.Screen
            name="ExploreScreen"
            options={{
              tabBarLabel: "Explore",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="compass-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="NotificationScreen"
            options={{
              tabBarLabel: "Notification",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="compass-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="SettingsScreen"
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="compass-outline" color={color} size={size} />
              ),
            }}
          />
        </Tabs>
      </ThemedView>
    </View>
  );
}

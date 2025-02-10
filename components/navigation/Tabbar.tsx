import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { tabItemType } from "@/utils/interfaces/nav.interfaces";
import Size from "@/utils/hooks/useResponsiveSize";

import HomeIcon from "./Icons/HomeIcon";
import ExploreIcon from "./Icons/ExploreIcon";
import NotificationIcon from "./Icons/NotificationIcon";
import SettingsIcon from "./Icons/SettingsIcon";

// nav links
const navItems: tabItemType[] = [
  {
    name: "/DashboardScreen",
    icon: HomeIcon,
    label: "Dashboard",
  },
  // {
  //   name: "/CalenderScreen",
  //   icon: CalenderIcon,
  //   label: "Calendar",
  // },
  {
    name: "/ExploreScreen",
    icon: ExploreIcon,
    label: "Explore",
  },
  {
    name: "/NotificationScreen",
    icon: NotificationIcon,
    label: "Notification",
  },
  {
    name: "/SettingsScreen",
    icon: SettingsIcon,
    label: "Settings",
  },
];

const TabBar = ({ navigation, state }: BottomTabBarProps) => {
  const router = useRouter();

  // Shared values for animation
  const scaleValues = navItems.map(() => useSharedValue(1)); // Default scale is 1
  const backgroundValues = navItems.map(() => useSharedValue("transparent")); // Default background is transparent

  return (
    <View style={styles.container}>
      {navItems.map((tabItem, index) => {
        const route = state.routes.find((route) => route.name === tabItem.name);

        const isFocused =
          state.routes[state.index]?.name ===
          tabItem.name.toString().replace("/", "");

        // Update shared values based on focus state
        React.useEffect(() => {
          scaleValues[index].value = withTiming(isFocused ? 1.2 : 1, {
            duration: 200,
          });
          backgroundValues[index].value = withTiming(
            isFocused ? "#592E83" : "transparent",
            { duration: 200 }
          );
        }, [isFocused, scaleValues, backgroundValues]);

        // Animated styles
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scaleValues[index].value }],
          backgroundColor: backgroundValues[index].value,
        }));

        return (
          <TouchableOpacity
            key={tabItem.label}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route?.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                router.push(tabItem.name);
              }
            }}
          >
            <Animated.View style={[styles.tabIcon, animatedStyle]}>
              <tabItem.icon iconColor={isFocused ? "#F9F9F9" : "#9CA0AF"} />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEEF1",
    borderTopWidth: 0,
    elevation: 2,
    bottom: Size.calcHeight(25),
    height: Size.calcHeight(72),
    width: "87%",
    marginHorizontal: "auto",
    borderRadius: Size.calcAverage(40),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: Size.calcWidth(10),
  },

  tabIcon: {
    width: Size.calcAverage(50),
    height: Size.calcAverage(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Size.calcAverage(50),
  },
});

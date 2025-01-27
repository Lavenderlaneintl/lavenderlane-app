import React from "react";
import { StyleSheet, View, Image, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Size from "@/utils/hooks/useResponsiveSize";

interface AvatarProps {
  src?: string;
  size?: number;
  iconSize?: number;
  alt?: string;
  style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 45,
  iconSize = 35,
  alt = "Avatar",
  style,
}) => {
  const responsiveSize = Size.calcAverage(size);
  const responsiveIconSize = Size.calcAverage(iconSize);

  return (
    <View
      style={[
        styles.container,
        {
          width: responsiveSize,
          height: responsiveSize,
          borderRadius: responsiveSize / 2,
        },
        style,
      ]}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          style={[
            styles.image,
            { width: responsiveSize, height: responsiveSize },
          ]}
        />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons
            name="person-circle-outline"
            size={responsiveIconSize}
            color="#9e9e9e"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
  },

  image: {
    resizeMode: "cover",
  },

  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Avatar;

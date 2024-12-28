import { useThemeColor } from "@/utils/hooks/useThemeColor";
import React from "react";
import { Switch } from "react-native-switch";

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
}) => {
  const primaryColor = useThemeColor({ colorName: "primary" });
  const greyColor = useThemeColor({ colorName: "darkGrey" });
  const whiteColor = useThemeColor({ colorName: "whiteColor" });

  return (
    <Switch
      value={value}
      key="switch"
      backgroundActive={primaryColor}
      backgroundInactive={greyColor}
      circleBorderActiveColor={primaryColor}
      circleBorderInactiveColor={greyColor}
      circleActiveColor={whiteColor}
      circleInActiveColor={whiteColor}
      changeValueImmediately
      circleBorderWidth={3}
      renderActiveText={false}
      renderInActiveText={false}
      onValueChange={(value) => onValueChange(value)}
    />
  );
};

export default CustomSwitch;

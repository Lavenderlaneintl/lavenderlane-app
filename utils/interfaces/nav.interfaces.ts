import { Href } from "expo-router";
import { SvgProps } from "react-native-svg";

export interface ITabIconProps extends SvgProps {
  iconColor?: string;
}

export type tabItemType = {
  name: Href;
  icon: (props: ITabIconProps) => React.JSX.Element;
  label: string;
};

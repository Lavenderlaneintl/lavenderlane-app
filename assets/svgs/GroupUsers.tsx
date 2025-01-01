import Size from "@/utils/hooks/useResponsiveSize";
import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

const GroupUsers = (props: SvgProps) => (
  <Svg
    width={Size.calcWidth(209)}
    height={Size.calcHeight(120)}
    viewBox="0 0 209 120"
    fill="none"
    {...props}
  >
    <Circle
      cx={60}
      cy={60}
      r={57.3158}
      fill="#E5E6EB"
      stroke="white"
      strokeWidth={4.63158}
    />
    <Circle cx={59.999} cy={45.5263} r={18.5263} fill="#9CA0AF" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.8413 90.0965C33.733 79.8888 46.0986 73.3157 59.9994 73.3157C73.9002 73.3157 86.2658 79.8888 94.1574 90.0965C86.2658 100.304 73.9002 106.877 59.9994 106.877C46.0986 106.877 33.733 100.304 25.8413 90.0965Z"
      fill="#9CA0AF"
    />
    <Circle
      cx={149}
      cy={60}
      r={57.3158}
      fill="#E5E6EB"
      stroke="white"
      strokeWidth={4.63158}
    />
    <Circle cx={148.999} cy={45.5263} r={18.5263} fill="#9CA0AF" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M114.841 90.0965C122.733 79.8888 135.099 73.3157 148.999 73.3157C162.9 73.3157 175.266 79.8888 183.157 90.0965C175.266 100.304 162.9 106.877 148.999 106.877C135.099 106.877 122.733 100.304 114.841 90.0965Z"
      fill="#9CA0AF"
    />
  </Svg>
);
export default GroupUsers;

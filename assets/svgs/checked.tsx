import Svg, { Path, SvgProps } from "react-native-svg";

const CheckedIcon = (props: SvgProps) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
      fill="#0ADD73"
      stroke="#0ADD73"
      strokeWidth="1.71429"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.75 6.5L7.08125 10L5.25 8.25"
      stroke="white"
      strokeWidth="1.71429"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckedIcon;

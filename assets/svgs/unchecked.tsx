import Svg, { Path, SvgProps } from "react-native-svg";

const UncheckedIcon = (props: SvgProps) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
      fill="white"
      stroke="#CCCFD3"
      strokeWidth="1.14286"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UncheckedIcon;

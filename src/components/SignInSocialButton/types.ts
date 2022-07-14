import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

export interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

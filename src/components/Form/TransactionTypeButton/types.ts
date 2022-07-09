import { RectButtonProps } from "react-native-gesture-handler";

export interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

export interface IconButtonTypeProps {
  type: "up" | "down";
}

export interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

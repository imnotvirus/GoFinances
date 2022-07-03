import { TouchableOpacityProps } from "react-native";

export interface TransactionTypeButtonProps
  extends TouchableOpacityProps,
    IconButtonTypeProps,
    ContainerTransactionTypeButtonProps {
  title: string;
}

export interface IconButtonTypeProps {
  type: "up" | "down";
}

export interface ContainerTransactionTypeButtonProps
  extends IconButtonTypeProps {
  isActive: boolean;
}

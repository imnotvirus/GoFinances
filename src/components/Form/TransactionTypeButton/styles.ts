import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import {
  ContainerTransactionTypeButtonProps,
  IconButtonTypeProps,
  TransactionTypeButtonProps,
} from "./types";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(
  TouchableOpacity
)<ContainerTransactionTypeButtonProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, theme, type }) =>
    isActive &&
    css`
      background-color: ${type === "up"
        ? theme.colors.success_light
        : theme.colors.attention_light};
      border: 0;
    `}

  padding: 16px;
`;

export const Icon = styled(Feather)<IconButtonTypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

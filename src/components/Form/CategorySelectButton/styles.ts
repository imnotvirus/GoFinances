import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton as new (props: any) => RectButton)`
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;

  padding: 16px 18px;
`;

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;

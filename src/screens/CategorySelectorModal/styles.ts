import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;
interface CategoryButton {
  isSelected: boolean;
}
export const Category = styled(
  RectButton as new (props: any) => RectButton
)<CategoryButton>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: ${RFValue(15)}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
  font-size: ${RFValue(20)}px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;
`;

import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;
export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
`;
export const Fields = styled.View``;

export const TransactionsType = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
  margin-bottom: 16px;
`;

export const ContentHeader = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const ContentGraph = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const MonthSelectButton = styled(
  BorderlessButton as new (props: any) => BorderlessButton
)``;

export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

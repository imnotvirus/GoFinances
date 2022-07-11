import React from "react";
import { Text } from "react-native";

import { Container, Title, Amount } from "./styles";
import { HistoryCardProps } from "./types";

const HistoryCard: React.FC<HistoryCardProps> = ({ title, amount, color }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};

export default HistoryCard;

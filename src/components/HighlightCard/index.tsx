import React from "react";

import {
  Amount,
  Container,
  Footer,
  Header,
  Icon,
  Title,
  Transaction,
} from "./styles";
import { HighlightCardProps } from "./types";

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

const HighlightCard: React.FC<HighlightCardProps> = ({
  type,
  amount,
  lastTransaction,
  title,
}) => {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Amount type={type}>{amount}</Amount>
        <Transaction type={type}>{lastTransaction}</Transaction>
      </Footer>
    </Container>
  );
};

export default HighlightCard;

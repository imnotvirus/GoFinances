import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { Container, Icon, Title } from "./styles";
import { TransactionTypeButtonProps } from "./types";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  title,
  type,
  isActive,
  ...rest
}) => {
  return (
    <Container isActive={isActive} type={type} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};

export default TransactionTypeButton;

import React from "react";
import { Text } from "react-native";

import { Container, Title } from "./styles";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <Title>Button</Title>
    </Container>
  );
};

export default Button;

import React from "react";

import { Container, Title } from "./styles";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;

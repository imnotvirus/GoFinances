import React from "react";

import { Category, Container, Icon } from "./styles";
import { CategorySelectButtonProps } from "./types";

const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({
  title,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelectButton;

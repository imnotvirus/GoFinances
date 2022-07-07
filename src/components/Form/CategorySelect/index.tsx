import React from "react";
import { Text } from "react-native";

import { Container, Category, Icon } from "./styles";
import { CategorySelectProps } from "./types";

const CategorySelect: React.FC<CategorySelectProps> = ({ title }) => {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelect;

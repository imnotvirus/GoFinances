import React from "react";
import { Text } from "react-native";

import { Container } from "./styles";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = (props) => {
  return <Container {...props} />;
};

export default Input;

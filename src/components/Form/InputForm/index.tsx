import React from "react";
import { Controller } from "react-hook-form";

import Input from "../Input";

import { Container, Error } from "./styles";
import { InputFormProps } from "./types";

const InputForm: React.FC<InputFormProps> = ({
  control,
  name,
  error,
  ...rest
}) => {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default InputForm;

import React from "react";

import { Button, ImageContainer, Title } from "./styles";
import { SignInSocialButtonProps } from "./types";

const SignInSocialButton: React.FC<SignInSocialButtonProps> = ({
  title,
  svg: Svg,
  ...props
}) => {
  return (
    <Button {...props}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Button>
  );
};

export default SignInSocialButton;

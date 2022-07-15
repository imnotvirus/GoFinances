import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";
import LogoSVG from "../../assets/logo.svg";
import SignInSocialButton from "../../components/SignInSocialButton";

import {
  Container,
  Header,
  Title,
  TitleWrapper,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import { SignInProps } from "./types";
import { useAuth } from "../../context/auth";
import { useTheme } from "styled-components";

const SignIn: React.FC<SignInProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();
  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  };
  const handleSignInWithApple = async () => {
    try {
      setIsLoading(true);
      await signInWithApple();
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas{"\n"}finanças de forma{"\n"}muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>Faça seu login com{"\n"}uma das contas abaixo</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
          {isLoading && (
            <ActivityIndicator color={theme.colors.primary} size="large" />
          )}
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default SignIn;

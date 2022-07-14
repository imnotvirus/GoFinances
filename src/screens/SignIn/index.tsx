import React from "react";
import { Alert, Platform, Text } from "react-native";
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

const SignIn: React.FC<SignInProps> = (props) => {
  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  };
  const handleSignInWithApple = async () => {
    try {
      await signInWithApple();
    } catch (error) {
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
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default SignIn;

import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";
import AppRoutes from "./src/routes/app.routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SignIn from "./src/screens/SignIn";
import { AuthProvier } from "./src/context/auth";
import { Routes } from "./src/routes";
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View onLayout={onLayoutView} style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <AuthProvier>
            <Routes />
          </AuthProvier>
        </ThemeProvider>
      </View>
    </GestureHandlerRootView>
  );
}

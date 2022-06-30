import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";
import Dashboard from "./src/screens/Dashboard";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar, View } from "react-native";

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
    <View onLayout={onLayoutView} style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </View>
  );
}

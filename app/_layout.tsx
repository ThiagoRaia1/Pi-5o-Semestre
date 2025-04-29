import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "../context/auth";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden"); // Oculta a barra
    // Você também pode mudar a cor, se quiser:
    // NavigationBar.setBackgroundColorAsync("#ffffff");
  }, []);
  return (
    <PaperProvider>
      <AuthProvider>
        <StatusBar hidden />
        <Slot />
      </AuthProvider>
    </PaperProvider>
  );
}

import { Slot } from "expo-router"
import { PaperProvider } from "react-native-paper"
import { AuthProvider } from "../context/auth"
import { StatusBar } from "expo-status-bar"

export default function Layout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <StatusBar hidden />
        <Slot />
      </AuthProvider>
    </PaperProvider>
  )
}
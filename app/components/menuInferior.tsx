import { Link, usePathname } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type FeatherIconName = keyof typeof Feather.glyphMap;

const menuItems: { href: string; icon: FeatherIconName; label: string }[] = [
  { href: "/menuPrincipal/inicio", icon: "home", label: "INÍCIO" },
  { href: "/menuPrincipal/aulas", icon: "clock", label: "AULAS" },
  { href: "/menuPrincipal/agendar", icon: "calendar", label: "AGENDAR" },
  { href: "/menuPrincipal/perfil", icon: "user", label: "PERFIL" },
];

let prevIndex = 0;

export default function MenuInferior() {
  const pathname = usePathname();
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / menuItems.length;
  const translateX = useRef(new Animated.Value(prevIndex * itemWidth)).current;

  useEffect(() => {
    const activeIndex = menuItems.findIndex((item) => item.href === pathname);
    Animated.timing(translateX, {
      toValue: activeIndex * itemWidth,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    prevIndex = activeIndex;
  }, [pathname]);

  const isActive = (route: string) => pathname === route;

  return (
    <View style={styles.bottomMenu}>
      {/* Fundo branco animado */}
      <Animated.View
        style={[
          styles.activeBackground,
          {
            transform: [{ translateX }],
            width: itemWidth - 10,
          },
        ]}
      />

      {menuItems.map(({ href, icon, label }) => {
        const active = isActive(href);
        return (
          <View
            key={href}
            style={[styles.menuItem, { width: itemWidth, zIndex: 1 }]}
          >
            <Link href={href} asChild>
              <TouchableOpacity
                activeOpacity={0.6} // Feedback de toque
                style={styles.iconContainer}
              >
                <Feather
                  name={icon}
                  size={30}
                  color={active ? "#2AA69F" : "white"}
                />
                <Text style={[styles.icon, active && styles.activeText]}>
                  {label}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: "row",
    backgroundColor: "#2AA69F",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
  },
  activeBackground: {
    position: "absolute",
    height: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    zIndex: 0,
    left: 5,
  },
  menuItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    color: "white",
    fontWeight: "900",
    fontSize: 14,
    marginTop: 2,
  },
  activeText: {
    color: "#2AA69F",
  },
});

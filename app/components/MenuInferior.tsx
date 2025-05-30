import { Link } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { nomePaginas } from "../../utils/nomePaginas";

export default function MenuInferior() {
  const iconSize = 30
  return (
    <View style={styles.menu}>

      <Link href={`./${nomePaginas.inicio}`} asChild>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Feather name="home" size={iconSize} color={"white"} />
          <Text style={styles.text}>Início</Text>
        </TouchableOpacity>
      </Link>

      <Link href={`./${nomePaginas.aulas}`} asChild>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Feather name="clock" size={iconSize} color={"white"} />
          <Text style={styles.text}>Aulas</Text>
        </TouchableOpacity>
      </Link>

      <Link href={`./${nomePaginas.agendar}`} asChild>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Feather name="calendar" size={iconSize} color={"white"} />
          <Text style={styles.text}>Agendar</Text>
        </TouchableOpacity>
      </Link>

      <Link href={`./${nomePaginas.perfil}`} asChild>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Feather name="user" size={iconSize} color={"white"} />
          <Text style={styles.text}>Perfil</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#2AA69F",
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
  },
});

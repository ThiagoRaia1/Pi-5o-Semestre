import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../context/auth";
import Carregando from "./components/Carregando";

export default function TelaLogin() {
  const { usuario, handleLogin, setUsuario } = useAuth();
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const login = async () => {
    setCarregando(true);
    try {
      await handleLogin(senha);
    } catch (erro: any) {
      console.log("Erro: ", erro.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/fundoLogin.jpeg")}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setUsuario({ ...usuario, login: text })}
            onSubmitEditing={login}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            secureTextEntry={!mostrarSenha}
            onChangeText={(text) => setSenha(text)}
            onSubmitEditing={login}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Feather
              name={mostrarSenha ? "eye-off" : "eye"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      {carregando && <Carregando />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#319594",
    borderRadius: 20,
    justifyContent: "space-between", // isso ajuda no alinhamento
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "black",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#319594",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  link: {
    color: "black",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  registerLink: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

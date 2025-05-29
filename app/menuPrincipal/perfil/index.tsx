import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import MenuInferior from "../../components/MenuInferior";
import BotaoLogout from "../../components/BotaoLogout";
import { IAluno, useAuth } from "../../../context/auth";
import { useState } from "react";
import Carregando from "../../components/Carregando";
import { atualizarUsuario } from "../../../services/apiEditarUsuario";
import { autenticarLogin } from "../../../context/api";

export default function Perfil() {
  const { usuario, setUsuario, handleLogin } = useAuth();
  const [backupUsuario, setBackupUsuario] = useState(usuario);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [mostrarErro, setMostrarErro] = useState(false);

  const data = new Date(usuario.dataNascimento);

  const [ano, mes, dia] = data.toISOString().split("T")[0].split("-");
  const dataExibida = `${dia}/${mes}/${ano}`; // '19/09/2004'

  const editar = async () => {
    setCarregando(true);
    try {
      await autenticarLogin(usuario.login, senhaAtual);
      let senha = senhaAtual;
      if (novaSenha != "") {
        senha = novaSenha;
      }
      const novosDados: IAluno = {
        ...usuario,
        login: email,
        senha,
        celular,
      };
      await atualizarUsuario(backupUsuario.login, novosDados);

      setUsuario(await autenticarLogin(usuario.login, senha));
      setBackupUsuario(usuario);

      setMostrarErro(false);
      alert("Dados atualizados com sucesso!");
      setEditando(false);
    } catch (erro: any) {
      if (erro.message === "Erro ao autenticar aluno") setMostrarErro(true);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#eee",
          gap: 10,
          padding: 20,
        }}
      >
        {!editando ? (
          <>
            <BotaoLogout />
            <View style={{ flex: 1, justifyContent: "center", gap: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    height: "100%",
                    alignContent: "center",
                    textAlign: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  Icon{"\n"}Placeholder
                </Text>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>NOME</Text>
                  <Text style={styles.inputText}>{usuario.nome || "NOME"}</Text>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>CPF</Text>
                <Text style={styles.inputText}>{usuario.cpf || "CPF"}</Text>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>SEXO</Text>
                <Text style={styles.inputText}>{usuario.sexo || "SEXO"}</Text>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>DATA DE NASCIMENTO</Text>
                <Text style={styles.inputText}>
                  {dataExibida || "DATA DE NASCIMENTO"}
                </Text>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>EMAIL</Text>
                <Text style={styles.inputText}>{usuario.login || "EMAIL"}</Text>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CELULAR</Text>
                <Text style={styles.inputText}>
                  {usuario.celular || "CELULAR"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editarsalvarButton}
              onPress={() => {
                setEmail(usuario.login);
                setCelular(usuario.celular);
                setEditando(!editando);
              }}
            >
              <Text style={styles.editarsalvarButtonText}>Editar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                gap: 30,
                marginBottom: -55,
              }}
            >
              <View style={styles.inputGroup}>
                <Text style={styles.label}>EMAIL</Text>
                <TextInput
                  style={[styles.inputText, { backgroundColor: "white" }]}
                  placeholder={backupUsuario.login}
                  placeholderTextColor="#aaa"
                  defaultValue={usuario.login}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType="email-address"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>SENHA ATUAL</Text>
                <TextInput
                  style={[styles.inputText, { backgroundColor: "white" }]}
                  placeholder="Insira sua senha atual"
                  placeholderTextColor="#aaa"
                  onChangeText={(text) => setSenhaAtual(text)}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>NOVA SENHA</Text>
                <TextInput
                  style={[styles.inputText, { backgroundColor: "white" }]}
                  placeholder="Não preencha para manter a senha atual"
                  placeholderTextColor="#aaa"
                  onChangeText={(text) => setNovaSenha(text)}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>CELULAR</Text>
                <TextInput
                  style={[styles.inputText, { backgroundColor: "white" }]}
                  placeholder={backupUsuario.celular}
                  placeholderTextColor="#aaa"
                  defaultValue={usuario.celular}
                  onChangeText={(text) => setCelular(text)}
                  returnKeyType="next"
                />
              </View>
            </View>

            {mostrarErro && <Text>Senha incorreta, dados não alterados</Text>}

            <TouchableOpacity
              style={styles.editarsalvarButton}
              onPress={editar}
            >
              <Text style={styles.editarsalvarButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.editarsalvarButton,
                { backgroundColor: "#ff6154" },
              ]}
              onPress={() => {
                setUsuario(backupUsuario);
                setEditando(false);
              }}
            >
              <Text style={styles.editarsalvarButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <MenuInferior />
      {carregando && <Carregando />}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 500,
    color: "#444",
    marginBottom: 6,
  },
  inputGroup: {
    width: "100%",
  },
  inputText: {
    fontSize: 14,
    fontWeight: 400,
    color: "#000",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#2AA69F",
    height: 40,
    paddingHorizontal: 10,
    alignContent: "center",
    backgroundColor: "#ccc",
  },
  editarsalvarButton: {
    backgroundColor: "#2aa69f",
    height: "5%",
    justifyContent: "center",
    borderRadius: 20,
  },
  editarsalvarButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: 600,
  },
});

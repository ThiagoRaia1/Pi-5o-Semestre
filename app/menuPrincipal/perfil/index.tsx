import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MenuInferior from "../../components/MenuInferior";
import BotaoLogout from "../../components/BotaoLogout";
import { IAluno, useAuth } from "../../../context/auth";
import { useState } from "react";
import Carregando from "../../components/Carregando";
import { atualizarUsuario } from "../../../services/apiEditarUsuario";
import { autenticarLogin } from "../../../context/api";

export default function Perfil() {
  const { usuario, setUsuario } = useAuth();
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
  const dataExibida = `${dia}/${mes}/${ano}`;

  const editar = async () => {
    setCarregando(true);
    try {
      await autenticarLogin(usuario.login, senhaAtual);
      let senha = novaSenha !== "" ? novaSenha : senhaAtual;
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <BotaoLogout />

          {!editando ? (
            <>
              <View style={styles.profileInfo}>
                <Text style={styles.avatar}>👤</Text>
                <Text style={styles.profileName}>{usuario.nome}</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>CPF</Text>
                <Text style={styles.inputText}>{usuario.cpf}</Text>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Sexo</Text>
                <Text style={styles.inputText}>{usuario.sexo}</Text>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Data de nascimento</Text>
                <Text style={styles.inputText}>{dataExibida}</Text>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.inputText}>{usuario.login}</Text>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Celular</Text>
                <Text style={styles.inputText}>{usuario.celular}</Text>
              </View>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setEmail(usuario.login);
                  setCelular(usuario.celular);
                  setEditando(true);
                }}
              >
                <Text style={styles.buttonText}>Editar perfil</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={backupUsuario.login}
                  placeholderTextColor={"#aaa"}
                  defaultValue={usuario.login}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha atual</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Insira sua senha atual"
                  placeholderTextColor={"#aaa"}
                  secureTextEntry
                  onChangeText={setSenhaAtual}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nova senha</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Deixe em branco para manter a senha"
                  placeholderTextColor={"#aaa"}
                  secureTextEntry
                  onChangeText={setNovaSenha}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Celular</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={backupUsuario.celular}
                  placeholderTextColor={"#aaa"}
                  defaultValue={usuario.celular}
                  onChangeText={setCelular}
                  keyboardType="phone-pad"
                />
              </View>

              {mostrarErro && (
                <Text style={styles.errorText}>
                  ❌ Senha incorreta, dados não alterados
                </Text>
              )}

              <View style={{gap: 10}}>
                <TouchableOpacity style={styles.saveButton} onPress={editar}>
                  <Text style={styles.buttonText}>Salvar alterações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cancelButton]}
                  onPress={() => {
                    setUsuario(backupUsuario);
                    setEditando(false);
                    setMostrarErro(false);
                  }}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <MenuInferior />
      {carregando && <Carregando />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    flexGrow: 1,
    justifyContent: "center",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    fontSize: 64,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  inputGroup: {
    width: "100%",
  },
  inputText: {
    fontSize: 15,
    color: "#555",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputField: {
    fontSize: 15,
    color: "#000",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2aa69f",
  },
  editButton: {
    backgroundColor: "#2aa69f",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#2aa69f",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ff6154",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  errorText: {
    color: "#e53935",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 10,
  },
});

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

  const [erros, setErros] = useState<{
    email?: string;
    senhaAtual?: string;
    celular?: string;
  }>({});

  const data = new Date(usuario.dataNascimento);
  const [ano, mes, dia] = data.toISOString().split("T")[0].split("-");
  const dataExibida = `${dia}/${mes}/${ano}`;

  const validarCampos = () => {
    const novosErros: {
      email?: string;
      senhaAtual?: string;
      celular?: string;
    } = {};

    if (!email.trim()) {
      novosErros.email = "Email é obrigatório.";
    } else {
      // [a-zA-Z0-9._%+-]+ – Parte do usuário - Letras, números, ponto ., underline _, porcentagem %, mais +, hífen -
      // + → Um ou mais desses caracteres

      // @ – O caractere @

      // [a-zA-Z0-9.-]+ – Parte do domínio:
      // Letras, números, ponto ., hífen -
      // + → Um ou mais desses caracteres

      // \. – Ponto separando domínio e TLD

      // [a-zA-Z]{2,} – O domínio de topo (TLD, tipo .com, .br, .org etc.):
      // Apenas letras e pelo menos dois caracteres

      // $ – Fim da string
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) novosErros.email = "Email inválido.";
    }
    if (!senhaAtual.trim()) novosErros.senhaAtual = "A senha atual é obrigatória para atualização dos dados.";
    if (!celular.trim()) {
      novosErros.celular = "Celular é obrigatório.";
    } else {
      const celularRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
      if (!celularRegex.test(celular))
        novosErros.celular = "Formato inválido\n(99)99999-9999.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const editar = async () => {
    if (!validarCampos()) return;
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
                  style={[
                    styles.inputField,
                    { backgroundColor: "white" },
                    erros.email && { borderColor: "red", borderWidth: 1 },
                  ]}
                  placeholder={backupUsuario.login}
                  placeholderTextColor={"#aaa"}
                  defaultValue={usuario.login}
                  onChangeText={(text) => {
                    setEmail(text);

                    setErros((prev) => ({ ...prev, email: undefined }));
                  }}
                  keyboardType="email-address"
                />
                {erros.email && (
                  <Text style={styles.errorText}>{erros.email}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha atual*</Text>
                <TextInput
                  style={[
                    styles.inputField,
                    { backgroundColor: "white" },
                    erros.senhaAtual && { borderColor: "red", borderWidth: 1 },
                  ]}
                  placeholder="Insira sua senha atual"
                  placeholderTextColor={"#aaa"}
                  secureTextEntry
                  onChangeText={(text) => {
                    setSenhaAtual(text);
                    setErros((prev) => ({ ...prev, senhaAtual: undefined }));
                  }}
                />
                {erros.senhaAtual && (
                  <Text style={styles.errorText}>{erros.senhaAtual}</Text>
                )}
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
                  style={[
                    styles.inputText,
                    { backgroundColor: "white" },
                    erros.celular && { borderColor: "red", borderWidth: 1 },
                  ]}
                  placeholder={backupUsuario.celular}
                  placeholderTextColor={"#aaa"}
                  defaultValue={usuario.celular}
                  keyboardType="phone-pad"
                  onChangeText={(text) => {
                    setCelular(text);
                    setErros((prev) => ({ ...prev, celular: undefined }));
                  }}
                />
                {erros.celular && (
                  <Text style={styles.errorText}>{erros.celular}</Text>
                )}
              </View>

              {mostrarErro && (
                <Text style={styles.errorText}>
                  ❌ Senha incorreta, dados não alterados
                </Text>
              )}

              <View style={{ gap: 10 }}>
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

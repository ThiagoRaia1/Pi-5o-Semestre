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
  Image,
} from "react-native";
import MenuInferior from "../../components/MenuInferior";
import BotaoLogout from "../../components/BotaoLogout";
import { IAluno, useAuth } from "../../../context/auth";
import { useState, useRef } from "react";
import Carregando from "../../components/Carregando";
import { atualizarUsuario } from "../../../services/apiEditarUsuario";
import { autenticarLogin } from "../../../context/api";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import { ValidacaoAlunoStrategy } from "../../../strategies/ValidacaoAlunoStrategy";
export default function Perfil() {
  const { usuario, setUsuario } = useAuth();
  const [backupUsuario, setBackupUsuario] = useState(usuario);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [imagem, setImagem] = useState("");
  const [mostrarErro, setMostrarErro] = useState(false);
  const [mostrarConteudo, setMostrarConteudo] = useState(true);
  const animRef = useRef<Animatable.View>(null);

  const userIconSize = 125;

  const [erros, setErros] = useState<{
    email?: string;
    senhaAtual?: string;
    celular?: string;
  }>({});

  const data = new Date(usuario.dataNascimento);
  const [ano, mes, dia] = data.toISOString().split("T")[0].split("-");
  const dataExibida = `${dia}/${mes}/${ano}`;


const strategy = new ValidacaoAlunoStrategy();

const validarCampos = () => {
  const novosErros = strategy.validar(email, senhaAtual, celular);
  setErros(novosErros);
  return Object.keys(novosErros).length === 0;
};


  const selecionarImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.3, // Reduz a qualidade da imagem
      allowsEditing: true,
      aspect: [1, 1], // Opcional: força proporção quadrada
    });

    if (!resultado.canceled) {
      const base64 = resultado.assets[0].base64;
      const imagemBase64 = `data:image/jpeg;base64,${base64}`;
      setImagem(imagemBase64);
    }
  };

  const abrirCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permissão para usar a câmera foi negada.");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.3,
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ['images'],
    });

    if (!resultado.canceled) {
      const base64 = resultado.assets[0].base64;
      const imagemBase64 = `data:image/jpeg;base64,${base64}`;
      setImagem(imagemBase64);
    }
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
        imagem,
      };
      await atualizarUsuario(backupUsuario.login, novosDados);
      const usuarioAtualizado = await autenticarLogin(usuario.login, senha);
      setUsuario(usuarioAtualizado);
      setBackupUsuario(usuarioAtualizado);
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
          <Animatable.View
            ref={animRef}
            animation="fadeInUp"
            duration={1000}
            style={{ gap: 20 }}
          >
            {mostrarConteudo &&
              (!editando ? (
                <>
                  <Image
                    source={{ uri: usuario.imagem }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 1000,
                      alignSelf: "center",
                      width: userIconSize,
                      height: userIconSize,
                    }}
                    resizeMode="center"
                  />
                  <View style={styles.profileInfo}>
                    {/* <Text style={styles.avatar}>👤</Text> */}

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
                      setMostrarConteudo(false);
                      setEmail(usuario.login);
                      setCelular(usuario.celular);
                      setImagem(usuario.imagem);
                      setEditando(true);
                      setTimeout(() => {
                        setMostrarConteudo(true);
                        animRef.current?.fadeInUp(1000);
                      }, 10);
                    }}
                  >
                    <Text style={styles.buttonText}>Editar perfil</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Image
                      source={{ uri: imagem }}
                      style={styles.imageWhileEdit}
                      resizeMode="center"
                    />

                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 10,
                        width: "50%",
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>Trocar foto</Text>
                      <TouchableOpacity
                        onPress={selecionarImagem}
                        style={styles.trocarFotoButtons}
                      >
                        <Text style={{ color: "white" }}>
                          Selecionar da galeria
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        onPress={abrirCamera}
                        style={styles.trocarFotoButtons}
                      >
                        <Text style={{ color: "white" }}>Abrir câmera</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

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
                        erros.senhaAtual && {
                          borderColor: "red",
                          borderWidth: 1,
                        },
                      ]}
                      placeholder="Insira sua senha atual"
                      placeholderTextColor={"#aaa"}
                      secureTextEntry
                      onChangeText={(text) => {
                        setSenhaAtual(text);
                        setErros((prev) => ({
                          ...prev,
                          senhaAtual: undefined,
                        }));
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
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={editar}
                    >
                      <Text style={styles.buttonText}>Salvar alterações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.cancelButton]}
                      onPress={() => {
                        setUsuario(backupUsuario);
                        setEditando(false);
                        setMostrarErro(false);
                        setMostrarConteudo(false);
                        setImagem(usuario.imagem);
                        setTimeout(() => {
                          setMostrarConteudo(true);
                          animRef.current?.fadeInUp(1000);
                        }, 10);
                      }}
                    >
                      <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ))}
          </Animatable.View>
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
  trocarFotoButtons: {
    padding: 10,
    backgroundColor: "#2AA69F",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  imageWhileEdit: {
    borderWidth: 1,
    borderRadius: 1000,
    alignSelf: "center",
    width: 125,
    height: 125,
  },
});

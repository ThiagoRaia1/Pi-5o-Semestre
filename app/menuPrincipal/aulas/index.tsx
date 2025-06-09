import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import {
  excluirAula,
  getAulasSeguintes,
  IAula,
} from "../../../services/apiAulas";
import MenuInferior from "../../components/MenuInferior";
import BotaoLogout from "../../components/BotaoLogout";
import Carregando from "../../components/Carregando";

function renderAula(aula: IAula, onCancelar: (aula: IAula) => void) {
  const dataAula = new Date(aula.data);

  return (
    <View style={styles.aulaContent}>
      <View style={styles.dateContent}>
        <Text style={styles.dateText}>
          {dataAula.toLocaleDateString() +
            `,\n` +
            dataAula.toLocaleDateString("pt-BR", {
              weekday: "long",
            }) +
            `,\n` +
            dataAula.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // 24h format
            })}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cancelarContent}
        onPress={() => {
          onCancelar(aula);
        }} // Passa a aula para a função de cancelar
      >
        <Text style={styles.cancelarText}>CANCELAR</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Aulas() {
  const { usuario } = useAuth();
  const [carregando, setCarregando] = useState(false);
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const carregarAulas = async () => {
      setCarregando(true);
      try {
        const resposta = await getAulasSeguintes(usuario.login);
        setAulas(resposta);
      } catch (erro) {
        console.error("Erro ao buscar aulas:", erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarAulas();
  }, []);

  // Função para cancelar a aula
  const cancelarAula = async (aula: IAula) => {
    setCarregando(true);
    try {
      await excluirAula(aula._id); // Chama a API para excluir a aula
      setAulas((prev) => prev.filter((a: IAula) => a._id !== aula._id)); // Remove a aula da lista
      alert("Aula desmarcada com sucesso!");
    } catch (error) {
      console.error("Erro ao cancelar aula:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#aaa" }}>
        <View style={{ flex: 1, backgroundColor: "#eee" }}>
          <BotaoLogout />
          <Image
            source={require("../../../assets/fundoAgendar.png")}
            style={styles.backgroundImage}
            resizeMode="stretch"
          />
          <View style={styles.mainContent}>
            <Text style={styles.title}>PRÓXIMAS AULAS</Text>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              persistentScrollbar={true}
            >
              {aulas
                .filter((aula: IAula) => new Date(aula.data) > new Date()) // Filtra aulas futuras
                .map((aula: IAula, index: number) => (
                  <Animatable.View
                    key={aula._id}
                    animation="fadeInUp"
                    duration={1000}
                    delay={index * 150}
                  >
                    <View key={aula._id}>{renderAula(aula, cancelarAula)}</View>
                  </Animatable.View>
                ))}
            </ScrollView>
          </View>
        </View>
        <MenuInferior />
      </View>
      {carregando && <Carregando />}
    </>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 7,
    backgroundColor: "#f2f2f0aa", // transparente para ver o fundo
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "900",
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingVertical: 20,
    gap: 20,
    borderRadius: 10,
  },
  aulaContent: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 30,
    borderColor: "#ccc",
    borderWidth: 2,
    justifyContent: "space-between",
    height: 100,
    elevation: 10,
  },
  dateContent: {
    padding: 10,
    justifyContent: "center",
    borderRadius: 30,
    width: "70%",
  },
  dateText: {
    textAlign: "center",
    fontSize: 20,
    color: "#4B366D",
    fontWeight: "400",
    margin: -10,
  },
  cancelarContent: {
    justifyContent: "center",
    backgroundColor: "#F16E6E",
    borderRadius: 30,
    width: "30%",
    elevation: 5,
  },
  cancelarText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

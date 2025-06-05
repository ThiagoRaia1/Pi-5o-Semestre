import { View, Image, StyleSheet, Text } from "react-native";
import MenuInferior from "../../components/MenuInferior";
import BotaoLogout from "../../components/BotaoLogout";
import { useAuth } from "../../../context/auth";
import { useState, useEffect } from "react";
import { getAulasSeguintes, IAula } from "../../../services/apiAulas";
import * as Animatable from "react-native-animatable";

export default function Inicio() {
  const { usuario } = useAuth();
  const [proximaAula, setProximaAula] = useState<IAula>(null);
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    const carregarProximaAula = async () => {
      try {
        const aulas: IAula[] = await getAulasSeguintes(usuario.login);
        if (aulas.length > 0) {
          const aulasFuturas: IAula[] = aulas.filter(
            (aula) => new Date(aula.data) > new Date()
          );

          aulasFuturas.sort(
            (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
          );

          if (aulasFuturas.length > 0) {
            setProximaAula({
              ...aulasFuturas[0],
              data: new Date(aulasFuturas[0].data),
            });
            setMensagemErro("");
          } else {
            setMensagemErro("Não há aulas registradas para os próximos dias");
            setProximaAula(null);
          }
        } else {
          setMensagemErro("Não há aulas registradas para os próximos dias");
          setProximaAula(null);
        }
      } catch (erro) {
        console.error("Erro ao buscar próxima aula:", erro);
        setMensagemErro("Erro ao carregar as aulas");
        setProximaAula(null);
      }
    };

    carregarProximaAula();
  }, [usuario.login]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BotaoLogout />
        <Image
          source={require("../../../assets/fundoInicio.png")}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />

        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          style={{ width: "100%" }}
        >
          <View style={{ width: "100%", gap: 5, padding: 20 }}>
            <Text style={styles.welcomeText}>
              {/* Mostra só o primeiro nome */}
              Bem vindo, {usuario.nome.split(" ", 1)}
            </Text>

            <View style={styles.proxAulaMainView}>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Sua próxima aula é:
              </Text>

              <View style={styles.proxAulaSubView}>
                <Text style={styles.proxAulaSubText}>
                  {proximaAula
                    ? (() => {
                        return `${
                          proximaAula.data.toLocaleDateString() +
                          ", " +
                          proximaAula.data.toLocaleDateString("pt-BR", {
                            weekday: "long",
                          }) +
                          `, ${"\n"}` +
                          proximaAula.data.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false, // 24h format
                          })
                        }`;
                      })()
                    : mensagemErro || "Carregando..."}
                </Text>
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
      <MenuInferior />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    textShadowColor: "black", // Cor da borda
    textShadowOffset: { width: 1, height: 1 }, // Espessura da sombra
    textShadowRadius: 10, // Suaviza a borda
  },
  proxAulaMainView: {
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#ccc",
    height: 250,
    padding: 10,
  },
  proxAulaSubView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    height: "80%",
  },
  proxAulaSubText: {
    textAlign: "center",
    color: "black",
    fontSize: 24,
  },
});

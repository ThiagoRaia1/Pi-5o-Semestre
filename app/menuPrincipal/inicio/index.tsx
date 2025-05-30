import { View, Image, StyleSheet, Text } from "react-native";
import MenuInferior from "../../components/MenuInferior";
import BotaoLogout from "../../components/BotaoLogout";
import { useAuth } from "../../../context/auth";
import { useState, useEffect } from 'react';
import {getAulasSeguintes} from '../../../services/apiAulas';
import { formataDataAula } from '../../utils/formataData';

export default function Inicio() {
  const { usuario } = useAuth();

  const [proximaAula, setProximaAula] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    const carregarProximaAula = async () => {
      try {
        const aulas = await getAulasSeguintes(usuario.login); // Busca as aulas do aluno
        if (aulas.length > 0) {
          // Filtra as aulas futuras
          const aulasFuturas = aulas.filter((aula) => new Date(aula.data) > new Date());

          // Ordena as aulas pela data (ascendente)
          aulasFuturas.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

          // Se houver aulas futuras, pega a primeira
          if (aulasFuturas.length > 0) {
            setProximaAula(aulasFuturas[0]);
            setMensagemErro(''); // Limpa qualquer mensagem de erro
          } else {
            setMensagemErro('Não há aulas registradas para os próximos dias');
            setProximaAula(null); // Limpa a aula
          }
        } else {
          setMensagemErro('Não há aulas registradas para os próximos dias');
          setProximaAula(null); // Limpa a aula
        }
      } catch (erro) {
        console.error('Erro ao buscar próxima aula:', erro);
        setMensagemErro('Erro ao carregar as aulas');
        setProximaAula(null); // Limpa a aula
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

        <View
          style={{
            gap: 5,
            width: "100%",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "white",
              textShadowColor: "black", // Cor da borda
              textShadowOffset: { width: 1, height: 1 }, // Espessura da sombra
              textShadowRadius: 10, // Suaviza a borda
            }}
          >
            {/* Mostra só o primeiro nome */}
            Bem vindo, {usuario.nome.split(" ", 1)}
          </Text>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "#ccc",
              height: 250,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Sua próxima aula é:
            </Text>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                width: "100%",
                height: "80%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 24,
                }}
              >
                {proximaAula ? (() => {
                  const dataFormatada = formataDataAula(proximaAula.data);
                  return `${dataFormatada.diaSemana}, ${dataFormatada.dia}\n${dataFormatada.hora}`;
                })() : mensagemErro || "Carregando..."}
              </Text>
            </View>
          </View>
        </View>
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
});

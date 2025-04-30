import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import MenuInferior from '../../components/menuInferior'
import LogoutButton from '../../components/logoutButton';
import { getAulasSeguintes, excluirAula } from './api';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth';
import { formataDataAula } from '../../utils/formataData';

function renderAula(
  aula: { _id: string; data: string; emailAluno: string },
  onCancelar: (aula: { _id: string; data: string; emailAluno: string }) => void
) {
  const dataFormatada = formataDataAula(aula.data);
  
  // Verificando se a formatação de data está correta e se dataFormatada é uma string
  console.log('Dados da aula:', aula);
  console.log('Data formatada:', dataFormatada);

  return (
    <View style={styles.aulaContent}>
      <View style={styles.dateContent}>
        <Text style={styles.dateText}>
          {/* Certifique-se de que dataFormatada.diaSemana, dia, hora são strings */}
          {`${dataFormatada.diaSemana}, ${dataFormatada.dia}\n${dataFormatada.hora}`}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cancelarContent}
        onPress={() => onCancelar(aula)} // Passa a aula para a função de cancelar
      >
        <Text style={styles.cancelarText}>CANCELAR</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Aulas() {
  const { usuario } = useAuth();
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const carregarAulas = async () => {
      try {
        const resposta = await getAulasSeguintes(usuario.login);
        setAulas(resposta);
      } catch (erro) {
        console.error("Erro ao buscar aulas:", erro);
      }
    };

    carregarAulas();
  }, []);

  // Função para cancelar a aula
  const cancelarAula = async (aula: { _id: string; data: string; emailAluno: string }) => {
    try {
      await excluirAula(usuario.login, new Date(aula.data)); // Chama a API para excluir a aula
      setAulas((prev) => prev.filter((a) => a._id !== aula._id)); // Remove a aula da lista
    } catch (error) {
      console.error('Erro ao cancelar aula:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/fundoAgendar.png")}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <View style={styles.mainContent}>
        <LogoutButton />
        <Text style={styles.title}>PRÓXIMAS AULAS</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          persistentScrollbar={true}
        >
          {aulas
            .filter((aula) => new Date(aula.data) > new Date()) // Filtra aulas futuras
            .map((aula) => (
              <View key={aula._id}>
                {renderAula(aula, cancelarAula)} {/* Passa a função cancelarAula para o renderAula */}
              </View>
            ))}
        </ScrollView>
      </View>
      <MenuInferior />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

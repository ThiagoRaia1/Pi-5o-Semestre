import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import MenuInferior from '../../components/menuInferior'
import LogoutButton from '../../components/logoutButton';
import getAulasSeguintes from './api';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth';
import { formataDataAula } from '../../utils/formataData';

function renderAula(aula: { data: string; emailAluno: string }) {

  const dataFormatada = formataDataAula(aula.data)

  return (
    <View style={styles.aulaContent}>
      <View style={styles.dateContent}>
        <Text style={styles.dateText}>
          {`${dataFormatada.diaSemana}, ${dataFormatada.dia}\n${dataFormatada.hora}`}
        </Text>
      </View>
      <TouchableOpacity style={styles.cancelarContent}>
        <Text style={styles.cancelarText}>CANCELAR</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Aulas() {
  const { usuario } = useAuth()
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const carregarAulas = async () => {
      try {
        const resposta = await getAulasSeguintes(usuario.login);
        // console.log('Aulas recebidas:', resposta); // Aqui!
        setAulas(resposta);
      } catch (erro) {
        console.error('Erro ao buscar aulas:', erro);
      }
    };

    carregarAulas();
  }, []);

  return (
    <View style={styles.container}>
      {/* Parte principal com fundo e conteúdo */}
      <Image
        source={require('../../../assets/fundoAgendar.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <View style={styles.mainContent}>
        <LogoutButton />
        <Text style={styles.title}>PRÓXIMAS AULAS</Text>
        {/* ScrollView corrigida */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          persistentScrollbar={true}
        >
          {aulas
            .filter((aula) => new Date(aula.data) > new Date())
            .map((aula) => (
              <View key={aula._id}>{renderAula(aula)}</View>
            ))}


        </ScrollView>
      </View>
      <MenuInferior />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 7,
    backgroundColor: '#f2f2f0aa', // transparente para ver o fundo
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: '900',
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 20,
    gap: 20,
    borderRadius: 10,
  },
  aulaContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 30,
    borderColor: '#ccc',
    borderWidth: 2,
    justifyContent: 'space-between',
    height: 100,
    elevation: 10
  },
  dateContent: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 30,
    width: '70%',
  },
  dateText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#4B366D',
    fontWeight: '400',
    margin: -10,
  },
  cancelarContent: {
    justifyContent: 'center',
    backgroundColor: '#F16E6E',
    borderRadius: 30,
    width: '30%',
    elevation: 5
  },
  cancelarText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
})

import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'
import MenuInferior from '../../components/menuInferior'
import LogoutButton from '../../components/logoutButton';

function renderAula() {
  return (
    <View style={styles.aulaContent}>
      <View style={styles.dateContent}>
        <Text style={styles.dateText}>Quarta-feira, 02 de abril{'\n'}7:30</Text>
      </View>
      <View style={styles.cancelarContent}>
        <Text style={styles.cancelarText}>CANCELAR</Text>
      </View>
    </View>
  )
}

export default function Aulas() {
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
          {/* Renderiza 10 componentes de aula */}
          {Array.from({ length: 10 }).map((_, index) => (
            <View key={index}>{renderAula()}</View>
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
  },
  cancelarText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
})

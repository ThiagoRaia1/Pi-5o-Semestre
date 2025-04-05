import { View, StyleSheet, Image, Text } from 'react-native'
import MenuInferior from '../../components/menuInferior'
import LogoutButton from '../../components/logoutButton';

export default function Aulas() {
  return (
    <View style={styles.container}>
      {/* Fazer com que a posição do menuInferior seja absoluta */}
      <View style={
        {
          justifyContent: 'center',
          alignItems: 'center',
          flex: 7,
          gap: 20,
          backgroundColor: '#f2f2f0',
          width: '100%',
        }
      }>
        <Image
          source={require('../../../assets/fundoAgendar.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <LogoutButton />
        <Text style={
          {
            fontSize: 30,
            color: 'white',
            fontWeight: 900,
            paddingHorizontal: 20,
            textShadowColor: 'black', // Cor da borda
            textShadowOffset: { width: 1, height: 1 }, // Espessura da sombra
            textShadowRadius: 20, // Suaviza a borda
          }
        }>
          PRÓXIMAS AULAS
        </Text>

        {/* Adicionar ScrollView */}
        {/* Usar map para renderizar todas as aulas */}
        <View style={styles.aulaContent}>
          <View style={styles.dateContent}>
            <Text style={styles.dateText}>Quarta-feira, 02 de abril{'\n'}7:30</Text>
          </View>
          <View style={styles.cancelarContent}>
            <Text style={styles.cancelarText}>CANCELAR</Text>
          </View>
        </View>

        <View style={styles.aulaContent}>
          <View style={styles.dateContent}>
            <Text style={styles.dateText}>Quarta-feira, 02 de abril{'\n'}7:30</Text>
          </View>
          <View style={styles.cancelarContent}>
            <Text style={styles.cancelarText}>CANCELAR</Text>
          </View>
        </View>
        
      </View>
      <MenuInferior></MenuInferior>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 8,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  aulaContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    minWidth: '90%',
    height: '20%',
    borderRadius: 30,
    borderColor: '#ccc',
    borderWidth: 2,
    justifyContent: 'space-between',
  },
  dateContent: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 30,
    width: '70%',
  },
  dateText: {
    textAlign: 'center',
    fontSize: 22,
    color: '#4B366D',
    fontWeight: 400,
    margin: -10
  },
  cancelarContent: {
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#F16E6E',
    borderRadius: 30,
    width: '30%'
  },
  cancelarText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})
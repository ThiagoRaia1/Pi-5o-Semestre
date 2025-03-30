import { View, StyleSheet, Image, Text } from 'react-native'
import MenuInferior from '../../components/menuInferior'
import LogoutButton from '../../components/logoutButton'

export default function Agendar() {
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 7, gap: 20, backgroundColor: '#f2f2f0', width: '100%' }}>
        <Image
          source={require('../../../assets/fundoInicio.png')}
          style={styles.backgroundImage}
          resizeMode='stretch'
        />
        <LogoutButton />
        <Text style={{ fontSize: 40 }}>Agendar</Text>
      </View>
      <MenuInferior />
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
  bottomMenu: {
    flexDirection: 'row',
    backgroundColor: '#2AA69F',
    flex: 1,
    width: '100%',
    paddingHorizontal: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeLink: {
    fontWeight: '800',
    color: 'black', // Ou qualquer outra cor ou estilo que você queira aplicar
    // backgroundColor: 'black'
  },
})
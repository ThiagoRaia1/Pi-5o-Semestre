import { View, StyleSheet } from 'react-native'
import MenuInferior from '../../components/menuInferior'
import LogoutButton from '../../components/logoutButton'

export default function Agendar() {
  return (
    <View style={styles.container}>
      <LogoutButton/>
      <MenuInferior/>
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
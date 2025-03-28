import { View, Image, Text, StyleSheet } from 'react-native'
import { Link, usePathname } from 'expo-router'
import { Feather } from '@expo/vector-icons'; // icones do Expo
import MenuInferior from '../../components/menuInferior';
import LogoutButton from '../../components/logoutButton';

export default function Início() {
  const iconsWidth = 60
  const iconsHeight = iconsWidth

  const pathname = usePathname(); // Obtendo o caminho atual da página

  const isActive = (route: string) => {
    return pathname === route ? styles.activeLink : null; // Comparando com o pathname atual
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 7, gap: 20, backgroundColor: '#f2f2f0', width: '100%' }}>
        <Image
          source={require('../../../assets/fundoInicio.png')}
          style={styles.backgroundImage}
          resizeMode='stretch'
        />
        <LogoutButton/>
        <Text style={{ fontSize: 40 }}>Início</Text>
        <Text style={{ fontSize: 40 }}>Início</Text>
        <Text style={{ fontSize: 40 }}>Início</Text>

        
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
  activeLink: {
    fontWeight: '800',
    color: 'white', // Ou qualquer outra cor ou estilo que você queira aplicar
  }
})
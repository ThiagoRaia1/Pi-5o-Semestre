import { View, Image, Text, StyleSheet } from 'react-native'
import MenuInferior from '../../components/menuInferior';
import LogoutButton from '../../components/logoutButton';

export default function Início() {
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 7, gap: 20, backgroundColor: '#f2f2f0', width: '100%' }}>
        <Image
          source={require('../../../assets/fundoInicio.png')}
          style={styles.backgroundImage}
          resizeMode='stretch'
        />
        <LogoutButton />
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
})
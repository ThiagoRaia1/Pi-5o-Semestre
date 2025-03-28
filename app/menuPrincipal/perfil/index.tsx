import { View, StyleSheet } from 'react-native'
import MenuInferior from '../../components/menuInferior'

export default function Perfil() {
  return (
    <View style={styles.container}>
      <MenuInferior></MenuInferior>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
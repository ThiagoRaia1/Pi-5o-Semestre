import { View, StyleSheet } from 'react-native'
import MenuInferior from '../../components/menuInferior'
import LogoutButton from '../../components/logoutButton';

export default function Aulas() {
  return (
    <View style={styles.container}>
      <LogoutButton/>
      <MenuInferior></MenuInferior>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
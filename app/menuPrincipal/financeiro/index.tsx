import { View, StyleSheet } from 'react-native';
import MenuLateral from '../../components/menuLateral'
import ScrollableTable from '../../components/scrollableTable';

export default function Equipe() {
  return (
    <View style={styles.container}>
      <MenuLateral></MenuLateral>
      <View style={styles.rightSide}>  
           <ScrollableTable></ScrollableTable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row', // Coloca os elementos lado a lado
      justifyContent: 'center', // Centraliza os elementos no eixo horizontal
      height: '100%',
  },
  rightSide: {
    flex: 2,
    justifyContent: 'center', // Centraliza a mensagem verticalmente
    alignItems: 'center', // Centraliza no eixo vertical
    height: '100%',
  }
});
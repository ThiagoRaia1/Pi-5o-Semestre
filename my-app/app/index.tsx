import { View, StyleSheet } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'
import { useAuth } from '../context/auth'

export default function Login() {
  const { user, handleLogin, setUser } = useAuth()
  return (
    <View style={styles.container}>

      {/* Mensagem no lado esquerdo */}
      <View style={styles.leftSide}>
        <Text style={{fontSize: 60}}>Plenitude Pilates</Text>
      </View>

      <View style={styles.rightSide}>
        <TextInput label="Email" style={styles.input} onChangeText={text => setUser({...user, email: text})} />
        <TextInput label="Senha" secureTextEntry={true} style={styles.input} onChangeText={text => setUser({...user, password: text})} />
        <Button mode="contained" style={styles.input} onPress={handleLogin}>Entrar</Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Coloca os elementos lado a lado
    justifyContent: 'center', // Centraliza os elementos no eixo horizontal
    alignItems: 'center', // Centraliza no eixo vertical
  },
  leftSide: {
    flex: 1,
    justifyContent: 'center', // Alinha os itens ao topo da tela
    alignItems: 'center', // Centraliza no eixo vertical
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center', // Centraliza a mensagem verticalmente
    alignItems: 'center', // Centraliza no eixo vertical
  },
  input: {
    marginBottom: 20, // Espaço entre os campos
    width: '70%', // Largura dos inputs
    alignSelf: 'center', // Alinha o botão no centro
    marginRight: 20,
  },
});

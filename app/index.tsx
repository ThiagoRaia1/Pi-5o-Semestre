import { View, StyleSheet, Image } from 'react-native'
import { Button, TextInput, Text} from 'react-native-paper'
import { useAuth } from '../context/auth'
import { Link } from 'expo-router';

export default function Login() {
  const { user, handleLogin, setUser } = useAuth()
  return (
    <View style={styles.container}>

      {/* Mensagem no lado esquerdo */}
      <View style={[styles.leftSide, {backgroundColor: '#FAF9F7'}]}>
        <Image source={require('../assets/logo.jpg')} style={{width: 600, height: 600}}/>
        <Text style={{fontSize: 60, color: 'black'}}>Plenitude Pilates</Text>
      </View>

      <View style={[styles.rightSide, {backgroundColor: '#C7DEEE'}]}>
        <TextInput label="Email" style={styles.input} onChangeText={text => setUser({...user, email: text})}/>
        <TextInput label="Senha" secureTextEntry={true} style={styles.input} onChangeText={text => setUser({...user, password: text})} />
        <Button mode="contained" style={styles.input} onPress={handleLogin}>Entrar</Button>
        <Link href="/menuPrincipal/agenda" style={styles.input}>Entrar</Link>
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
    height: '100%',
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center', // Centraliza a mensagem verticalmente
    alignItems: 'center', // Centraliza no eixo vertical
    height: '100%',
  },
  input: {
    marginBottom: 20, // Espaço entre os campos
    width: '70%', // Largura dos inputs
    alignSelf: 'center', // Alinha o botão no centro
  },
});

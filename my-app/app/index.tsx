import { View, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '../context/auth'

export default function Login() {
  const { user, handleLogin, setUser } = useAuth()

  return (
    <View style={styles.container}>
      <TextInput label="Email" style={styles.centerItens} onChangeText={text => setUser({...user, email: text})} />
      <TextInput label="Senha" secureTextEntry={true} style={styles.centerItens} onChangeText={text => setUser({...user, password: text})} />
      <Button mode="contained" style={styles.centerItens} onPress={handleLogin}>Entrar</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  centerItens: {
    marginTop: 20,
    marginLeft: 400,
    marginRight: 400,
  },
})
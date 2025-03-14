import { View, Text } from 'react-native'
import { useAuth } from '../context/auth'

export default function Alunos() {
  const { user } = useAuth()

  return (
    <View>
        <Text>Bem-vindo, {user.email}!</Text>
    </View>
  )
}
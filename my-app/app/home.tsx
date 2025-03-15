import { View, Text, StyleSheet } from 'react-native'
import { useAuth } from '../context/auth'
import { Link } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user } = useAuth()
  const [token, setToken] = useState('') // Criamos um estado para armazenar o token

  useEffect(() => {
    async function getToken() {
      const token = await SecureStore.getItemAsync('token') // Recuperamos o token do SecureStore
      if(token) setToken(token)
    }

    getToken()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{gap: 20}}>
        <Text>Bem-vindo, {user.email}!</Text>
        <Link href="/sensors">Sensores</Link>
        <Link href="/camera">Câmera</Link>
        <Link href="/alunos">Alunos</Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  }
})
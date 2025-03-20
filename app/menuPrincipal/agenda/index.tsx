import { View, Text, StyleSheet } from 'react-native'
import { useAuth } from '../../../context/auth'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import MenuLateral from '../../components/menuLateral'

export default function Agenda() {
/*
  const { user } = useAuth()
  const [token, setToken] = useState('') // Criamos um estado para armazenar o token

  useEffect(() => {
    async function getToken() {
      const token = await SecureStore.getItemAsync('token') // Recuperamos o token do SecureStore
      if(token) setToken(token)
    }

    getToken()
  }, [])
*/

  return (
    <MenuLateral></MenuLateral>
  )
}
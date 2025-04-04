import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useAuth } from '../../../context/auth'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import MenuLateral from '../../components/menuLateral'
import { Link } from 'expo-router'
import ScrollableTable from '../../components/scrollableTable'

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
    <View style={styles.container}>
      <MenuLateral/>
      <View style={[styles.rightSide, {backgroundColor: 'white', alignItems: 'center', marginRight: 20, marginLeft: 20}]}>  
           
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Coloca os elementos lado a lado
    justifyContent: 'center', // Centraliza os elementos no eixo horizontal
  },
  rightSide: {
    flex: 2,
    justifyContent: 'center', // Centraliza a mensagem verticalmente
    alignItems: 'center', // Centraliza no eixo vertical
    height: '100%',
  },
})
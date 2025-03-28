import { View, Image, Text, StyleSheet } from 'react-native'
import { useAuth } from '../../../context/auth'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import MenuLateral from '../../components/menuInferior'
import { Link, usePathname } from 'expo-router'
import { Feather } from '@expo/vector-icons'; // icones do Expo

export default function Agendar() {
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
  const iconsWidth = 40
  const iconsHeight = iconsWidth
  const fontWeightBottomText = 700

  const pathname = usePathname(); // Obtendo o caminho atual da página

  const isActive = (route: string) => {
    return pathname === route ? styles.activeLink : null; // Comparando com o pathname atual
  };

  return (
    <View style={styles.container}>

      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 9, gap: 20, backgroundColor: '#f2f2f0', width: '100%' }}>
        <Image
          source={require('../../../assets/fundoInicio.png')}
          style={styles.backgroundImage}
          resizeMode='stretch'
        />
        <Text style={{ fontSize: 40 }}>Agendar</Text>
        <Link href='/' style={{ position: 'absolute', right: 10, top: 10 }}>
          <Feather name="log-out" size={30} color="black" />
        </Link>
      </View>

      <View style={styles.bottomMenu}>
        <Link href='/menuPrincipal/inicio' style={{ marginTop: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <Feather name="home" size={iconsWidth} color="black" />
            <Text style={{ fontWeight: fontWeightBottomText }}>Início</Text>
          </View>
        </Link>

        <Link href='/menuPrincipal/aulas' style={{ marginTop: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <Feather name="clock" size={iconsWidth} color="black" />
            <Text style={{ fontWeight: fontWeightBottomText }}>Aulas</Text>
          </View>
        </Link>

        <Link href='/menuPrincipal/agendar' style={{ marginTop: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <Feather name="calendar" size={iconsWidth} color="black" />
            <Text style={{ fontWeight: fontWeightBottomText }}>Agendar</Text>
          </View>
        </Link>

        <Link href='/menuPrincipal/perfil' style={{ marginTop: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <Feather name="user" size={iconsWidth} color="black" />
            <Text style={{ fontWeight: fontWeightBottomText }}>Perfil</Text>
          </View>
        </Link>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 8,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bottomMenu: {
    flexDirection: 'row',
    backgroundColor: '#2AA69F',
    flex: 1,
    width: '100%',
    paddingHorizontal: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeLink: {
    fontWeight: '800',
    color: 'black', // Ou qualquer outra cor ou estilo que você queira aplicar
    // backgroundColor: 'black'
  },
})
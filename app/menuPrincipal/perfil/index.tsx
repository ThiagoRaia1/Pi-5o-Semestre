import { View, Image, Text, StyleSheet } from 'react-native'
import { useAuth } from '../../../context/auth'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import MenuLateral from '../../components/menuInferior'
import { Link, usePathname } from 'expo-router'
import { Feather } from '@expo/vector-icons'; // icones do Expo
import MenuInferior from '../../components/menuInferior'

export default function Perfil() {
  const pathname = usePathname(); // Obtendo o caminho atual da página

  const isActive = (route: string) => {
    return pathname === route ? styles.activeLink : null; // Comparando com o pathname atual
  };

  return (
    <View style={styles.container}>
      <MenuInferior></MenuInferior>
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
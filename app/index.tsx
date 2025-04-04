import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons'; // icones do Expo
import { useAuth } from '../context/auth';
import { Link } from 'expo-router';

export default function TelaLogin() {
  const { user, handleLogin, setUser } = useAuth()

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/fundoLogin.jpeg')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <View style={[styles.content, { marginTop: 100 }]}>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            onChangeText={text => setUser({ ...user, email: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            secureTextEntry={true}
            onChangeText={text => setUser({ ...user, password: text })}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link href="/menuPrincipal/inicio" style={styles.link}>Esqueci minha senha</Link>
        </TouchableOpacity>

        {/* Texto posicionado no canto inferior direito */}
        <TouchableOpacity style={styles.registerLink}>
          <Link href='/cadastro' style={[styles.link, { textAlign: 'right' }]}>Não possui uma conta?{'\n'}Clique aqui!</Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#319594',
    borderRadius: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'black',
  },
  button: {
    backgroundColor: '#319594',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  link: {
    color: 'black',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  registerLink: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

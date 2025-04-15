import { View, Image, Text, StyleSheet } from 'react-native'
import MenuInferior from '../../components/menuInferior';
import LogoutButton from '../../components/logoutButton';
import { useAuth } from '../../../context/auth';

export default function Início() {
  const { usuario } = useAuth()
  return (
    <View style={styles.container}>
      <View style={
        {
          justifyContent: 'flex-end',
          flex: 7,
          gap: 20,
          backgroundColor: '#f2f2f0',
          width: '100%',
        }
      }>
        <Image
          source={require('../../../assets/fundoInicio.png')}
          style={styles.backgroundImage}
          resizeMode='stretch'
        />
        <LogoutButton />
        <Text style={
          {
            fontSize: 30,
            color: 'white',
            fontWeight: 900,
            paddingHorizontal: 20,
            textShadowColor: 'black', // Cor da borda
            textShadowOffset: { width: 1, height: 1 }, // Espessura da sombra
            textShadowRadius: 10, // Suaviza a borda
          }
        }>
          Bem vindo, {usuario.nome}
        </Text>
        <View style={
          {
            marginTop: -20,
            marginBottom: -10,
            backgroundColor: 'white',
            marginHorizontal: 20,
            minWidth: '90%',
            minHeight: '40%',
            maxHeight: '40%',
            borderRadius: 20,
            borderColor: '#ccc',
            borderWidth: 2,
            justifyContent: 'center'
          }
        }>

          <Text style={
            {
              fontSize: 24,
              color: 'black',
              fontWeight: 400,
              paddingHorizontal: 20,
              marginBottom: 5
            }
          }>
            Sua próxima aula é:
          </Text>
          <Text style={{
            marginHorizontal: 20,
            minHeight: '20%',
            fontSize: 20,
            fontWeight: '300',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#ccc',
            textAlign: 'center',
            textAlignVertical: 'center',
            padding: 10, // Evita que o texto fique colado na borda
          }}>
            Quarta-feira, 02 de abril:
            {'\n'}
            7:30
          </Text>
        </View>
      </View>
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
})
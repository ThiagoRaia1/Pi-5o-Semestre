import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import MenuInferior from '../../components/menuInferior'
import { Link } from 'expo-router';

export default function Perfil() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
            contentContainerStyle={styles.scrollViewContent} // Estilo para o conteúdo dentro do ScrollView
            keyboardShouldPersistTaps="handled" // Permite que o teclado desapareça ao tocar fora dos campos
          >
        <View style={styles.container}>
        
            <View style={styles.contentlogo}>
              <View style={styles.topContainer}>
                <Image
                  source={require('../../../assets/logo.jpeg')} // Substitua pelo caminho da sua logo
                  style={styles.logo}
                />
              </View>

              <View style={styles.content}>
                <View style={styles.titulo}>
                  <View>
                    <Image
                      source={require('../../../assets/userIcon.png')} // Substitua pelo caminho da sua logo
                      style={styles.userphoto}
                    />
                  </View>
                  <Text style={[styles.textCampo, { fontSize: 40 }]}>Aluno</Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.textCampo}>CPF</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite aqui"
                    placeholderTextColor="#ccc"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.textCampo}>NOME{'\n'}COMPLETO</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite aqui"
                    placeholderTextColor="#ccc"
                    secureTextEntry={true}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.textCampo}>E-MAIL</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite aqui"
                    placeholderTextColor="#ccc"
                    secureTextEntry={true}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.textCampo}>SEXO</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite aqui"
                    placeholderTextColor="#ccc"
                    secureTextEntry={true}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.textCampo}>CELULAR</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite aqui"
                    placeholderTextColor="#ccc"
                    secureTextEntry={true}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.textCampo}>DATA DE{'\n'}NASCIMENTO</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite aqui"
                    placeholderTextColor="#ccc"
                    secureTextEntry={true}
                  />
                </View>

                {/* Botão de finalizar */}
                <TouchableOpacity style={[styles.button, { marginTop: 40 }]}>
                  <Link href="/" style={styles.buttonText}>Finalizar</Link>
                </TouchableOpacity>

                {/* Texto posicionado no canto inferior direito */}
                <TouchableOpacity style={styles.registerLink}>
                  <Link href="/" style={[styles.link, { textAlign: 'right' }]}>Voltar</Link>
                </TouchableOpacity>
              </View>
            </View>
            
         
          
        </View>
        
        </ScrollView>
      </TouchableWithoutFeedback>
      <View><MenuInferior></MenuInferior></View>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ad0d3', // Fundo verde
    justifyContent: 'center', // Alinha o conteúdo no centro verticalmente
    alignItems: 'center', // Alinha o conteúdo no centro horizontalmente
    position: 'relative',
  },
  scrollViewContent: {
    flexGrow: 1, // Garante que o conteúdo dentro do ScrollView ocupe o espaço necessário
   
  },
  topContainer: {
    flexDirection: 'row', // Alinha a logo à esquerda
    alignItems: 'flex-start', // Garante que a logo fique alinhada ao topo
    width: '100%', // Ocupa toda a largura disponível
    marginBottom: 10, // Margem para separar a logo do conteúdo
  },
  logo: {
    width: 100, // Ajuste o tamanho da logo conforme necessário
    height: 50, // Ajuste o tamanho da logo conforme necessário
    marginLeft: 10, // Adiciona uma margem à esquerda
  },
  titulo: {
    flexDirection: 'row', // Alinha o ícone do usuário e o texto na mesma linha
    alignItems: 'center', // Garante que o ícone e o texto fiquem alinhados verticalmente
    marginBottom: 10
},
  userphoto: {
    borderRadius: '100%',
    marginRight: 50, // Espaço entre a imagem e o texto
    width: 100, // Ajuste o tamanho da logo conforme necessário
    height: 100, // Ajuste o tamanho da logo conforme necessário
    marginLeft: 10, // Adiciona uma margem à esquerda
  },
  contentlogo: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha os inputs no topo
    alignItems: 'flex-start', // Alinha os inputs à esquerda
  },
  content: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 60,
    margin: 10,
    borderRadius: 10,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    gap: 40,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 50,
    color: 'black',
    borderWidth: 1,
    borderColor: '#319594',
    borderRadius: 20,
    maxWidth: '70%',
    paddingLeft: 15, // Move o placeholder um pouco para a direita
  },
  button: {
    backgroundColor: '#319594',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    width: '96%',
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
    fontSize: 20,
  },
  registerLink: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  textCampo: {
    color: '#4B366D',
    fontWeight: '700',
    fontSize: 18,
  },
});

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MenuInferior from '../../components/menuInferior';
import LogoutButton from '../../components/logoutButton';

const userProfileImageSize = 110

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [usuario, setUsuario] = useState({
    cpf: '999.999.999-99',
    email: 'xxxxxxxxxxxxxx@xxxxx.com',
    sexo: 'Masculino',
    celular: '(99) 99999-9999',
    dataNascimento: '99/99/9999',
  });
  const [backupUsuario, setBackupUsuario] = useState(usuario);

  const handleChange = (key, value) => {
    setUsuario({ ...usuario, [key]: value });
  };

  const handleEdit = () => {
    setBackupUsuario(usuario);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUsuario(backupUsuario);
    setIsEditing(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {!isEditing && <LogoutButton style={{ zIndex: 1 }} />}
      <View style={[styles.contentlogo, isEditing && { marginTop: -20 }]}>
        <View style={[styles.content, isEditing && { marginTop: 40, gap: 30 }]}>
          <View style={styles.titulo}>
            <Image source={require('../../../assets/userIcon.png')} style={styles.userphoto} />
            <Text style={
              [
                styles.textCampo,
                { fontSize: 25, width: '60%' }
              ]
            }>Placeholder de 50 caracteres 112345678911234567891</Text>
          </View>

          {!isEditing ? (
            <>
              <View style={[styles.inputContainer, styles.inputContainerWhileNotEditing]}>
                <Text style={styles.textCampo}>CPF</Text>
                <Text style={{fontSize: 18}}>{usuario.cpf}</Text>
              </View>

              <View style={[styles.inputContainer, styles.inputContainerWhileNotEditing]}>
                <Text style={styles.textCampo}>EMAIL</Text>
                <Text style={{fontSize: 14, maxWidth: '90%'}}>{usuario.email}</Text>
              </View>

              <View style={[styles.inputContainer, styles.inputContainerWhileNotEditing]}>
                <Text style={styles.textCampo}>SEXO</Text>
                <Text style={{fontSize: 18}}>{usuario.sexo}</Text>
              </View>

              <View style={[styles.inputContainer, styles.inputContainerWhileNotEditing]}>
                <Text style={styles.textCampo}>CELULAR</Text>
                <Text style={{fontSize: 18}}>{usuario.celular}</Text>
              </View>

              <View style={[styles.inputContainer, styles.inputContainerWhileNotEditing]}>
                <Text style={styles.textCampo}>DATA DE{'\n'}NASCIMENTO</Text>
                <Text style={{fontSize: 18}}>{usuario.dataNascimento}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={[styles.inputContainer, { paddingHorizontal: 10 }]}>
                <Text style={styles.textCampo}>CPF</Text>
                <TextInput
                  style={styles.input}
                  value={usuario.cpf}
                  onChangeText={(value) => handleChange('cpf', value)}
                />
              </View>

              <View style={[styles.inputContainer, { paddingHorizontal: 10 }]}>
                <Text style={styles.textCampo}>EMAIL</Text>
                <TextInput
                  style={styles.input}
                  value={usuario.email}
                  onChangeText={(value) => handleChange('email', value)}
                />
              </View>

              <View style={[styles.inputContainer, { paddingHorizontal: 10 }]}>
                <Text style={styles.textCampo}>SEXO</Text>
                <TextInput
                  style={styles.input}
                  value={usuario.sexo}
                  onChangeText={(value) => handleChange('sexo', value)}
                />
              </View>

              <View style={[styles.inputContainer, { paddingHorizontal: 10 }]}>
                <Text style={styles.textCampo}>CELULAR</Text>
                <TextInput
                  style={styles.input}
                  value={usuario.celular}
                  onChangeText={(value) => handleChange('celular', value)}
                />
              </View>

              <View style={[styles.inputContainer, { paddingHorizontal: 10 }]}>
                <Text style={styles.textCampo}>DATA DE{'\n'}NASCIMENTO</Text>
                <TextInput
                  style={styles.input}
                  value={usuario.dataNascimento}
                  onChangeText={(value) => handleChange('dataNascimento', value)}
                />
              </View>
            </>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, !isEditing && { marginBottom: 20 }]}
        onPress={isEditing ? () => setIsEditing(false) : handleEdit}
      >
        {/* Se estiver editando, exibe 'Salvar' no botão, se não, exibe 'Editar' */}
        <Text style={styles.buttonText}> {isEditing ? 'Salvar' : 'Editar'}</Text>
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity style={
          [
            styles.button,
            {
              backgroundColor: 'red',
              marginTop: 10,
              marginBottom: 30
            }
          ]
        } onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      )}
      {!isEditing && <MenuInferior />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 50,
    marginLeft: 10,
  },
  titulo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userphoto: {
    borderRadius: 100,
    marginRight: 20,
    width: userProfileImageSize,
    height: userProfileImageSize,
    marginLeft: 10,
  },
  contentlogo: {
    flex: 7,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    gap: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  inputContainerWhileNotEditing: {
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
  },
  input: {
    flex: 1,
    height: 45,
    color: 'black',
    borderWidth: 1,
    borderColor: '#319594',
    borderRadius: 20,
    maxWidth: '55%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#319594',
    paddingVertical: 12,
    borderRadius: 100,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 10,
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
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

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nome: 'Nome',
    cpf: 'CPF',
    email: 'E-mail',
    sexo: 'Sexo',
    celular: 'Celular',
    nascimento: 'Data de nascimento',
  });
  const [backupUserInfo, setBackupUserInfo] = useState(userInfo);

  const handleChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const handleEdit = () => {
    setBackupUserInfo(userInfo);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUserInfo(backupUserInfo);
    setIsEditing(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <View style={[styles.contentlogo, isEditing && { marginTop: -40 }]}>


          <View style={[styles.content, isEditing && {gap: -10}]}>
            <View style={styles.titulo}>
              <Image source={require('../../../assets/userIcon.png')} style={styles.userphoto} />
              <Text style={[styles.textCampo, { fontSize: 40 }]}>Aluno</Text>
            </View>

            {Object.keys(userInfo).map((key) => (
              <View key={key} style={styles.inputContainer}>
                <Text style={styles.textCampo}>{key.toUpperCase()}</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={userInfo[key]}
                    onChangeText={(value) => handleChange(key, value)}
                  />
                ) : (
                  <Text>{userInfo[key]}</Text>
                )}
              </View>
            ))}

            <TouchableOpacity
              style={[styles.button, { marginTop: 30 }]}
              onPress={isEditing ? () => setIsEditing(false) : handleEdit}
            >
              <Text style={styles.buttonText}>{isEditing ? 'Salvar' : 'Editar'}</Text>
            </TouchableOpacity>

            {isEditing && (
              <TouchableOpacity style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            )}

          </View>
        </View>
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
    marginRight: 50,
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  contentlogo: {
    flex: 7,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 60,
    margin: 10,
    marginTop: -10,
    borderRadius: 10,
    width: '100%',
    gap: 10
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
    paddingLeft: 15,
  },
  button: {
    backgroundColor: '#319594',
    paddingVertical: 12,
    borderRadius: 100,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
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

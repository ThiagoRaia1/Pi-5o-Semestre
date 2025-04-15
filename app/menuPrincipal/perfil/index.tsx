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
import { useAuth } from '../../../context/auth'; // Importa o contexto
import { atualizarUsuario } from './api';

const userProfileImageSize = 110;

export default function Perfil() {
  const { usuario, setUsuario } = useAuth(); // Pega os dados do usuário logado
  const [isEditing, setIsEditing] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState(usuario); // Editável localmente

  const handleChange = (key, value) => {
    setUsuarioEditado({ ...usuarioEditado, [key]: value });
  };

  const handleEdit = () => {
    setUsuarioEditado(usuario);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUsuarioEditado(usuario);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const dadosAtualizados = {
        ...usuarioEditado,
        dataNascimento: new Date(usuarioEditado.dataNascimento),
      }
  
      const usuarioAtualizado = await atualizarUsuario(usuario.login, dadosAtualizados);
      setUsuario(dadosAtualizados); // Atualiza o contexto com os novos dados
      setIsEditing(false);
  
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      alert('Erro ao salvar dados.');
    }
  };

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      {!isEditing && <LogoutButton style={{ zIndex: 1 }} />}

      <View style={[styles.contentlogo, isEditing && { marginTop: -20 }]}>
        <View style={[styles.content, isEditing && { marginTop: 40, gap: 30 }]}>
          <View style={styles.titulo}>
            <Image source={require('../../../assets/userIcon.png')} style={styles.userphoto} />
            <Text style={[styles.textCampo, { fontSize: 25, width: '60%' }]}>
              {usuario.nome}
            </Text>
          </View>

          {!isEditing ? (
            <>
              <CampoVisual label="CPF" valor={usuario.cpf} />
              <CampoVisual label="EMAIL" valor={usuario.login} fontSize={14} />
              <CampoVisual label="SEXO" valor={usuario.sexo} />
              <CampoVisual label="CELULAR" valor={usuario.celular} />
              <CampoVisual label={`DATA DE${'\n'}NASCIMENTO`} valor={formatDate(usuario.dataNascimento)} />
            </>
          ) : (
            <>
              <CampoEditavel label="CPF" valor={usuarioEditado.cpf} onChange={v => handleChange('cpf', v)} />
              <CampoEditavel label="EMAIL" valor={usuarioEditado.login} onChange={v => handleChange('login', v)} />
              <CampoEditavel label="SEXO" valor={usuarioEditado.sexo} onChange={v => handleChange('sexo', v)} />
              <CampoEditavel label="CELULAR" valor={usuarioEditado.celular} onChange={v => handleChange('celular', v)} />
              <CampoEditavel label={`DATA DE${'\n'}NASCIMENTO`} valor={formatDate(usuario.dataNascimento)} onChange={v => handleChange('dataNascimento', v)} />
            </>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, !isEditing && { marginBottom: 20 }]}
        onPress={isEditing ? handleSave : handleEdit}
      >
        <Text style={styles.buttonText}>{isEditing ? 'Salvar' : 'Editar'}</Text>
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red', marginTop: 10, marginBottom: 30 }]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      )}

      {!isEditing && <MenuInferior />}
    </View>
  );
}

function CampoVisual({ label, valor, fontSize = 18 }) {
  return (
    <View style={[styles.inputContainer, styles.inputContainerWhileNotEditing]}>
      <Text style={styles.textCampo}>{label}</Text>
      <Text style={{ fontSize }}>{valor}</Text>
    </View>
  );
}

function CampoEditavel({ label, valor, onChange }) {
  return (
    <View style={[styles.inputContainer, { paddingHorizontal: 10 }]}>
      <Text style={styles.textCampo}>{label}</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onChange}
      />
    </View>
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
    gap: 20,
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
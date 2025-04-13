import axios from 'axios';

const API_URL = 'http://192.168.0.25:3000/alunos';

export async function autenticarLogin(login: string, senha: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, { login, senha });
    return response.data; // já vem sem senha e _id
  } catch (error) {
    throw new Error('Erro ao autenticar aluno');
  }
}

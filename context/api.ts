import axios from "axios";
import { API_URL } from "../services/apiUrl";

export async function autenticarLogin(login: string, senha: string) {
  try {
    const response = await axios.post(`${API_URL}/alunos/login`, {
      login,
      senha,
    });
    return response.data; // já vem sem senha e _id
  } catch (error) {
    throw new Error("Erro ao autenticar aluno");
  }
}

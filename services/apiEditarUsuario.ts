import { IAluno } from "../context/auth";
import { API_URL } from "./apiUrl";

export async function atualizarUsuario(
  login: string,
  novosDados: IAluno
) {
  try {
    const resposta = await fetch(`${API_URL}/alunos/${login}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novosDados),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.message || "Erro ao atualizar usuário");
    }

    const usuarioAtualizado = await resposta.json();
    return usuarioAtualizado;
  } catch (erro: any) {
    console.error("Erro ao atualizar usuário:", erro.message);
    throw erro;
  }
}

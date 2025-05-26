import { API_URL } from "../../services/apiurl";

export async function getAulasSeguintes(login: string) {
  try {
    const resposta = await fetch(`${API_URL}/aulas/${login}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.message || "Erro ao carregar aulas");
    }

    const usuarioAtualizado = await resposta.json();
    return usuarioAtualizado;
  } catch (erro) {
    console.error("Erro ao carregar aulas:", erro.message);
    throw erro;
  }
}


export async function excluirAula(login: string, dataHora: Date) {
  try {
    const response = await fetch(`${API_URL}/${login}/${dataHora}`, {
      method: 'DELETE',
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.mensagem || 'Erro ao excluir a aula');
    }

    return resultado;
  } catch (erro) {
    console.error('Erro ao excluir aula:', erro);
    throw erro;
  }
}


import { API_URL } from "../../services/apiurl";

export async function agendarAula(emailAluno: string, data: Date) {
  try {
    const resposta = await fetch(`${API_URL}/aulas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailAluno, data }),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.message || "Erro ao agendar aula");
    }

    const usuarioAtualizado = await resposta.json();
    return usuarioAtualizado;
  } catch (erro) {
    console.error("Erro ao agendar aula:", erro.message);
    throw erro;
  }
}

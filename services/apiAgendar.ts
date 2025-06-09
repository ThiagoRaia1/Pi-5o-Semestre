// src/services/aulaService.ts
import { httpClient } from "../adapters/httpClient";

export async function agendarAula(emailAluno: string, data: Date) {
  return await httpClient("/aulas", {
    method: "POST",
    body: JSON.stringify({ emailAluno, data }),
  });
}

export async function getHorariosCheios(data: string) {
  try {

    const resposta = await fetch(`${API_URL}/aulas/horario/${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.message || "Erro ao carregar aulas");
    }

    const aulasNoHorario = await resposta.json();
    return aulasNoHorario;
  } catch (erro: any) {
    console.error("Erro ao carregar aulas:", erro.message);
    throw erro;
  }
}
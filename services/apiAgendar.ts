// src/services/aulaService.ts
import { API_URL, httpClient } from "../adapters/httpClient";

export async function agendarAula(emailAluno: string, data: Date) {
  return await httpClient("/aulas", {
    method: "POST",
    body: JSON.stringify({ emailAluno, data }),
  });
}

export async function getHorariosCheios(data: string) {
  return await httpClient(`/aulas/horario/${data}`, {
    method: "GET",
  });
}
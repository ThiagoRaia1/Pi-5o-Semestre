import { httpClient } from "../adapters/httpClient";

export interface IAula {
  _id: string;
  emailAluno: string;
  data: Date;
}

export async function getAulasSeguintes(login: string): Promise<IAula[]> {
  return await httpClient(`/aulas/${login}`, {
    method: "GET",
  });
}

export async function excluirAula(id: string): Promise<{ mensagem: string }> {
  return await httpClient(`/aulas/${id}`, {
    method: "DELETE",
  });
}

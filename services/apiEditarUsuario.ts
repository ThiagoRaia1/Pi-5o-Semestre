import { httpClient } from "../adapters/httpClient";
import { IAluno } from "../context/auth";

export async function atualizarUsuario(login: string, novosDados: IAluno): Promise<IAluno> {
  return await httpClient(`/alunos/${login}`, {
    method: "PATCH",
    body: JSON.stringify(novosDados),
  });
}

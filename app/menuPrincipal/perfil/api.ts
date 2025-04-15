import { IAluno } from '../../../context/auth';

const API_URL = 'http://192.168.0.25:3000/alunos';

export async function atualizarUsuario(login: string, novosDados: Partial<IAluno>) {
    try {
      const resposta = await fetch(`${API_URL}/${login}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novosDados),
      });
  
      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.message || 'Erro ao atualizar usuário');
      }
  
      const usuarioAtualizado = await resposta.json();
      return usuarioAtualizado;
    } catch (erro) {
      console.error('Erro ao atualizar usuário:', erro.message);
      throw erro;
    }
  }
  
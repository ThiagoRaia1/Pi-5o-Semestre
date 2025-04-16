const API_URL = 'http://192.168.0.25:3000/aulas';

export default async function getAulasSeguintes(login: string) {
    try {
      const resposta = await fetch(`${API_URL}/${login}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.message || 'Erro ao carregar aulas');
      }
  
      const usuarioAtualizado = await resposta.json();
      return usuarioAtualizado;
    } catch (erro) {
      console.error('Erro ao carregar aulas:', erro.message);
      throw erro;
    }
  }
  
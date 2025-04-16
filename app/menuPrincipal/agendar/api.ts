const API_URL = 'http://192.168.0.25:3000/aulas';

export default async function agendarAula(emailAluno: string, data: Date) {
    try {
      const resposta = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({emailAluno, data}),
      });
  
      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.message || 'Erro ao agendar aula');
      }
  
      const usuarioAtualizado = await resposta.json();
      return usuarioAtualizado;
    } catch (erro) {
      console.error('Erro ao agendar aula:', erro.message);
      throw erro;
    }
  }
  
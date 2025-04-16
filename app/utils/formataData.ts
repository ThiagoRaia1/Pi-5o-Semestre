// Função para formatar a data
export default function formataData(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export function formataDataAula(dateString: string) {
    const dataObj = new Date(dateString);
    let diaSemana = dataObj.toLocaleDateString('pt-BR', { weekday: 'long' });
    diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    const dia = dataObj.toLocaleDateString('pt-BR');
    const hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return { diaSemana, dia, hora }
}
import { Link, usePathname } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAuth } from "../../context/auth";

export default function MenuLateral() {
    const { user } = useAuth();
    const pathname = usePathname(); // Obtendo o caminho atual da página

    // Função para verificar se o link é a página atual
    const isActive = (route: string) => {
        return pathname === route ? styles.activeLink : null; // Comparando com o pathname atual
    };

    const textStyle = { fontSize: 30 }; // Estilo para os textos

    return (
        <View style={styles.container}>
            <View style={[styles.leftSide,  {backgroundColor: '#C7DEEE'}]}>
                <View style={{ gap: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/icon.png')} style={{width: 200, height: 200}}/>
                    <Text>Bem-vindo, {user.email}!</Text>
                    <Link href="/menuPrincipal/agenda" style={[isActive("/menuPrincipal/agenda"), textStyle]}>
                        Agenda
                    </Link>
                    <Link href="/menuPrincipal/alunos" style={[isActive("/menuPrincipal/alunos"), textStyle]}>
                        Alunos
                    </Link>
                    <Link href="/menuPrincipal/equipe" style={[isActive("/menuPrincipal/equipe"), textStyle]}>
                        Equipe
                    </Link>
                    <Link href="/menuPrincipal/financeiro" style={[isActive("/menuPrincipal/financeiro"), textStyle]}>
                        Financeiro
                    </Link>
                    <Link href="/" style={[textStyle, {textAlign: 'center'}]}>
                        Logout
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', // Coloca os elementos lado a lado
        justifyContent: 'center', // Centraliza os elementos no eixo horizontal
        alignItems: 'center', // Centraliza no eixo vertical
    },
    activeLink: {
        fontWeight: 'bold',
        backgroundColor:'rgb(112, 107, 179)',
        paddingVertical: 5,  // Aumenta o espaço acima/abaixo do texto
        paddingHorizontal: 70, // Aumenta o espaço nas laterais
        borderRadius: 100,  // Deixa os cantos arredondados
        textAlign: 'center', // Garante que o texto fique centralizado
        color: 'white',
        width: 300, // Define um tamanho mínimo para todos os botões
    },
    leftSide: {
        flex: 1,
        justifyContent: 'center', // Alinha os itens ao topo da tela
        alignItems: 'center', // Centraliza no eixo vertical
        height: '100%',
    },
});

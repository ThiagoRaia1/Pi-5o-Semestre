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

    return (
        <View style={styles.container}>
            <View style={[styles.leftSide, { gap: 20 },  {backgroundColor: 'yellow'}]}>
                <View style={{marginLeft: 30, gap: 20}}>
                    <Image source={require('../../assets/icon.png')} style={{width: 200, height: 200}}/>
                    <Text>Bem-vindo, {user.email}!</Text>
                    <Link href="/menuPrincipal/agenda" style={isActive("/menuPrincipal/agenda")}>
                        Agenda
                    </Link>
                    <Link href="/menuPrincipal/alunos" style={isActive("/menuPrincipal/alunos")}>
                        Alunos
                    </Link>
                    <Link href="/menuPrincipal/equipe" style={isActive("/menuPrincipal/equipe")}>
                        Equipe
                    </Link>
                    <Link href="/menuPrincipal/financeiro" style={isActive("/menuPrincipal/financeiro")}>
                        Financeiro
                    </Link>
                    <Link href="/">
                        Logout
                    </Link>
                </View>
            </View>
            <View style={[styles.rightSide, {backgroundColor: 'blue'}]}>  
                <Link href="/menuPrincipal/agenda">Entrar</Link>
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
        color: 'blue', // Ou qualquer outra cor ou estilo que você queira aplicar
        // backgroundColor: 'black'
    },
    leftSide: {
        flex: 1,
        justifyContent: 'center', // Alinha os itens ao topo da tela
        alignItems: 'flex-start', // Centraliza no eixo vertical
        height: '100%',
    },
    rightSide: {
        flex: 2,
        justifyContent: 'center', // Centraliza a mensagem verticalmente
        alignItems: 'center', // Centraliza no eixo vertical
        height: '100%',
    },
    input: {
        marginBottom: 20, // Espaço entre os campos
        width: '70%', // Largura dos inputs
        alignSelf: 'center', // Alinha o botão no centro
        marginRight: 20,
    },
});

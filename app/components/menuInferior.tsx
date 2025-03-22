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
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 8, gap: 20, backgroundColor: 'yellow', width: '100%'}}>     
                <Link href="/">
                    Logout
                </Link>
            </View>
            <View style={styles.bottomMenu}>  
                <Link href="/menuPrincipal/agenda" style={isActive("/menuPrincipal/agenda")}>
                    Agenda
                </Link>
                <Link href="/menuPrincipal/alunos" style={isActive("/menuPrincipal/alunos")}>
                        Alunos
                </Link>
                <Link href="/menuPrincipal/equipe">
                    <Image source={require('../../assets/icon.png')} style={{width: 40, height: 40, borderRadius: 20}}/>
                </Link>
                <Link href="/menuPrincipal/equipe" style={isActive("/menuPrincipal/equipe")}>
                        Equipe
                </Link>
                <Link href="/menuPrincipal/financeiro" style={isActive("/menuPrincipal/financeiro")}>
                    Financeiro
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Centraliza os elementos no eixo horizontal
        alignItems: 'center', // Centraliza no eixo vertical
    },
    activeLink: {
        fontWeight: 'bold',
        color: 'white', // Ou qualquer outra cor ou estilo que você queira aplicar
        // backgroundColor: 'black'
    },
    bottomMenu: {
        flexDirection: 'row',
        backgroundColor: 'blue', 
        flex: 1, 
        width: '100%',
        paddingHorizontal: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        marginBottom: 20, // Espaço entre os campos
        width: '70%', // Largura dos inputs
        alignSelf: 'center', // Alinha o botão no centro
        marginRight: 20,
    },
});

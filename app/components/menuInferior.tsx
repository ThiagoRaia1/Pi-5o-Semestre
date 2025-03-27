import { Link, usePathname } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAuth } from "../../context/auth";

export default function MenuLateral() {
    const { user } = useAuth();
    const pathname = usePathname(); // Obtendo o caminho atual da página
    const iconsWidth = 40
    const iconsHeight = iconsWidth

    // Função para verificar se o link é a página atual
    const isActive = (route: string) => {
        return pathname === route ? styles.activeLink : null; // Comparando com o pathname atual
    };

    return (
        <View style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 8, gap: 20, backgroundColor: '#f2f2f0', width: '100%'}}>     
                <Link href="/">
                    Logout
                </Link>
            </View>
            <View style={styles.bottomMenu}>  

                <Link href="/menuPrincipal/agenda" style={isActive("/menuPrincipal/agenda")}>
                    {/* <Image source={require('../../assets/agendaIcon.png')} 
                    style={{width: iconsWidth, height: iconsHeight, borderRadius: 0}}/> */}
                </Link>

                <Link href="/menuPrincipal/alunos" style={isActive("/menuPrincipal/alunos")}>
                    {/* <Image source={require('../../assets/alunosIcon.png')} 
                    style={{width: iconsWidth, height: iconsHeight, borderRadius: 0}}/> */}
                </Link>

                <Link href="/menuPrincipal/equipe">
                    {/* <Image source={require('../../assets/userIcon.png')} 
                    style={{width: iconsWidth, height: iconsHeight, borderRadius: 20}}/> */}
                </Link>

                <Link href="/menuPrincipal/equipe" style={isActive("/menuPrincipal/equipe")}>
                    {/* <Image source={require('../../assets/equipeIcon.png')} 
                    style={{width: iconsWidth, height: iconsHeight, borderRadius: 0}}/> */}
                </Link>

                <Link href="/menuPrincipal/financeiro" style={isActive("/menuPrincipal/financeiro")}>
                    {/* <Image source={require('../../assets/financeiroIcon.png')} 
                    style={{width: iconsWidth, height: iconsHeight, borderRadius: 0}}/> */}
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
        fontWeight: '800',
        color: 'black', // Ou qualquer outra cor ou estilo que você queira aplicar
        // backgroundColor: 'black'
    },
    bottomMenu: {
        flexDirection: 'row',
        backgroundColor: '#A1DCFF', 
        flex: 1, 
        width: '100%',
        paddingHorizontal: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

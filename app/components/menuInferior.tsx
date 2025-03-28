import { Link, usePathname } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAuth } from "../../context/auth";
import { Feather } from '@expo/vector-icons'; // icones do Expo

export default function MenuInferior() {
    const { user } = useAuth();
    const pathname = usePathname(); // Obtendo o caminho atual da página
    const iconsWidth = 60
    const iconsHeight = iconsWidth

    // Função para verificar se o link é a página atual
    const isActive = (route: string) => {
        return pathname === route ? styles.activeLink : null; // Comparando com o pathname atual
    };

    return (
        <View style={styles.container}>
            <View style={styles.bottomMenu}>
                <Link href='/menuPrincipal/inicio' style={{ marginTop: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Feather name="home" size={iconsWidth} color="white" />
                        <Text style={styles.icon}>INÍCIO</Text>
                    </View>
                </Link>

                <Link href='/menuPrincipal/aulas' style={{ marginTop: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Feather name="clock" size={iconsWidth} color="white" />
                        <Text style={styles.icon}>AULAS</Text>
                    </View>
                </Link>

                <Link href='/menuPrincipal/agendar' style={{ marginTop: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Feather name="calendar" size={iconsWidth} color="white" />
                        <Text style={styles.icon}>AGENDAR</Text>
                    </View>
                </Link>

                <Link href='/menuPrincipal/perfil' style={{ marginTop: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Feather name="user" size={iconsWidth} color="white" />
                        <Text style={styles.icon}>PERFIL</Text>
                    </View>
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
        backgroundColor: '#2AA69F',
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    backgroundImage: {
        flex: 8,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'white',
        fontWeight: 900,
        fontSize: 18
    }
});

import { Link, usePathname } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons'; // icones do Expo

export default function MenuInferior() {
    const iconsWidth = 55

    const pathname = usePathname(); // Obtendo o caminho atual da página
    // Função para verificar se o link é a página atual
    const isActive = (route: string) => {
        return pathname === route ? styles.activeLink : null; // Comparando com o pathname atual
    };

    return (
        <View style={styles.container}>
            <View style={styles.bottomMenu}>

                <Link href='/menuPrincipal/inicio' style={{ marginTop: 10 }}>
                    <View style={[isActive("/menuPrincipal/inicio"), { alignItems: 'center' }]}>
                        <Feather name="home" size={iconsWidth} color="white" />
                        <Text style={styles.icon}>INÍCIO</Text>
                    </View>
                </Link>

                <Link href='/menuPrincipal/aulas' style={{ marginTop: 10 }}>
                    <View style={[isActive("/menuPrincipal/aulas"), { alignItems: 'center' }]}>
                        <Feather name="clock" size={iconsWidth} color="white" />
                        <Text style={styles.icon}>AULAS</Text>
                    </View>
                </Link>

                <Link href='/menuPrincipal/agendar' style={{ marginTop: 10 }}>
                    <View style={[isActive("/menuPrincipal/agendar"), { alignItems: 'center' }]}>
                        <Feather name="calendar" size={iconsWidth} color="white" />
                        <Text style={styles.icon}>AGENDAR</Text>
                    </View>
                </Link>

                <Link href='/menuPrincipal/perfil' style={{ marginTop: 10 }}>
                    <View style={[isActive("/menuPrincipal/perfil"), { alignItems: 'center' }]}>
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
    },
    activeLink: {
        backgroundColor: '#69C1BC',
        paddingHorizontal: 20, // Aumenta o espaço nas laterais
        borderRadius: 20,  // Deixa os cantos arredondados
    },
    bottomMenu: {
        flexDirection: 'row',
        backgroundColor: '#2AA69F',
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    icon: {
        color: 'white',
        fontWeight: 900,
        fontSize: 18
    }
});

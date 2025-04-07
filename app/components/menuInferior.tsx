import { Link, usePathname } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

type FeatherIconName = keyof typeof Feather.glyphMap

const menuItems: { href: string; icon: FeatherIconName; label: string }[] = [
    { href: '/menuPrincipal/inicio', icon: 'home', label: 'INÍCIO' },
    { href: '/menuPrincipal/aulas', icon: 'clock', label: 'AULAS' },
    { href: '/menuPrincipal/agendar', icon: 'calendar', label: 'AGENDAR' },
    { href: '/menuPrincipal/perfil', icon: 'user', label: 'PERFIL' },
];


export default function MenuInferior() {
    const iconsWidth = 55
    const pathname = usePathname()

    const isActive = (route: string) => {
        return pathname === route;
    };

    return (
        <View style={styles.bottomMenu}>
            {menuItems.map(({ href, icon, label }) => (
                <Link key={href} href={href} style={{ marginTop: 7 }}>
                    <View style={styles.menuItem}>
                        <View style={[styles.iconContainer, isActive(href) && styles.activeLink]}>
                            <Feather name={icon} size={iconsWidth} color="white" />
                            <Text style={styles.icon}>{label}</Text>
                        </View>
                    </View>
                </Link>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    bottomMenu: {
        flexDirection: 'row',
        backgroundColor: '#2AA69F',
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        borderRadius: 10,
        width: 90,
    },
    activeLink: {
        backgroundColor: '#69C1BC',
    },
    icon: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16,
    }
});

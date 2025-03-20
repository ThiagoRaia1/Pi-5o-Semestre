import { Link } from "expo-router"
import { View, Text, StyleSheet } from "react-native"
import { useAuth } from "../../context/auth"

export default function MenuLateral() {
    const { user } = useAuth()

    return (
        <View style={styles.container}>
            <View style={{gap: 20}}>
                <Text>Bem-vindo, {user.email}!</Text>
                <Link href="/menuPrincipal/agenda">Agenda</Link>
                <Link href="/menuPrincipal/alunos">Alunos</Link>
                <Link href="/menuPrincipal/equipe">Equipe</Link>
                <Link href="/menuPrincipal/financeiro">Financeiro</Link>
            </View>
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    }
})
import { Link } from "expo-router";
import { Feather } from '@expo/vector-icons'; // icones do Expo

export default function LogoutButton() {
    return (
        <Link href='/' style={{ position: 'absolute', right: 10, top: 10 }}>
            <Feather name="log-out" size={30} color="black" />
        </Link>
    )
}
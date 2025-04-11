import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Link } from 'expo-router';

export default function TelaCadastro() {

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/fundoCadastro.jpg')}
                style={styles.backgroundImage}
                resizeMode="stretch"
            />
            <View style={styles.content}>
                <Text style={[styles.textCampo, { fontSize: 30, marginBottom: 20, fontWeight: 900 }]}>MATRICULE-SE</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.textCampo}>CPF</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite aqui"
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.textCampo}>NOME{'\n'}COMPLETO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite aqui"
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.textCampo}>E-MAIL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite aqui"
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.textCampo}>SEXO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite aqui"
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.textCampo}>CELULAR</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite aqui"
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.textCampo}>DATA DE{'\n'}NASCIMENTO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite aqui"
                        placeholderTextColor="#ccc"
                    />
                </View>

                {/* mudar para fazer a navegação com  expo-router*/}
                <TouchableOpacity style={[styles.button, { marginTop: 20 }]}>
                    <Link href='/' style={styles.buttonText}>Finalizar</Link>
                </TouchableOpacity>

                {/* Texto posicionado no canto inferior direito */}
                <TouchableOpacity style={styles.registerLink}>
                    <Link href='/' style={[styles.link, { textAlign: 'right' }]}>Voltar</Link>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
        marginTop: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        height: 45,
        color: 'black',
        borderWidth: 1,
        borderColor: '#319594',
        borderRadius: 20,
        maxWidth: '55%',
        paddingHorizontal: 10, // Move o placeholder um pouco para a direita
    },
    button: {
        backgroundColor: '#319594',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 100,
        width: '96%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
    link: {
        color: 'black',
        marginTop: 20,
        textDecorationLine: 'underline',
        fontSize: 20
    },
    registerLink: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    textCampo: {
        color: '#4B366D',
        textAlign: 'justify',
        fontWeight: 400,
        fontSize: 16,
    }
});

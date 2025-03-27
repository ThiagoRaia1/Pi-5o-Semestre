import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, TextInput, StatusBar } from 'react-native';

const ScrollableTable = () => {

    const [searchMode, setSearchMode] = useState(false)

    const [searchText, setSearchText] = useState('');

    // Substituir por dados do banco
    const [users, setUsers] = useState([
        { id: '1', Nome: 'Ali Khan', Idade: '20', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '2', Nome: 'Fatima Ahmed', Idade: 'fatimaahm', CPF: 'Female', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '3', Nome: 'Ahmed Hassan', Idade: 'ahmedhassan', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '4', Nome: 'Ayesha Malik', Idade: 'ayeshamalik', CPF: 'Female', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '5', Nome: 'Usman Qureshi', Idade: 'usman123', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '6', Nome: 'Sana Khan', Idade: 'sanakhan', CPF: 'Female', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '7', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '8', Nome: 'Hina Aslam', Idade: 'hina99', CPF: 'Female', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '9', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '10', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '11', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '12', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '13', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '14', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '15', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '16', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '17', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '18', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '19', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
        { id: '20', Nome: 'Bilal Ali', Idade: 'bilalali', CPF: 'Male', status: 'Ativo', ultimaAlteracao: 'Thiago', dataDaUltimaAlteracao: '99/99/9999', cep: 'cep', bairro: 'bairro', cidade: 'cidade' },
    ]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={[styles.itemText, { width: '40%' }]}>{item.Nome}</Text>
            <Text style={[styles.itemText, { width: '40%' }]}>{item.Idade}</Text>
            <Text style={[styles.itemText, { width: '40%' }]}>{item.CPF}</Text>
            <Text style={[styles.itemText, { width: '40%' }]}>{item.status}</Text>
            <Text style={[styles.itemText, { width: '60%' }]}>{item.ultimaAlteracao}</Text>
            <Text style={[styles.itemText, { width: '40%' }]}>{item.dataDaUltimaAlteracao}</Text>
            <Text style={[styles.itemText, { width: '40%' }]}>{item.cep}</Text>
            <Text style={[styles.itemText, { width: '40%' }]}>{item.bairro}</Text>
            <Text style={[styles.itemText, { width: '40%' }]}>{item.cidade}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.bar}>
                {searchMode ? (
                    <TextInput placeholder='Search' placeholderTextColor='#fff' style={styles.input} value={searchText} onChangeText={val => setSearchText(val)} />
                ) : (<Text style={styles.barHeading}>Nome</Text>)}

                <Pressable onPress={() => setSearchMode(!searchMode)}>
                    <Image style={styles.icon} source={require('../../assets/search_icon.png')} />
                </Pressable>
            </View>
            <View style={styles.header}>
                <Text style={[styles.headerText, { width: '40%' }]}>Nome</Text>
                <Text style={[styles.headerText, { width: '40%' }]}>Idade</Text>
                <Text style={[styles.headerText, { width: '40%' }]}>CPF</Text>
                <Text style={[styles.headerText, { width: '40%' }]}>Status</Text>
                <Text style={[styles.headerText, { width: '60%' }]}>Ultima alteração</Text>
                <Text style={[styles.headerText, { width: '40%' }]}>Data da ultima alteração</Text>
                <Text style={[styles.headerText, { width: '40%' }]}>CEP</Text>
                <Text style={[styles.headerText, { width: '40%' }]}>Bairro</Text>
                <Text style={[styles.headerText, { width: '40%' }]}>Cidade</Text>
            </View>
            <FlatList showsVerticalScrollIndicator={true}
                data={users.filter((Nome) => {
                    for (let key in Nome) {
                        if (key !== "id" && typeof (key) === "string") {
                            if (Nome[key].toLowerCase().includes(searchText.toLowerCase())) {
                                return true;
                            }
                        }
                    }
                    return false;
                })}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 50, width: '100%'
    },
    bar: {
        backgroundColor: '#0AB6AB',
        width: '100%',
        height: 60,
        marginBottom: 30,
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    barHeading: {
        fontFamily: 'Poppins SemiBold',
        color: '#fff',
        fontSize: 17,
        borderColor: '#fff',
        borderBottomWidth: 1,
    },
    icon: {
        width: 25,
        height: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fcfcfc',
        paddingVertical: 15,
        borderRadius: 5,
        paddingHorizontal: 5,
    },

    headerText: {
        //flex: 1,
        fontFamily: 'Poppins SemiBold',
        fontSize: 14,
    },
    item: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#A7E8DF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemText: {
        fontSize: 14,
        fontFamily: 'Poppins Regular',
        marginBottom: 5,
        paddingRight: 10,
    },
    input: {
        borderColor: '#fff',
        borderBottomWidth: 1,
        flex: 1,
        marginRight: 20,
        fontFamily: 'Poppins Medium',
        fontSize: 14.5,
        padding: 0,
        color: '#fff',
    }
});

export default ScrollableTable;
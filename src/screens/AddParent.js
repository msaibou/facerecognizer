import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
class AddParent extends Component {
    constructor(props) {
        super(props);
        this.nom = null;
        this.prenom = null;
        this.state = {

        };
    }
    addFace = () => {
        console.log(this.nom, this.prenom);

        firestore()
            .collection('users')
            .add({
                nom: this.nom,
                prenom: this.prenom,
            })
            .then((doc) => {
                console.log('user added!');
                alert('Ajout effectué avec succès !');
            }).catch(error => console.log("Firetore error : " + error));

    }
    render() {
        return (
            <View>
                <Text> ParentProfil </Text>
                <TextInput placeholder="Nom du parent" onChangeText={(value) => { this.nom = value }} style={styles.input} />
                <TextInput placeholder="Prénom du parent" onChangeText={(value) => { this.prenom = value }} style={styles.input} />
                <TouchableOpacity onPress={this.addFace} style={styles.btn}>
                    <Text>Inscription</Text>
                </TouchableOpacity>
            </View>);
    }
}
const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        width: 300,
        height: 50,
        borderRadius: 10,
        borderColor: '#3a86ff',
        backgroundColor: '#A7A7A7',
        textAlign: "center",
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#3a86ff',
        width: 300,
        height: 50,
        borderRadius: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default AddParent;

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { createFaceSet, addFace } from '../API/faceplusplus';
class ParentProfil extends Component {
    constructor(props) {
        super(props);
        this.faceset = null;
        this.state = {
            users: []
        };

    }

    componentDidMount() {
        console.log(this.props.route.params.face_token);
        firestore()
            .collection('users')
            .get()
            .then((docs) => {
                //console.log('Total users: ', docs.size);
                docs.forEach(doc => {
                    this.setState({
                        users: [...this.state.users,
                        {
                            id: doc.id,
                            nom: doc.data().nom,
                            prenom: doc.data().prenom,
                        }]
                    }
                    );
                    //console.log('User ID: ', doc.id, doc.data());
                });
                //console.log(this.state.users);
            }).catch(error => console.log("Firetore error : " + error));
        //------------------------------------------------------------
        firestore()
            .collection('faceset')
            .doc('1')
            .get()
            .then(result => {
                if (result.data().id == 0) {
                    console.log("Here i need to call the API");
                    createFaceSet().then(faceSetInfo => {
                        firestore().collection('faceset').doc('1').update({ id: faceSetInfo.faceset_token })
                        this.faceset = faceSetInfo.faceset_token;
                        console.log("This is the faceset_token : " + faceSetInfo.faceset_token);
                    }).catch(error => console.log("face++ error : " + error));
                }
                else {
                    console.log("I did not call API !");
                    this.faceset = result.data().id;

                    console.log("This is the faceset_token : " + this.faceset);
                }
            })
            .catch(error => alert("Problème lors de la récupération du faceSet ID : " + error));
    }
    addToParent = (parentId) => {
        addFace(this.faceset, this.props.route.params.face_token)
            .then(addInfo => {
                console.log(addInfo);
                firestore()
                    .collection('users')
                    .doc(parentId)
                    .update({ face_token: firestore.FieldValue.arrayUnion(this.props.route.params.face_token) })
                    .then(() => {
                        alert("La màj s'est bien passé");

                        this.props.navigation.navigate("Accueil");
                    })
                    .catch(error => { alert('Erreur lors de la màj : ' + error) });

            })
            .catch(error => console.log("face++ error on AddFace : " + error));

    }
    parentInfo(info) {
        //console.log(info.item);
        return <View style={styles.parentInfo}>
            <Text style={styles.parentInfoText}>{info.item.nom} {info.item.prenom}</Text>
            <TouchableOpacity onPress={() => this.addToParent(info.item.id)} style={styles.btn}><Text>C'est lui</Text></TouchableOpacity>
        </View>;
    }


    addFace = () => {
        alert("Hello " + this.props.route.params.face_token);
        console.log(this.props.route.params.face_token);
    }
    render() {

        return (
            <FlatList style={styles.list}
                data={this.state.users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => this.parentInfo(item)}
            />
        );
    }
}
const styles = StyleSheet.create({
    list: {

        backgroundColor: '#A7A7A780',
        borderRadius: 3,
        width: '90%',

        alignSelf: 'center',
    },
    parentInfo: {
        width: '90%',
        borderWidth: 1,
        borderColor: "#A9A9A9",
        borderRadius: 10,
        flexDirection: 'row'

    }, parentInfoText: {
        flex: 3, fontWeight: "bold",
        fontSize: 32,
        textAlign: "center",
        flexWrap: "wrap", color: 'white', width: '100%'
    }, btn: {
        flex: 1,
        backgroundColor: 'blue',
        width: 50,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default ParentProfil;

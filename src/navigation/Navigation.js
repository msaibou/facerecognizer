import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//myComponents
import AddFace from '../screens/AddFace';
import HomeScreen from '../screens/HomeScreen';
import ParentProfil from '../screens/ParentProfil';
import Scan from '../screens/Scan';
import AddParent from '../screens/AddParent';


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const Stack = createStackNavigator();
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        component={HomeScreen}
                        name="Accueil"
                        options={{ title: "Accueil" }}
                    />
                    <Stack.Screen
                        component={Scan}
                        name="Scan"
                        options={{ title: "Scan Visage" }}
                    />
                    <Stack.Screen component={AddFace}
                        name="AddFace"
                        options={{ title: "Ajout visage" }} />
                    <Stack.Screen component={AddParent}
                        name="AddParent"
                        options={{ title: "Ajout de parent" }} />
                    <Stack.Screen component={ParentProfil}
                        name="ParentProfil"
                        option={{ title: "Creation Profil" }} />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Navigation;




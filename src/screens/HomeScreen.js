import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.main}>
                <Text> HomeScreen </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Scan')} style={styles.btn}>
                    <Text> Scan </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddFace')} style={styles.btn}>
                    <Text> Ajout de visage </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddParent')} style={styles.btn}>
                    <Text> Ajout de parent </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
export default HomeScreen;

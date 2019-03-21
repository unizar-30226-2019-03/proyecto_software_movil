import React, { Component } from 'react';
import { Button, View, StyleSheet } from 'react-native';

export default class downMenu extends Component {
	render() {
		return (
            <View style={styles.container}>
            	<View style={styles.buttonContainer}>
            		<Button title="Home"/>
            	</View>
              	<View style={styles.buttonContainer}>
                	<Button title="Button 2"/>
              	</View>
                <View style={styles.buttonContainer}>
                	<Button title="Button 3"/>
              	</View>
              	<View style={styles.buttonContainer}>
                	<Button title="Button 4"/>
              	</View>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    }
});

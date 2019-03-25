import React from "react";
import { Text, View, Button } from "react-native";

import { createAppContainer, createStackNavigator } from "react-navigation";

import styles from "./styles";

export default class Asignatura extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO ASIGNATURA CONCRETA</Text>
				<Button
					onPress={() =>
						this.props.navigation.navigate("Chat", {
							title: "Juancho Provisional"
						})
					}
					title="IR A CHAT"
				/>
				<Button
					onPress={() => this.props.navigation.navigate("ViendoVideo")}
					title="IR A VIDEO"
				/>
			</View>
		);
	}
}

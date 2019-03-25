import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default class ModificarCampo extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO MODIFICAR CAMPO (nombre y descripcion)</Text>
			</View>
		);
	}
}

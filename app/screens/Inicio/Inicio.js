import React from "react";
import { Text, View, Button } from "react-native";

import SearchMenu from "../../components/SearchMenu";

import styles from "./styles";

export default class Inicio extends React.Component {
	static navigationOptions = SearchMenu;

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO INICIO</Text>
				<Button
					onPress={() => this.props.navigation.navigate("ViendoVideo")}
					title="IR A VIDEO"
				/>
				<Button
					onPress={() =>
						this.props.navigation.navigate("Asignatura", {
							title: "UPM - Proyecto software"
						})
					}
					title="IR A ASIGNATURA CONCRETA"
				/>
			</View>
		);
	}
}

import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class AsignaturasTab extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>TODO ASIGNATURAS TAB</Text>
				<Button
					onPress={() =>
						this.props.navigation.navigate("Asignatura", {
							title: "UPM - Proyecto software"
						})
					}
					title="IR A ASIGNATURA CONCREATA"
				/>
			</View>
		);
	}
}

import React from "react";
import { Text, View, Button } from "react-native";

import SearchMenu from "../../components/SearchMenu";

import styles from "./styles";

export default class Ranking extends React.Component {
	static navigationOptions = SearchMenu;

	render() {
		return (
			<View style={styles.container}>
				<Text>
					TODO RANKING (PONER EL FILTRO DEBAJO DE LA BARRA DE BUSQUEDA)
				</Text>
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

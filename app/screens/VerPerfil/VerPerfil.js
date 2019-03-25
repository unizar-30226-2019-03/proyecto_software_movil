import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class VerPerfil extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO PERFIL AJENO Y MI PERFIL (todo en 1)</Text>
				<Button
					onPress={() =>
						this.props.navigation.navigate("ModificarCampo", {
							title: "Escribe tu nombre"
						})
					}
					title="IR A MODIFICAR NOMBRE"
				/>
				<Button
					onPress={() =>
						this.props.navigation.navigate("ModificarCampo", {
							title: "Escribe tu descripción"
						})
					}
					title="IR A MODIFICAR DESCRIPCION"
				/>
			</View>
		);
	}
}

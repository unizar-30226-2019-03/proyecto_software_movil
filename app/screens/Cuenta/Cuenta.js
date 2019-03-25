import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class Cuenta extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Cuenta"
	});

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO VIENDO VIDEO</Text>
				<Button
					onPress={() =>
						this.props.navigation.navigate("VerPerfil", { title: "Mi perfil" })
					}
					title="IR MI PERFIL"
				/>
			</View>
		);
	}
}

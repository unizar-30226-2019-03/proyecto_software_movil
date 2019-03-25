import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class MisListas extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Mis listas"
	});

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO MIS LISTAS</Text>
				<Button
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Mis listas - Lista de cosas"
						})
					}
					title="IR A LISTA CONCRETA"
				/>
			</View>
		);
	}
}
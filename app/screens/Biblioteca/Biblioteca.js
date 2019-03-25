import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class Biblioteca extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Button
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Historial"
						})
					}
					title="IR A HISTORIAL"
				/>
				<Button
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Mis vídeos"
						})
					}
					title="IR A MIS VIDEOS"
				/>
				<Button
					onPress={() => this.props.navigation.navigate("MisListas")}
					title="IR A MIS LISTAS"
				/>
				<Button
					onPress={() => this.props.navigation.navigate("SubirVideo")}
					title="IR A SUBIR VIDEO"
				/>
			</View>
		);
	}
}

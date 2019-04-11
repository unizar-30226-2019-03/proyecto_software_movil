import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";


import styles from "./styles";

export default class Biblioteca extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.boton}>
					<Button
						onPress={() =>
							this.props.navigation.navigate("ListaVideos", {
								title: "Historial"
							})
						}
						title="IR A HISTORIAL"
						titleStyle={styles.titulo}
						type="clear"
						
					
					/>
				</View>
				<View style={styles.boton}>
				<Button
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Mis vídeos"
						})
					}
					title="IR A MIS VIDEOS"
					titleStyle={styles.titulo}
					type="clear"
				/>
				</View>
				<View style={styles.boton}>
				<Button
					onPress={() => this.props.navigation.navigate("MisListas")}
					title="IR A MIS LISTAS"
					titleStyle={styles.titulo}
					type="clear"
				/>
				</View>
				<View style={styles.boton}>
				<Button
					onPress={() => this.props.navigation.navigate("SubirVideo")}
					title="IR A SUBIR VIDEO"
					titleStyle={styles.titulo}
					type="clear"
					
				/>
				</View>
			</View>
		);
	}
}

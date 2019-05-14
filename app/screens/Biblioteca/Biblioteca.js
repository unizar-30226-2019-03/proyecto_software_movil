import React from "react";
import { View, TouchableNativeFeedback } from "react-native";
import { Text, Icon } from "react-native-elements";

import Auth from "../../config/Auth";

import styles from "./styles";

export default class Biblioteca extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableNativeFeedback
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Historial",
							type: "historial"
						})
					}
				>
					<View style={styles.boton}>
						<Icon name="access-time" size={30} marginLeft={20} />

						<Text style={styles.titulo}>HISTORIAL</Text>
					</View>
				</TouchableNativeFeedback>

				{Auth.isProfesor() ? (
					<TouchableNativeFeedback
						onPress={() =>
							this.props.navigation.navigate("ListaVideos", {
								title: "Mis vídeos",
								type: "mis_videos"
							})
						}
					>
						<View style={styles.boton}>
							<Icon name="play-circle-outline" size={30} marginLeft={20} />

							<Text style={styles.titulo}>MIS VÍDEOS</Text>
						</View>
					</TouchableNativeFeedback>
				) : null}

				<TouchableNativeFeedback onPress={() => this.props.navigation.navigate("MisListas")}>
					<View style={styles.boton}>
						<Icon name="playlist-play" size={30} marginLeft={20} />

						<Text style={styles.titulo}>MIS LISTAS</Text>
					</View>
				</TouchableNativeFeedback>

				{Auth.isProfesor() ? (
					<TouchableNativeFeedback onPress={() => this.props.navigation.navigate("SubirVideo")}>
						<View style={styles.boton}>
							<Icon name="videocam" size={30} marginLeft={20} />
							<Text style={styles.titulo}>SUBIR VÍDEO</Text>
						</View>
					</TouchableNativeFeedback>
				) : null}
			</View>
		);
	}
}

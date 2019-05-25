import React from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";

import Auth from "../../config/Auth";

import UnicastNotifications from "../../config/UnicastNotifications";

import RippleTouchable from "../../components/RippleTouchable";

import styles from "./styles";

export default class Biblioteca extends React.Component {

	render() {
		return (
			<View style={styles.container}>
				<RippleTouchable
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Historial",
							type: "historial"
						})
					}
					style={styles.boton}
				>
					<Icon name="access-time" size={30} marginLeft={20} />

					<Text style={styles.titulo}>HISTORIAL</Text>
				</RippleTouchable>

				{Auth.isProfesor() ? (
					<RippleTouchable
						onPress={() =>
							this.props.navigation.navigate("ListaVideos", {
								title: "Mis vídeos",
								type: "mis_videos"
							})
						}
						style={styles.boton}
					>
						<Icon name="play-circle-outline" size={30} marginLeft={20} />

						<Text style={styles.titulo}>MIS VÍDEOS</Text>
					</RippleTouchable>
				) : null}

				<RippleTouchable onPress={() => this.props.navigation.navigate("MisListas")} style={styles.boton}>
					<Icon name="playlist-play" size={30} marginLeft={20} />

					<Text style={styles.titulo}>MIS LISTAS</Text>
				</RippleTouchable>

				{Auth.isProfesor() ? (
					<RippleTouchable onPress={() => this.props.navigation.navigate("SubirVideo")} style={styles.boton}>
						<Icon name="videocam" size={30} marginLeft={20} />
						<Text style={styles.titulo}>SUBIR VÍDEO</Text>
					</RippleTouchable>
				) : null}
			</View>
		);
	}
}

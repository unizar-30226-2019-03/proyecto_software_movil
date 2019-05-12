import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-elements";

import Auth from "../../config/Auth";

import styles from "./styles";

export default class Biblioteca extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.boton}
					activeOpacity={1}
					onPress={() =>
						this.props.navigation.navigate("ListaVideos", {
							title: "Historial",
							type: "historial"
						})
					}
				>
					<Icon name="access-time" size={30} marginLeft={20} />

					<Text style={styles.titulo}>HISTORIAL</Text>
				</TouchableOpacity>

				{Auth.isProfesor() ? (
					<TouchableOpacity
						style={styles.boton}
						activeOpacity={1}
						onPress={() =>
							this.props.navigation.navigate("ListaVideos", {
								title: "Mis vídeos",
								type: "mis_videos"
							})
						}
					>
						<Icon name="play-circle-outline" size={30} marginLeft={20} />

						<Text style={styles.titulo}>MIS VÍDEOS</Text>
					</TouchableOpacity>
				) : null}

				<TouchableOpacity
					style={styles.boton}
					activeOpacity={1}
					onPress={() => this.props.navigation.navigate("MisListas")}
				>
					<Icon name="playlist-play" size={30} marginLeft={20} />

					<Text style={styles.titulo}>MIS LISTAS</Text>
				</TouchableOpacity>

				{Auth.isProfesor() ? (
					<TouchableOpacity
						style={styles.boton}
						activeOpacity={1}
						onPress={() => this.props.navigation.navigate("SubirVideo")}
					>
						<Icon name="videocam" size={30} marginLeft={20} />
						<Text style={styles.titulo}>SUBIR VÍDEO</Text>
					</TouchableOpacity>
				) : null}
			</View>
		);
	}
}

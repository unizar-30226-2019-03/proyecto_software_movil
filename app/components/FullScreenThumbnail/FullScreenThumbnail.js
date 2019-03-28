import React from "react";
import {
	View,
	Image,
	ImageBackground,
	Text,
	TouchableOpacity
} from "react-native";

import IconoAsignaturaUniversidad from "../IconoAsignaturaUniversidad";

import EntypoIcon from "react-native-vector-icons/Entypo";

import styles from "./styles";

export default class FullScreenThumbnail extends React.Component {
	render() {
		return (
			<View>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate("ViendoVideo")}
					activeOpacity={1}
				>
					<ImageBackground
						source={require("../../../test/imagenes/imagen.jpg")}
						style={styles.videoThumbnailContainer}
					>
						<View style={styles.duracionYLikesContainer}>
							<Text style={styles.likes}> 70% </Text>
							<Text style={styles.duracion}> 12:50 </Text>
						</View>
					</ImageBackground>
				</TouchableOpacity>

				<View style={styles.universidadInfoContainer}>
					<View>
						<TouchableOpacity
							onPress={() =>
								this.props.navigation.navigate("Asignatura", {
									title: "UPM - Proyecto software"
								})
							}
							activeOpacity={1}
							style={styles.asignaturaContainer}
						>
							<IconoAsignaturaUniversidad style={styles.asignaturaIcon} />
						</TouchableOpacity>
					</View>

					<View style={styles.infoContainer}>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate("ViendoVideo")}
							activeOpacity={1}
						>
							<View>
								<Text style={styles.title}>
									Nombre de video de prueba muy pero que muy largo para probar
									como queda
								</Text>
								<Text style={styles.fecha}>Hace 3 meses</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

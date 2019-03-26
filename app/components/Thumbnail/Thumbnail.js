import React from "react";
import {
	View,
	Image,
	ImageBackground,
	Text,
	TouchableHighlight
} from "react-native";

import EntypoIcon from "react-native-vector-icons/Entypo";

import styles from "./styles";

export default class Thumbnail extends React.Component {
	render() {
		return (
			<View>
				<TouchableHighlight
					onPress={() => this.props.navigation.navigate("ViendoVideo")}
					title="IR A VIDEO"
				>
					<ImageBackground // TODO: Estoy hay que cambiarlo cuando sepamos que devuelve la api.
						source={require("../../../test/imagenes/imagen.jpg")}
						style={styles.videoThumbnailContainer}
					>
						<View style={styles.duracionYLikesContainer}>
							<Text style={styles.likes}> 70% </Text>
							<Text style={styles.duracion}> 12:50 </Text>
						</View>
					</ImageBackground>
				</TouchableHighlight>
				<View style={styles.universidadInfoContainer}>
					<TouchableHighlight
						onPress={() =>
							this.props.navigation.navigate("Asignatura", {
								title: "UPM - Proyecto software"
							})
						}
						title="IR A ASIGNATURA CONCRETA"
						style={styles.asignaturaContainer}
					>
						<View style={styles.asignaturaIcon} />
					</TouchableHighlight>
					<View style={styles.infoContainer}>
						<Text style={styles.title}>Nombre de video de prueba</Text>
						<Text style={styles.fecha}>Hace 3 meses</Text>
					</View>
				</View>
			</View>
		);
	}
}

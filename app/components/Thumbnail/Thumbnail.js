import React from "react";
import { View, Image, Text } from "react-native";

import styles from "./styles";

export default class Thumbnail extends React.Component {
	render() {
		return (
			<View>
				<Image // TODO: Estoy hay que cambiarlo cuando sepamos que devuelve la api.
					source={require("../../../test/imagenes/imagen.jpg")}
					style={styles.videoThumbnailContainer}
				/>
				<View style={styles.universidadInfoContainer}>
					<View style={styles.asignaturaIcon} />
					<View style={styles.infoContainer}>
						<Text style={styles.title}>Nombre de video de prueba</Text>
						<Text style={styles.fecha}>Hace 3 meses</Text>
					</View>
				</View>
			</View>
		);
	}
}
